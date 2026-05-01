import {
  ArrowRight,
  Box,
  Clock,
  Gavel,
  Plus,
  TrendingDown,
  Truck,
} from "lucide-react"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Card, CardContent, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FreightsPanel() {
  // Simulando a junção das tabelas OfertaFrete + Carga + Lances (Top 1)
  const leiloesAtivos = [
    {
      id_oferta: "OFT-9921",
      id_carga: "CRG-1042",
      rota: "Curitiba, PR → São Paulo, SP",
      valor_teto: 2500.00,
      melhor_lance: 2150.00,
      transportadora_vencendo: "Expresso Sul Ltda",
      total_lances: 8,
      tempo_restante_min: 45,
      progresso_tempo: 80, // 80% do tempo já passou
    },
    {
      id_oferta: "OFT-9922",
      id_carga: "CRG-1043",
      rota: "Joinville, SC → Campinas, SP",
      valor_teto: 1800.00,
      melhor_lance: null, // Ainda sem lances
      transportadora_vencendo: null,
      total_lances: 0,
      tempo_restante_min: 120,
      progresso_tempo: 30,
    },
    {
      id_oferta: "OFT-9923",
      id_carga: "CRG-1045",
      rota: "Araucária, PR → Rio de Janeiro, RJ",
      valor_teto: 4200.00,
      melhor_lance: 3900.00,
      transportadora_vencendo: "Logística Alpha",
      total_lances: 3,
      tempo_restante_min: 15,
      progresso_tempo: 95, // Urgente
    }
  ]

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
  }

  return (
    <AppShell
      title="Painel de Leilão"
      actions={
        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 md:w-auto">
          <Gavel size={16} className="mr-2" /> Iniciar Novo Leilão
        </Button>
      }
    >
      <div className="flex flex-col space-y-6">
        
        <Tabs defaultValue="ativos" className="w-full">
          <TabsList className="mb-4 bg-white border border-slate-200">
            <TabsTrigger value="ativos" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Leilões Ativos (3)
            </TabsTrigger>
            <TabsTrigger value="historico" className="data-[state=active]:bg-slate-100">
              Histórico e Encerrados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ativos" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              
              {leiloesAtivos.map((leilao) => (
                <Card key={leilao.id_oferta} className="flex flex-col hover:shadow-md transition-shadow border-slate-200">
                  <CardHeader className="pb-3 border-b border-slate-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 mb-2">
                          {leilao.id_oferta}
                        </Badge>
                        <CardTitle className="text-base font-bold text-slate-800 flex items-center">
                          {leilao.rota.split(' → ')[0]} 
                          <ArrowRight size={14} className="mx-2 text-slate-400" /> 
                          {leilao.rota.split(' → ')[1]}
                        </CardTitle>
                        <p className="text-xs text-slate-500 mt-1 flex items-center">
                          <Box size={12} className="mr-1" /> Ref: Carga {leilao.id_carga}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4 flex-1">
                    <div className="space-y-4">
                      
                      {/* Valores */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <p className="text-[10px] uppercase font-semibold text-slate-400 mb-1">Valor Teto</p>
                          <p className="text-sm font-medium text-slate-700">{formatarMoeda(leilao.valor_teto)}</p>
                        </div>
                        <div className={`p-3 rounded-lg border ${leilao.melhor_lance ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
                          <p className={`text-[10px] uppercase font-semibold mb-1 ${leilao.melhor_lance ? 'text-emerald-600' : 'text-slate-400'}`}>
                            Melhor Lance
                          </p>
                          <p className={`text-sm font-bold ${leilao.melhor_lance ? 'text-emerald-700' : 'text-slate-500'}`}>
                            {leilao.melhor_lance ? formatarMoeda(leilao.melhor_lance) : 'Nenhum lance'}
                          </p>
                        </div>
                      </div>

                      {/* Status de quem está ganhando */}
                      {leilao.melhor_lance && (
                        <div className="flex items-center text-xs text-slate-600 bg-white border border-slate-100 p-2 rounded">
                          <TrendingDown size={14} className="text-emerald-500 mr-2" />
                          <span className="font-medium mr-1">{leilao.transportadora_vencendo}</span> liderando 
                          <Badge className="ml-auto bg-slate-100 text-slate-600 hover:bg-slate-200 border-none">
                            {leilao.total_lances} lances
                          </Badge>
                        </div>
                      )}
                      
                      {!leilao.melhor_lance && (
                        <div className="flex items-center justify-center text-xs text-slate-400 bg-white border border-slate-100 border-dashed p-2 rounded h-[42px]">
                          Aguardando transportadoras...
                        </div>
                      )}

                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col border-t border-slate-50 pt-4 bg-slate-50/50 rounded-b-xl gap-3">
                    {/* Barra de Tempo */}
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-500 flex items-center font-medium">
                          <Clock size={12} className="mr-1.5" /> Encerra em {leilao.tempo_restante_min} min
                        </span>
                      </div>
                      <Progress 
                        value={leilao.progresso_tempo} 
                        className={`h-1.5 ${leilao.progresso_tempo > 90 ? 'bg-red-100' : 'bg-blue-100'}`}
                        indicatorColor={leilao.progresso_tempo > 90 ? 'bg-red-500' : 'bg-blue-500'}
                      />
                    </div>
                    
                    <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                      Analisar Lances
                    </Button>
                  </CardFooter>
                </Card>
              ))}

            </div>
          </TabsContent>

          <TabsContent value="historico">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-slate-500">
                <Gavel size={48} className="mb-4 text-slate-200" />
                <p>Nenhum leilão encerrado recentemente.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
        </Tabs>
      </div>
    </AppShell>
  )
}