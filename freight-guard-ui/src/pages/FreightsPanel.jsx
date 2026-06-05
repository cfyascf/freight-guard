import {
  CalendarRange,
  Clock,
  Gavel,
  MapPin,
  Plus,
  TrendingDown,
} from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Card, CardContent, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { segmentPlansMock } from "@/constants/logistics-mock"
import { RISK } from "@/constants/risk"

const getRiskBorderClass = (risk) => {
  switch (risk) {
    case RISK.NORMAL:
      return "border-l-4 border-l-emerald-500"
    case RISK.WARNING:
      return "border-l-4 border-l-amber-500"
    case RISK.CRITIC:
      return "border-l-4 border-l-rose-600"
    default:
      return "border-l-4 border-l-slate-200"
  }
}

const getRiskBadgeClass = (risk) => {
  switch (risk) {
    case RISK.NORMAL:
      return "bg-emerald-100 text-emerald-800"
    case RISK.WARNING:
      return "bg-amber-100 text-amber-800"
    case RISK.CRITIC:
      return "bg-rose-100 text-rose-800"
    default:
      return "bg-slate-100 text-slate-700"
  }
}

export default function FreightsPanel() {
  const leiloesAtivos = segmentPlansMock.filter((segment) => segment.status !== "Em montagem")

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
  }

  return (
    <AppShell
      title="Mesa de Leilões"
    >
      <div className="flex flex-col space-y-4">
        <Tabs defaultValue="ativos" className="w-full">
          <div className="mb-4 flex flex-col items-start justify-between gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center">
            <TabsList className="bg-white border border-slate-200">
              <TabsTrigger value="ativos" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                Leilões Ativos ({leiloesAtivos.length})
              </TabsTrigger>
              <TabsTrigger value="historico" className="data-[state=active]:bg-slate-100">
                Histórico e Encerrados
              </TabsTrigger>
            </TabsList>

            <Button asChild className="self-start bg-blue-600 text-white hover:bg-blue-700 md:ml-auto md:self-auto">
              <Link to="/create-freight-auction">
                <Plus size={16} className="mr-2" /> Novo Leilão
              </Link>
            </Button>
          </div>

          <TabsContent value="ativos" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              
              {leiloesAtivos.map((leilao) => {
                const progressValue = leilao.totalBids > 0 ? Math.min(95, 35 + leilao.totalBids * 7) : 18

                return (
                <Card key={leilao.id} className={`flex flex-col border-slate-200 transition-shadow hover:shadow-md ${getRiskBorderClass(leilao.risk)}`}>
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600">
                            {leilao.id}
                          </Badge>
                          <Badge className={`border-none text-[10px] font-bold uppercase tracking-wide ${getRiskBadgeClass(leilao.risk)}`}>
                            {leilao.risk}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg font-semibold text-slate-900">{leilao.name}</CardTitle>
                        <p className="flex items-center text-sm text-slate-500">
                          <MapPin size={12} className="mr-1" /> {leilao.stops.join(" → ")}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Melhor lance</p>
                        <p className={`mt-1 text-lg font-semibold ${leilao.bestBid ? 'text-emerald-700' : 'text-slate-500'}`}>
                          {leilao.bestBid ? formatarMoeda(leilao.bestBid) : 'Sem oferta'}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 pt-5">
                    <div className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-4">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <p className="mb-1 text-[10px] font-semibold uppercase text-slate-400">Piso</p>
                          <p className="text-sm font-medium text-slate-700">{formatarMoeda(leilao.targetFare)}</p>
                        </div>
                        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                          <p className="mb-1 text-[10px] font-semibold uppercase text-slate-400">Lances</p>
                          <p className="text-sm font-medium text-slate-700">{leilao.totalBids}</p>
                        </div>
                        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                          <p className="mb-1 text-[10px] font-semibold uppercase text-slate-400">Composição</p>
                          <p className="text-sm font-medium text-slate-700">{leilao.itemCount} itens • {leilao.legCount} pernas</p>
                        </div>
                        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                          <p className="mb-1 text-[10px] font-semibold uppercase text-slate-400">Cobertura</p>
                          <p className="text-sm font-medium text-slate-700">{leilao.coverage}</p>
                        </div>
                      </div>

                      {Boolean(leilao.bestBid) && (
                        <div className="flex items-center rounded-xl border border-slate-100 bg-white p-3 text-xs text-slate-600">
                          <TrendingDown size={14} className="text-emerald-500 mr-2" />
                          <span className="mr-1 font-medium">{leilao.winningCarrier}</span> liderando
                          <Badge className="ml-auto bg-slate-100 text-slate-600 hover:bg-slate-200 border-none">
                            {leilao.totalBids} lances
                          </Badge>
                        </div>
                      )}
                      
                      {!leilao.bestBid && (
                        <div className="flex items-center justify-center text-xs text-slate-400 bg-white border border-slate-100 border-dashed p-2 rounded h-[42px]">
                          Aguardando transportadoras...
                        </div>
                      )}

                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-3 rounded-b-xl border-t border-slate-100 bg-slate-50/50 pt-4">
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-500 flex items-center font-medium">
                          <Clock size={12} className="mr-1.5" /> {leilao.auctionStatus}
                        </span>
                        <span className="text-slate-400 flex items-center">
                          <CalendarRange size={12} className="mr-1.5" /> {leilao.bidDeadline}
                        </span>
                      </div>
                      <Progress 
                        value={progressValue} 
                        className={`h-1.5 ${progressValue > 90 ? 'bg-red-100' : 'bg-blue-100'}`}
                        indicatorColor={progressValue > 90 ? 'bg-red-500' : 'bg-blue-500'}
                      />
                    </div>

                    <div className="grid w-full gap-2 md:grid-cols-2">
                      <Button asChild variant="outline" className="w-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                        <Link to={`/segment-details/${leilao.id}`}>Ver Trecho</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                        <Link to={`/auction-bids/${leilao.id}`}>Analisar Lances</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
                )
              })}

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