import { Plus, Search, Clock, TrendingDown, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { segmentPlansMock } from "@/constants/logistics-mock"
import { RISK } from "@/constants/risk"

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)

const getRiskBadge = (risk) => {
  const styles = {
    [RISK.NORMAL]: "bg-emerald-50 text-emerald-700 border-emerald-200",
    [RISK.WARNING]: "bg-amber-50 text-amber-700 border-amber-200",
    [RISK.CRITIC]: "bg-rose-50 text-rose-700 border-rose-200",
  }
  return <Badge variant="outline" className={`rounded-full text-[10px] uppercase font-bold tracking-wider px-2 py-0 ${styles[risk] || "bg-slate-50"}`}>{risk}</Badge>
}

export default function FreightsPanel() {
  const leiloesAtivos = segmentPlansMock.filter((s) => s.status !== "Em montagem")

  return (
    <AppShell title="Mesa de Leilões">
      <div className="mx-auto max-w-7xl flex flex-col h-[calc(100vh-7.5rem)] gap-4 overflow-hidden">
        
        {/* BARRA DE TOPO INTEGRADA MINIMALISTA (Baseada na tela de Gestão de Trechos) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Leilões em Andamento</h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar por ID ou trecho..."
                className="h-9 border-slate-200 bg-white pl-9 text-xs"
              />
            </div>

            <Button asChild className="h-9 bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700 focus-visible:ring-blue-200 active:bg-blue-800">
              <Link to="/create-freight-auction">
                <Plus size={14} className="mr-1.5" /> Novo Leilão
              </Link>
            </Button>
          </div>
        </div>

        {/* GRID DE CARDS INTELIGENTES */}
        <div className="min-h-0 flex-1 overflow-y-auto pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {leiloesAtivos.map((l) => (
              <div key={l.id} className="flex flex-col rounded-xl border border-slate-200 bg-white transition-all hover:border-slate-300">
                
                {/* Cabeçalho do Card */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-3">
                  <span className="font-mono text-xs font-bold text-slate-500">{l.id}</span>
                  {getRiskBadge(l.risk)}
                </div>

                <div className="flex flex-col flex-1 p-4">
                  {/* Identificação do Trecho */}
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{l.name}</h3>
                    <p className="text-xs font-medium text-slate-500 mt-1 truncate">{l.stops.join(" ➔ ")}</p>
                  </div>

                  {/* Painel de Estatísticas Interno */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Melhor Lance</p>
                      <p className="mt-0.5 font-mono text-sm font-black text-emerald-600">
                        {l.bestBid ? formatCurrency(l.bestBid) : "Sem ofertas"}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total de Lances</p>
                      <div className="flex items-center mt-0.5">
                        <TrendingDown size={14} className="text-blue-500 mr-1.5" />
                        <p className="text-sm font-bold text-slate-700">{l.totalBids} <span className="text-xs font-medium text-slate-400">lances</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Rodapé e Ação (Empurrado para baixo para alinhar todos os cards) */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      <Clock size={12} className="mr-1.5" /> {l.bidDeadline}
                    </div>
                    <Button asChild size="sm" variant="ghost" className="h-8 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2">
                      <Link to={`/auction-bids/${l.id}`}>Analisar <ArrowRight size={14} className="ml-1" /></Link>
                    </Button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}