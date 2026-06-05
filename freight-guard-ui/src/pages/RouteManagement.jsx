import { useState } from "react"

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
    stops: [
      { city: "Joinville", state: "SC", type: "origin" },
      { city: "Curitiba", state: "PR", type: "hub" },
      { city: "Santos", state: "SP", type: "destination" },
    ],
  },
]

const formatDistance = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} km`
const formatWeight = (value) => `${new Intl.NumberFormat("pt-BR").format(value)}kg`

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

const getStopPrefix = (type) => {
  switch (type) {
    case "origin":
      return "📍"
    case "hub":
      return "📦"
    case "destination":
      return "🏁"
    default:
      return "📍"
  }
}

export default function RouteManagement() {
  const [routes] = useState(structuredRoutesMock)

  const handleReuseRoute = (route) => {
    console.log("Duplicando estrutura da rota para nova criação", {
      routeId: route.id,
      stops: route.stops,
    })
  }

  return (
    <AppShell title="Gestão de Rotas Estruturadas">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Gestão de Rotas Estruturadas</h1>
          <p className="max-w-3xl text-sm text-slate-600">
            Acompanhe o andamento das rotas já consolidadas e reutilize moldes frequentes para poupar tempo de digitação nas próximas publicações.
          </p>
        </div>

        <div className="space-y-4">
          {routes.map((route) => (
            <article
              key={route.id}
              className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_auto] lg:items-center"
            >
              <div className="min-w-0 space-y-2">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {route.id}
                </p>
                <h2 className="text-lg font-semibold text-slate-900">{route.title}</h2>
                <p className="text-sm text-slate-500">
                  {route.segmentCount} trechos • {formatDistance(route.distanceKm)} • Total: {formatWeight(route.totalWeightKg)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-slate-700">
                  {route.stops.map((stop, index) => (
                    <div key={`${route.id}-${stop.city}-${stop.state}`} className="contents">
                      <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">
                        <span className="mr-2">{getStopPrefix(stop.type)}</span>
                        {stop.city} ({stop.state})
                      </span>
                      {index < route.stops.length - 1 && (
                        <span className="text-slate-400">➔</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <Badge className={`border-none ${getStatusClassName(route.status)}`}>
                  {route.status}
                </Badge>
                <Button
                  type="button"
                  variant="outline"
                  className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  onClick={() => handleReuseRoute(route)}
                >
                  ♻️ Reutilizar Rota
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
