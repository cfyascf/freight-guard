import { useMemo, useState } from "react"
import { ArrowRight, CopyPlus, Plus } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const structuredRoutesMock = [
  {
    id: "ROT-9921",
    title: "Corredor Sul-Sudeste",
    segmentCount: 2,
    distanceKm: 1100,
    totalWeightKg: 12350,
    status: "Em Leilão",
    closingValue: 4280,
    stops: [
      { city: "Curitiba", state: "PR", type: "origin" },
      { city: "São Paulo", state: "SP", type: "hub" },
      { city: "Rio de Janeiro", state: "RJ", type: "destination" },
    ],
  },
  {
    id: "ROT-9922",
    title: "Expresso Interior Paulista",
    segmentCount: 3,
    distanceKm: 640,
    totalWeightKg: 8750,
    status: "Rascunho",
    closingValue: 0,
    stops: [
      { city: "Campinas", state: "SP", type: "origin" },
      { city: "Ribeirão Preto", state: "SP", type: "hub" },
      { city: "Uberlândia", state: "MG", type: "destination" },
    ],
  },
  {
    id: "ROT-9923",
    title: "Linha Sul Costeira",
    segmentCount: 2,
    distanceKm: 780,
    totalWeightKg: 10100,
    status: "Finalizada",
    closingValue: 3910,
    stops: [
      { city: "Joinville", state: "SC", type: "origin" },
      { city: "Curitiba", state: "PR", type: "hub" },
      { city: "Santos", state: "SP", type: "destination" },
    ],
  },
]

const formatDistance = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} km`
const formatWeight = (value) => `${new Intl.NumberFormat("pt-BR").format(value)}kg`
const formatCurrency = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value)

const getStatusClassName = (status) => {
  switch (status) {
    case "Em Leilão":
      return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
    case "Finalizada":
      return "bg-slate-100 text-slate-700 hover:bg-slate-100"
    case "Rascunho":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100"
    default:
      return "bg-slate-100 text-slate-700 hover:bg-slate-100"
  }
}

export default function RouteManagement() {
  const [routes] = useState(structuredRoutesMock)
  const summary = useMemo(
    () => ({
      active: routes.filter((route) => route.status === "Em Leilão").length,
      drafts: routes.filter((route) => route.status === "Rascunho").length,
      finished: routes.filter((route) => route.status === "Finalizada").length,
    }),
    [routes],
  )

  const handleReuseRoute = (route) => {
    console.log("Duplicando estrutura da rota para nova criação", {
      routeId: route.id,
      stops: route.stops,
    })
  }

  return (
    <AppShell title="Gestão de Rotas Estruturadas">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Em leilão</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{summary.active}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Rascunhos</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{summary.drafts}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Finalizadas</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{summary.finished}</p>
            </div>
          </div>

          <Button asChild className="h-10 bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800">
            <Link to="/create-route-workspace">
              <Plus size={14} className="mr-1.5" /> Nova rota
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          {routes.map((route) => (
            <article
              key={route.id}
              className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md lg:grid-cols-[220px_minmax(0,1fr)_140px_220px] lg:items-center"
            >
              <div className="min-w-0 space-y-2">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {route.id}
                </p>
                <h2 className="text-lg font-semibold text-slate-900">{route.title}</h2>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>{route.segmentCount} trechos</span>
                  <span className="text-slate-300">•</span>
                  <span>{formatDistance(route.distanceKm)}</span>
                  <span className="text-slate-300">•</span>
                  <span>{formatWeight(route.totalWeightKg)}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-slate-700">
                  {route.stops.map((stop, index) => (
                    <div key={`${route.id}-${stop.city}-${stop.state}`} className="contents">
                      <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">
                        {stop.city} ({stop.state})
                      </span>
                      {index < route.stops.length - 1 && (
                        <ArrowRight size={14} className="text-slate-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Fechamento</span>
                  <span className="font-semibold text-slate-900">
                    {route.closingValue > 0 ? formatCurrency(route.closingValue) : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Status</span>
                  <Badge className={`border-none ${getStatusClassName(route.status)}`}>
                    {route.status}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  onClick={() => handleReuseRoute(route)}
                >
                  <CopyPlus size={14} className="mr-1.5" /> Reutilizar
                </Button>
                <Button asChild variant="outline" className="border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100">
                  <Link to="/control-tower">Abrir</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
