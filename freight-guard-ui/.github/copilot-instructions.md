Com certeza, Yasmim! Para garantir que a formatação não quebre e que você consiga copiar exatamente o código Markdown com todas as crases e tags intactas, coloquei o conteúdo inteiro dentro de um bloco de código abaixo.

Basta clicar no botão de **"Copiar"** no canto superior direito deste bloco e colar no seu arquivo `.md`:

```markdown
# 🎨 Copilot Instructions: Princípios de UI/UX e Design B2B SaaS

Este documento define as diretrizes, heurísticas e padrões de código (Tailwind CSS + React) para o desenvolvimento e refatoração de interfaces do sistema. O foco é criar telas modernas, de alta densidade de informação, limpas e com excelente usabilidade para analistas de logística (B2B).

## 1. Filosofia de Design (The "Vibe")
* **Alta Densidade, Baixo Ruído:** O usuário precisa ver muitos dados ao mesmo tempo (SaaS corporativo), mas sem se sentir sobrecarregado. Use grids, colunas e alinhamentos perfeitos.
* **Flat Design (Sem Sombras):** **NÃO USE** `shadow`, `shadow-sm` ou `shadow-md`. A hierarquia e profundidade são criadas inteiramente com bordas suaves (`border-slate-200`) e fundos sutis (`bg-slate-50`, `bg-white`).
* **Data-Driven:** Números, IDs, placas e valores monetários são os protagonistas. Eles devem ser fáceis de escanear.

---

## 2. Estrutura de Layout e Scroll Blindado (The Skeleton)
Sempre utilize a estrutura de "Double Div" para garantir que a tela nunca quebre o layout principal ou gere rolagem na página inteira (scroll infinito). A rolagem deve acontecer **apenas dentro do container de conteúdo**.

```jsx
{/* 1. Container Mestre (Altura fixa baseada na viewport menos o header global) */}
<div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-7xl flex-col overflow-hidden">
  
  {/* 2. Header da Tela (Fixo no topo) */}
  <div className="flex shrink-0 items-center justify-between border-b border-slate-200 pb-3 pt-1 mb-4">...</div>

  {/* 3. Área Flexível com min-h-0 para permitir o overflow do filho */}
  <div className="min-h-0 flex-1 overflow-hidden">
    
    {/* 4. O container que de fato rola (Scroll interno) */}
    <div className="h-full overflow-y-auto pr-2 pb-6 space-y-4">
        {/* Conteúdo (Cards, Grids, etc) */}
    </div>
  </div>
</div>

```

---

## 3. Tipografia e Micro-labels (A "Assinatura" Visual)

O contraste tipográfico é o que torna o design profissional. Use combinações extremas de tamanho e peso para separar *Metadados* (Labels) de *Dados* (Valores).

* **Micro-labels (Títulos de campos):** Sempre use letras miúdas, maiúsculas, em negrito e com espaçamento entre letras.
* *Classe Padrão:* `text-[10px] font-bold uppercase tracking-wider text-slate-400`


* **Valores Principais:** Fontes grandes e muito pesadas.
* *Classe Padrão:* `text-sm font-bold text-slate-800` ou `text-xl font-black text-slate-900`


* **Dados Estruturados (IDs, Moeda, Placas, Pesos):** SEMPRE use fonte monoespaçada para facilitar a leitura tabular.
* *Classe Padrão:* `font-mono text-slate-700`



---

## 4. O Padrão de Cards B2B

Os cards devem ser estruturados como blocos de informação com cabeçalhos bem definidos.

* **Borda e Fundo:** `rounded-xl border border-slate-200 bg-white`
* **Cabeçalho do Card (Padrão):** Altura fixa para manter simetria em grids. Fundo levemente cinza.
* `className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-4 rounded-t-xl"`
* Sempre inclua um Ícone colorido (Lucide) + Título em caixa alta (`text-xs font-bold uppercase text-slate-700`).


* **Corpo do Card:** `p-4` ou `p-5`. Use `space-y-4` para separar seções internas.
* **Alinhamento de Fundo (mt-auto):** Se houver cards lado a lado (`grid-cols-2`) e um deles tiver menos conteúdo, use `flex flex-col` no card e `mt-auto` no último elemento (como um botão ou rodapé) para forçá-lo para baixo, mantendo o design alinhado perfeitamente.

---

## 5. Cores Semânticas

Não use cores primárias em excesso. O sistema deve ser majoritariamente cinza/branco/ardósia (`slate`), usando cores apenas para dar significado:

* **Slate (`slate-800`, `slate-500`, `slate-50`):** Estrutura, textos, bordas, fundos padrão.
* **Blue (`blue-600`, `blue-50`):** Ações primárias, informações de foco, botões "Salvar" ou "Enviar Lance", links.
* **Emerald (`emerald-600`, `emerald-50`):** Dinheiro (Valores recebendo, lucro, teto de orçamento), status positivo (Vencendo, Livre), última entrega de SLA.
* **Amber (`amber-600`, `amber-50`):** Alertas moderados, status "Em Manutenção", primeira coleta de SLA.
* **Rose (`rose-600`, `rose-50`):** Ações destrutivas (Deletar, Cancelar Lance), status crítico, perda de leilão, distâncias negativas para o líder.

---

## 6. Formulários e Inputs Modernos

* **Inputs Base:** Devem ser limpos, sem bordas pesadas. Use `h-9` ou `h-10` (para telas mais compactas).
* *Classe:* `border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500`


* **Inputs Financeiros / de Grande Impacto:** Quando for o lance do usuário ou um valor crucial, tire a cara de "formulário".
* Embuta o sufixo/prefixo no input (ex: "R$" ou "kg").
* *Exemplo:*


```jsx
<div className="bg-white border border-slate-300 rounded-lg p-1 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
    <div className="flex items-center px-2">
        <span className="text-xs font-bold text-slate-400">R$</span>
        <Input className="border-0 focus-visible:ring-0 text-xl font-black font-mono text-slate-800" />
    </div>
</div>

```



---

## 7. Interações Visuais (Micro-interactions)

* **Hovers:** Todo elemento clicável deve ter hover. Para linhas de tabela ou listagens, use `hover:bg-slate-50`.
* **Ações Ocultas (Reveal on Hover):** Para botões de Editar/Deletar em listas, não polua a tela. Esconda-os usando `opacity-0` e exiba no hover do grupo.
* *Container:* `group relative ...`
* *Ações:* `absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity`


* **Animações Suaves:** Use as classes utilitárias do Tailwind-animate (se disponível) ou transições padrão: `transition-all duration-200`.

---

## 8. Abordagem Analítica (O "Mindset" do Usuário Logístico)

Quando for desenhar uma tela para o Operador Logístico ou Transportador, faça as seguintes perguntas antes de posicionar os dados:

1. **Onde:** Qual o caminho físico? (Origem e Destino devem estar visíveis rápido).
2. **O que:** É paletizado? É refrigerado? Qual o tipo da carreta? (Essencial para não perder a viagem).
3. **Quando:** Qual o SLA Crítico? (Mostre o prazo final com badges).
4. **Quanto:** Teto, Lance Atual e "Minha Proposta" (Informação financeira destacada da informação técnica).

> **Aviso ao Copilot/AI:** Sempre que for requisitado para criar ou refatorar uma tela, leia estas instruções. Mantenha os componentes enxutos (evite paddings como `p-8`, prefira `p-4` ou `p-5` para densidade). Evite criar interfaces que pareçam "blogs" ou "landing pages". O foco é **Dashboard SaaS B2B de Alta Performance**.

```

```