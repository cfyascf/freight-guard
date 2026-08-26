# SIGLOC — Decisões de Regras de Negócio e Modelo de Dados

> Documento de referência produzido a partir da análise de gaps entre o TCC (especificação, ER original,
> requisitos RF/RN) e o protótipo de frontend. Consolida as decisões de negócio tomadas para orientar o
> ER final e as telas do produto. Não descreve a implementação de backend/API — isso permanece fora do
> escopo deste documento.

## 1. Contexto

O ER original do TCC e o protótipo de frontend evoluíram de forma independente: o frontend capturava
campos que não existiam no ER (ex: `perigosa`, `fragil`, `empilhavel`) e o ER antecipava conceitos que o
frontend nunca implementou (ex: `ratingQtd` sem nota média associada). Este documento fecha essas lacunas
com decisões explícitas de negócio, para que o ER e as telas fiquem consistentes entre si.

---

## 2. Categorização de Produto

A categoria do produto passa a ser o dado que **determina automaticamente** a exigência de veículo da
rota (substituindo o preenchimento manual de `exigenciaVeiculo`).

| Categoria | Exigência de veículo derivada |
|---|---|
| Carga Geral (Seca) | Baú / Sider |
| Carga Refrigerada/Perecível | Frigorífico/Isotérmico (`capacidadeRefrigeracao != Nenhuma`) |
| Carga Perigosa | Veículo e motorista com habilitação MOPP (`habilitacaoMopp = true`) |
| Granel Sólido | Graneleiro/Basculante |
| Granel Líquido | Tanque |
| Carga Frágil/Especial | Baú com implemento de fixação |

**Decisão:** `perigosa` fica como **booleano simples** (`sim/não`), sem modelar as 9 classes de risco ONU —
suficiente para o escopo do TCC. Não há tabela de subclasses de risco.

**Decisão:** `empilhavel` e `maxCamadas` são **removidos** do escopo. Só fariam sentido se o sistema fizesse
otimização de carregamento (bin-packing), o que está fora de qualquer RF do projeto (seria escopo de um
WMS). Manter esses campos seria complexidade de formulário sem regra de negócio por trás.

**Decisão:** `fragil` é mantido — alimenta o cálculo de risco operacional exibido nas telas (ver seção 6),
sem exigir modelagem adicional.

**Decisão:** Temperatura (`tempMin`/`tempMax`) fica em `PRODUTO`, mas o veículo não guarda uma faixa
numérica equivalente — guarda um **enum simplificado** (`Nenhuma` / `Resfriado` / `Congelado`). A
comparação de compatibilidade é categórica, não numérica, porque reflete a realidade operacional
(motoristas sabem se o baú é resfriado ou congelado, não configuram faixas de graus).

---

## 3. Peso e Volume — de digitado para calculado

**Problema identificado:** `pesoKg`/`volumeM3` eram digitados manualmente em `TRECHO` e em
`ROTA_CONSOLIDADA`, sem nenhuma garantia de que batiam com a soma real dos produtos alocados.

**Decisão:** esses campos passam a ser **derivados/somente-leitura**:

```
TRECHO.pesoKg   = Σ (PRODUTO.pesoPadrao   × PRODUTO_TRECHO.quantidade) dos produtos daquele trecho
TRECHO.volumeM3 = Σ (PRODUTO.volumePadrao × PRODUTO_TRECHO.quantidade) dos produtos daquele trecho

ROTA_CONSOLIDADA.pesoTotal   = Σ TRECHO.pesoKg   de todos os trechos da rota
ROTA_CONSOLIDADA.volumeTotal = Σ TRECHO.volumeM3 de todos os trechos da rota
```

Isso resolve o RF018 (cálculo de volume de rota) como consequência natural do modelo de dados, não como
uma feature separada.

---

## 4. Teto Financeiro — decisão sobre o nível correto

**Pergunta de negócio:** o teto deveria estar no nível de trecho ou de rota?

**Decisão:** `TRECHO.tetoFinanceiro` continua sendo a **fonte da verdade** — é onde o contratante toma a
decisão de negócio, com o contexto específico daquele trecho (distância, urgência, risco). O leilão
acontece depois, no nível da rota consolidada, então o teto da rota **não é uma nova decisão**, é a soma
de decisões já tomadas:

```
ROTA_CONSOLIDADA.tetoConsolidado (derivado) = Σ TRECHO.tetoFinanceiro dos trechos da rota
```

Mesma lógica aplicada a peso/volume: um único campo editável por trecho, tudo o mais é agregação.

---

## 5. Piso ANTT — não é um campo, é um cálculo

**Problema identificado:** o piso era um percentual fixo (72–75%) hardcoded no frontend, sem relação com
a tabela real de piso mínimo de frete (Resolução ANTT).

**Decisão:** modelar uma tabela de referência simplificada `TABELA_PISO_ANTT` (categoria de carga × faixa
de eixos → custo fixo + coeficiente por km), e **não armazenar piso como coluna** em `TRECHO` nem em
`ROTA_CONSOLIDADA`. Motivo: o piso depende de três insumos que só se completam em momentos diferentes:

| Insumo | Onde vive | Quando é conhecido |
|---|---|---|
| Categoria da carga | `PRODUTO` (via trecho) | na criação do trecho |
| Distância | `TRECHO.distanciaKm` | na criação do trecho |
| Nº de eixos do veículo | `VEICULO.qtdEixos` | só no momento do lance (`LANCE.veiculoId`) |

**Fórmula (avaliada por trecho, depois somada para a rota):**

```
piso_da_rota = Σ (para cada TRECHO da rota)
    TABELA_PISO_ANTT.custoFixo + TABELA_PISO_ANTT.coeficientePorKm × TRECHO.distanciaKm
    (linha buscada por: categoria mais restritiva entre os produtos daquele trecho + VEICULO.qtdEixos do lance)
```

Se uma rota mistura trechos de categorias diferentes, o piso correto é a soma dos pisos calculados
trecho a trecho com a categoria própria de cada um — não uma "categoria única da rota".

**Dois momentos de exibição:**
1. **Na criação do trecho/rota (antes do leilão):** "piso estimado" informativo, usando um nº de eixos
   padrão assumido para o tipo de carroceria exigido. Não é persistido, é só leitura de tela.
2. **No lance (`LANCE`):** piso definitivo, calculado com o veículo real ofertado. Usado para marcar
   `LANCE.compativel = false` se o valor ofertado estiver abaixo do piso legal.

**Regra para trechos com produtos de categorias diferentes:** usar a categoria de maior piso entre os
produtos daquele trecho (critério conservador).

---

## 6. Risco e Urgência — parar de digitar, começar a derivar

Nem todo dado exibido em tela precisa ser uma coluna no banco. Alguns são apenas leitura formatada de
dados que já existem:

- **Urgência**: derivada de `deadlineColeta - dataAtual` (sem campo próprio).
- **Risco operacional**: regra determinística sobre flags já existentes —
  `perigosa = true` OU valor declarado alto → Alto risco;
  `fragil = true` OU `categoria = Refrigerada` → Médio risco;
  caso contrário → Baixo risco.

---

## 7. Compatibilidade de Lance (RF016 refinado)

O `LANCE` passa a referenciar o veículo ofertado (`veiculoId`) e a carregar um flag `compativel`,
calculado no momento do envio, cruzando:

- Peso/volume do veículo vs. peso/volume total da rota (overbooking clássico);
- Conflito de datas/agenda do veículo (já existente na simulação atual, `isVehicleAvailableForRoute`);
- Categoria exigida da rota vs. características do veículo (`capacidadeRefrigeracao`, `habilitacaoMopp`,
  `tipoCarroceria`);
- Valor ofertado vs. piso ANTT calculado (seção 5).

Lances incompatíveis **não** podem ser adjudicados, nem manual nem automaticamente.

---

## 8. Adjudicação de Leilão — Automática vs. Manual

O contratante escolhe, na criação do leilão (`LEILAO.tipoAdjudicacao`), entre dois modos:

- **Automática**: ao expirar o leilão (`expiraEm`), o sistema escolhe sozinho o lance de **menor valor
  entre os compatíveis**. Não pondera nota do transportador — é puramente o menor preço elegível.
- **Manual**: o contratante vê todos os lances compatíveis, ordenados por preço por padrão, mas com
  colunas de apoio à decisão (nota média do transportador, badges de compatibilidade), e pode adjudicar
  qualquer lance compatível — não precisa ser o mais barato.

Não há fórmula de score ponderado automático combinando preço e nota — a ponderação é uma decisão humana
no modo manual, e pura menor-preço no modo automático.

---

## 9. Avaliação de Transportadora (novo conceito)

Para que `TRANSPORTADORA.notaMedia` tenha alguma substância, é necessário um ponto de captura: uma nova
entidade `AVALIACAO` (nota 1–5 + comentário, associada à `VIAGEM` finalizada) e uma tela/modal de
avaliação pós-viagem, hoje inexistente tanto no TCC quanto no frontend.

---

## 10. ER — Tabela Consolidada de Mudanças

| Entidade | Campo | Mudança |
|---|---|---|
| `PRODUTO` | `categoria` | 🆕 enum (Geral/Refrigerada/Perigosa/GranelSólido/GranelLíquido/Frágil) |
| `PRODUTO` | `perigosa`, `fragil` | mantidos, booleanos simples |
| `PRODUTO` | `tempMin`, `tempMax` | mantidos, condicionais a `categoria = Refrigerada` |
| `PRODUTO` | `empilhavel`, `maxCamadas` | ❌ removidos |
| `TRECHO` | `pesoKg`, `volumeM3` | 🔄 derivados (soma de `PRODUTO_TRECHO`) |
| `ROTA_CONSOLIDADA` | `pesoTotal`, `volumeTotal` | 🔄 derivados |
| `ROTA_CONSOLIDADA` | `tetoConsolidado` | 🔄 derivado (soma de `TRECHO.tetoFinanceiro`) |
| `ROTA_CONSOLIDADA` | `exigenciaVeiculo` | 🔄 derivado (a partir das categorias dos produtos) |
| `VEICULO` | `qtdEixos` | 🆕 int |
| `VEICULO` | `capacidadeRefrigeracao` | 🆕 enum (Nenhuma/Resfriado/Congelado) |
| `VEICULO` | `habilitacaoMopp` | 🆕 bool |
| `LEILAO` | `tipoAdjudicacao` | 🆕 enum (Automática/Manual) |
| `LANCE` | `veiculoId` | 🆕 FK |
| `LANCE` | `compativel` | 🆕 bool calculado |
| `TRANSPORTADORA` | `notaMedia` | 🆕 decimal |
| `AVALIACAO` | *(nova entidade)* | `id, viagemId, transportadoraId, nota, comentario, criadoEm` |
| `TABELA_PISO_ANTT` | *(nova entidade)* | `id, categoriaCarga, qtdEixosMin, qtdEixosMax, custoFixo, coeficientePorKm` |
| `VIAGEM` | `finalizadaEm` | 🆕 datetime, permite calcular cumprimento de SLA |

---

## 11. Telas — Mudanças Necessárias

| Tela | Mudança |
|---|---|
| RegisterProduct / ProductManagement | Remove `empilhável`/`maxCamadas`; adiciona `categoria` (obrigatório, em destaque); `tempMin/tempMax` condicionais |
| CreateRouteSegment | Peso/volume herdados dos produtos (somente leitura); remove recaptura manual de `perigosa/fragil/temperatura` |
| OfferFreight | Peso/volume/teto da rota calculados; `exigenciaVeiculo` como badge calculado; exibe "Piso Estimado"; toggle de adjudicação automática grava `tipoAdjudicacao` |
| RegisterVehicle / FleetManagement | Adiciona `qtdEixos`, `capacidadeRefrigeracao`, `habilitacaoMopp` |
| BidAnalysis | Remove piso hardcoded; calcula piso real; bloqueia envio de lance incompatível com explicação |
| AuctionBids | Adiciona nota média e badge de compatibilidade; comportamento condicionado a `tipoAdjudicacao` |
| ActiveRouteTracking / ControlTower | Ao finalizar viagem, calcula cumprimento de SLA real (substitui simulação aleatória) |
| Avaliação de Transportadora *(nova)* | Modal pós-viagem: nota + comentário |
| PartnerNetwork | Exibe `notaMedia` no card do parceiro |
