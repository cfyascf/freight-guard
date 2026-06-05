import { useState } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, MapPinned, Scale } from "lucide-react"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { availableRouteSegments } from "./LoadManagement"

const formatWeight = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} kg`
const formatVolume = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} m³`
const formatDistance = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} km`

function getNodeType(index, totalNodes) {
  if (index === 0) {
    return "Origem"
  }

  if (index === totalNodes - 1) {
    return "Destino final"
  }

  return "Parada intermediária"
}

const buildUnifiedTimeline = (segments) => {
  const nodes = []

  const addAction = (city, action) => {
    const existing = nodes.find((n) => n.city === city)

    if (existing) {
      existing.actions.push(action)
      return
    }

    nodes.push({ city, actions: [action] })
  }

  segments.forEach((s) => {
    addAction(s.origin, `Coleta · ${s.productName} · ${s.id}`)
    addAction(s.destination, `Descarga · ${s.productName} · ${s.id}`)
  })

  return nodes.map((node, idx) => ({
    ...node,
    type: getNodeType(idx, nodes.length),
  }))
}

function getRestrictiveRequirement(requirements) {
  if (requirements.has("Refrigerado")) {
    return "Baú frigorífico"
  }

  if (requirements.has("Frágil")) {
    return "Carga sensível"
  }

  return "Carga seca padrão"
}

export default function CreateRouteWorkspace() {
  const location = useLocation()
  const navigate = useNavigate()
  const [auctionDeadline, setAuctionDeadline] = useState("")

  const selectedIds = location.state?.selectedIds || []
  const selectedSegments = availableRouteSegments.filter((s) => selectedIds.includes(s.id))
  const unifiedTimeline = buildUnifiedTimeline(selectedSegments)
  const totalDistance = selectedSegments.reduce((sum, s) => sum + s.distanceKm, 0)
  const maxWeight = selectedSegments.reduce((max, s) => Math.max(max, s.weightKg), 0)
  const maxVolume = selectedSegments.reduce((max, s) => Math.max(max, s.volumeM3), 0)
  const totalWeight = selectedSegments.reduce((sum, s) => sum + s.weightKg, 0)

  const requirementSet = new Set(selectedSegments.flatMap((s) => s.requirements))
  const restrictiveRequirement = getRestrictiveRequirement(requirementSet)

  if (selectedIds.length === 0) {
    return (
      <AppShell title="Workspace de Rota">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Nenhum trecho foi selecionado para montagem.</p>
          <Button asChild className="mt-4 h-9 bg-slate-900 text-xs text-white">
            <Link to="/load-management">Voltar para listagem</Link>
          </Button>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell title="Workspace de Rota">
      <div className="mx-auto flex h-[calc(100vh-7.5rem)] max-w-7xl flex-col gap-3 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 rounded-md p-0 hover:bg-slate-100"
              onClick={() => navigate("/load-management")}
            >
              <ArrowLeft size={14} className="text-slate-600" />
            </Button>
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-base font-semibold text-slate-900">Montagem de rota consolidada</h1>
                <p className="text-xs text-slate-500">Defina sequência, capacidade e gatilho de publicação.</p>
              </div>
            </div>
          </div>

          <Badge className="border-none bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-700">
            {selectedIds.length} trechos
          </Badge>
        </div>

        <section className="grid min-h-0 flex-1 gap-3 xl:grid-cols-[minmax(0,1.45fr)_320px]">
          <Card className="min-h-0 border-slate-200 bg-white shadow-sm">
            <CardHeader className="border-b border-slate-100 px-5 pb-3 pt-5">
              <div className="grid gap-2 md:grid-cols-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Paradas</p>
                  <p className="mt-0.5 text-base font-semibold text-slate-900">{unifiedTimeline.length}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Distância</p>
                  <p className="mt-0.5 text-base font-semibold text-slate-900">{formatDistance(totalDistance)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Peso consolidado</p>
                  <p className="mt-0.5 text-base font-semibold text-slate-900">{formatWeight(totalWeight)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Restrição crítica</p>
                  <p className="mt-0.5 text-base font-semibold text-slate-900">{restrictiveRequirement}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="min-h-0 overflow-y-auto px-5 pb-5 pt-4">
              <div className="space-y-2.5 pr-1">
                {unifiedTimeline.map((node, index) => (
                  <div key={node.city} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-700 ring-1 ring-blue-200">
                            {index + 1}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700">{node.type}</span>
                        </div>
                        <p className="mt-1.5 text-sm font-semibold text-slate-900">{node.city}</p>
                      </div>
                      <MapPinned size={14} className="mt-0.5 text-slate-300" />
                    </div>

                    <div className="mt-3 space-y-1.5">
                      {node.actions.map((action) => (
                        <div
                          key={`${node.city}-${action}`}
                          className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600"
                        >
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="border-b border-slate-100 px-5 pb-3 pt-5">
              <CardTitle className="text-sm font-semibold text-slate-900">Capacidade e publicação</CardTitle>
            </CardHeader>
            <CardContent className="flex h-full flex-col justify-between gap-4 px-5 pb-5 pt-4">
              <div className="space-y-4">
                <div className="grid gap-2.5">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Capacidade de peso</span>
                      <span className="font-semibold text-slate-900">{formatWeight(maxWeight)}</span>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Capacidade de volume</span>
                      <span className="font-semibold text-slate-900">{formatVolume(maxVolume)}</span>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Tipo de equipamento</span>
                      <span className="font-semibold text-slate-900">{restrictiveRequirement}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Scale size={13} />
                      <span className="text-xs font-medium">Janela de publicação</span>
                    </div>
                    <Input
                      id="workspace-deadline"
                      type="datetime-local"
                      value={auctionDeadline}
                      onChange={(e) => setAuctionDeadline(e.target.value)}
                      className="mt-2.5 h-9 border-slate-200 bg-white text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Trechos incluídos</p>
                  <div className="space-y-1.5">
                    {selectedSegments.map((segment) => (
                      <div key={segment.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-2.5 py-2 text-xs">
                        <div className="min-w-0">
                          <p className="truncate font-medium text-slate-800">{segment.productName}</p>
                          <p className="text-[11px] text-slate-500">{segment.id}</p>
                        </div>
                        <Badge variant="outline" className="border-slate-200 bg-slate-50 text-[10px] text-slate-600">
                          {segment.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button className="h-9 w-full rounded-lg bg-slate-900 text-[11px] font-bold tracking-wide text-white hover:bg-slate-800">
                Disparar leilão reverso da rota
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  )
}