import { AlertTriangle, ArrowLeft, Boxes, CalendarRange, CheckCircle2, Clock3, Gavel, MapPin, Route, ShieldAlert, Truck, Wallet, Workflow } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { auctionBidsMock, cargoItemsMock, getSegmentById, segmentPlansMock } from "@/constants/logistics-mock"

// eslint-disable-next-line react/prop-types
function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4">
      <div className="mt-0.5 rounded-md bg-blue-50 p-2 text-blue-600">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  )
}

const getRiskBadgeClass = (risk) => {
  switch (risk) {
    case "NORMAL":
      return "bg-emerald-100 text-emerald-800"
    case "WARNING":
      return "bg-amber-100 text-amber-800"
    case "CRITIC":
      return "bg-rose-100 text-rose-800"
    default:
      return "bg-slate-100 text-slate-700"
  }
}

export default function SegmentDetails() {
  const { segmentId } = useParams()
  const fallbackSegment = segmentPlansMock[0]
  const segment = getSegmentById(segmentId) || fallbackSegment
  const relatedItems = cargoItemsMock.filter((item) => segment.items.includes(item.id))
  const relatedBids = auctionBidsMock.filter((bid) => bid.segmentRef === segment.id)
  const attentionTone = segment.risk === "CRITIC"
    ? "border-rose-200 bg-rose-50 text-rose-900"
    : segment.totalBids === 0
      ? "border-amber-200 bg-amber-50 text-amber-900"
      : "border-emerald-200 bg-emerald-50 text-emerald-900"
  const attentionTitle = segment.risk === "CRITIC"
    ? "Trecho crítico"
    : segment.totalBids === 0
      ? "Aguardando mercado"
      : "Trecho bem encaminhado"
  const attentionCopy = segment.risk === "CRITIC"
    ? "A composição tem alta sensibilidade operacional. Vale revisar prioridade de doca, escolta ou janela de entrega antes do fechamento."
    : segment.totalBids === 0
      ? "O trecho está desenhado, mas ainda sem tração comercial. Ajustar tarifa-alvo ou prazo pode melhorar adesão."
      : "Já existe resposta de mercado e a composição parece coerente para seguir em análise de cobertura e preço."

  const formatCurrency = (value) => {
    if (!value) {
      return "Nenhum lance"
    }

    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  return (
    <AppShell title={`Detalhes do Trecho ${segment.id}`}>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <Link to="/route-management">
            <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Gestão de Trechos
            </Button>
          </Link>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="border-slate-200 bg-white text-slate-700">
              <Link to="/create-freight-auction">Publicar ou ajustar leilão</Link>
            </Button>
            <Button asChild className="bg-sky-700 text-white hover:bg-sky-800">
              <Link to={`/auction-bids/${segment.id}`}>Analisar lances</Link>
            </Button>
          </div>
        </div>

        <section className="planner-hero overflow-hidden rounded-[28px] p-6 text-white shadow-lg shadow-sky-950/10 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border border-white/20 bg-white/12 text-white hover:bg-white/15">Detalhe executivo do trecho</Badge>
                <Badge className="border border-white/20 bg-white/10 text-white">{segment.status}</Badge>
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{segment.name}</h1>
                <p className="mt-3 max-w-3xl text-sm text-sky-50/85 md:text-base">
                  Uma visão única para o planejador entender sequência operacional, composição do trecho e leitura comercial do leilão sem alternar entre telas.
                </p>
              </div>
            </div>

            <div className="glass-panel rounded-3xl border border-white/20 p-5 text-slate-900">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Snapshot</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div>
                  <p className="text-2xl font-semibold text-slate-900">{segment.itemCount}</p>
                  <p className="text-xs text-slate-500">itens</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-900">{segment.totalBids}</p>
                  <p className="text-xs text-slate-500">lances</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-900">{formatCurrency(segment.bestBid)}</p>
                  <p className="text-xs text-slate-500">melhor oferta</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`rounded-2xl border px-4 py-3 ${attentionTone}`}>
          <div className="flex items-start gap-3">
            {segment.risk === "CRITIC" ? <AlertTriangle size={18} className="mt-0.5" /> : <CheckCircle2 size={18} className="mt-0.5" />}
            <div>
              <p className="font-semibold">{attentionTitle}</p>
              <p className="mt-1 text-sm opacity-90">{attentionCopy}</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="glass-panel gap-0 border-white/60 py-0 shadow-sm lg:col-span-2">
            <CardHeader className="border-b border-slate-100/90 bg-white/60 py-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                      {segment.id}
                    </Badge>
                    <Badge className={`border-none ${getRiskBadgeClass(segment.risk)}`}>
                      {segment.risk}
                    </Badge>
                    <Badge variant="outline" className="border-slate-200 bg-white text-slate-700">
                      {segment.status}
                    </Badge>
                  </div>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-900">
                    <Route size={18} className="text-blue-600" /> {segment.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Visão consolidada do trecho, com paradas, itens, contexto comercial e cobertura do leilão.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <DetailItem icon={Boxes} label="Composição" value={`${segment.itemCount} itens • ${segment.legCount} pernas`} />
                <DetailItem icon={Wallet} label="Tarifa-alvo" value={formatCurrency(segment.targetFare)} />
                <DetailItem icon={Truck} label="Cobertura" value={segment.coverage} />
                <DetailItem icon={CalendarRange} label="Prazo do leilão" value={segment.bidDeadline} />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white/80 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <MapPin size={16} className="text-blue-600" /> Timeline operacional
                </div>
                <div className="mt-5 space-y-4">
                  {segment.stops.map((stop, index) => (
                    <div key={`${segment.id}-stop-${stop}`} className="grid grid-cols-[40px_1fr] gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sm font-semibold text-sky-700 ring-4 ring-white">
                          {index + 1}
                        </div>
                        {index < segment.stops.length - 1 && <div className="mt-2 h-full min-h-8 w-px bg-slate-200" />}
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/40">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Parada {index + 1}</p>
                        <p className="mt-1 text-sm font-medium text-slate-800">{stop}</p>
                        <p className="mt-2 text-sm text-slate-500">
                          {index === 0 ? "Coleta e início da consolidação." : index === segment.stops.length - 1 ? "Entrega final e encerramento do trecho." : "Transferência intermediária e sincronização de janelas."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Workflow size={16} className="text-blue-600" /> Itens vinculados ao trecho
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {relatedItems.map((item) => (
                    <Card key={item.id} className="border-slate-200 bg-white/85 shadow-sm">
                      <CardContent className="space-y-3 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.id} • {item.productName}</p>
                            <p className="mt-1 text-xs text-slate-500">{item.routeLabel}</p>
                          </div>
                          <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-700">
                            {item.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
                          <div>
                            <p className="font-semibold uppercase tracking-wide text-slate-400">Quantidade</p>
                            <p className="mt-1 text-sm font-medium text-slate-700">{item.quantityLabel}</p>
                          </div>
                          <div>
                            <p className="font-semibold uppercase tracking-wide text-slate-400">Peso / Volume</p>
                            <p className="mt-1 text-sm font-medium text-slate-700">{item.weight} • {item.volume}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.requirements.map((requirement) => (
                            <Badge key={`${item.id}-${requirement}`} variant="outline" className="border-slate-200 bg-white text-slate-600">
                              {requirement}
                            </Badge>
                          ))}
                        </div>
                        <Button asChild variant="outline" className="w-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                          <Link to={`/load-details/${item.id}`}>Abrir item</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="glass-panel gap-0 border-white/60 py-0 shadow-sm">
              <CardHeader className="border-b border-slate-100/90 bg-white/60 py-3">
                <CardTitle className="text-base font-bold text-slate-800">Leilão em andamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Situação</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{segment.auctionStatus}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Melhor lance</p>
                  <p className="mt-1 text-sm font-medium text-emerald-700">{formatCurrency(segment.bestBid)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Transportadora liderando</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{segment.winningCarrier || "Aguardando propostas"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total de lances</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{segment.totalBids}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel gap-0 border-white/60 py-0 shadow-sm">
              <CardHeader className="border-b border-slate-100/90 bg-white/60 py-3">
                <CardTitle className="text-base font-bold text-slate-800">Contexto do planejador</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <ShieldAlert size={16} className="text-blue-600" /> Nota operacional
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{segment.plannerNote}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Peso e volume consolidados</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{segment.totalWeight} • {segment.totalVolume}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Últimas propostas</p>
                  <div className="mt-2 space-y-2">
                    {relatedBids.length === 0 ? (
                      <p className="text-sm text-slate-500">Nenhum lance recebido até o momento.</p>
                    ) : (
                      relatedBids.slice(0, 3).map((bid) => (
                        <div key={bid.id} className="rounded-lg border border-slate-200 bg-white p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-medium text-slate-800">{bid.carrier}</p>
                              <p className="mt-1 text-xs text-slate-500">{bid.vehicle} • {bid.coverage}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-emerald-700">{formatCurrency(bid.proposedValue)}</p>
                              <p className="mt-1 text-xs text-slate-400">{bid.eta}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                  <Link to={`/auction-bids/${segment.id}`}>
                    <Gavel size={16} className="mr-2" /> Ver todos os lances
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-panel gap-0 border-white/60 py-0 shadow-sm">
              <CardHeader className="border-b border-slate-100/90 bg-white/60 py-3">
                <CardTitle className="text-base font-bold text-slate-800">Marcadores rápidos</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 p-6">
                <DetailItem icon={Clock3} label="Cobertura atual" value={segment.coverage} />
                <DetailItem icon={Truck} label="Melhor transportadora" value={segment.winningCarrier || "Sem líder"} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}