import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RISK } from "@/constants/risk"

const availableRouteSegments = [
  {
    id: "TRC-1042",
    productName: "Peito de Frango Congelado",
    category: "Refrigerado",
    origin: "Curitiba, PR",
    destination: "São Paulo, SP",
    risk: RISK.CRITIC,
    riskLabel: "Critico: Janela Limite Hoje",
    weightKg: 12000,
    volumeM3: 45,
    distanceKm: 408,
    requirements: ["Refrigerado"],
  },
  {
    id: "TRC-1043",
    productName: "Laticinios Pasteurizados",
    category: "Refrigerado",
    origin: "São Paulo, SP",
    destination: "Campinas, SP",
    risk: RISK.WARNING,
    riskLabel: "Atencao: Coleta nas proximas 6h",
    weightKg: 9000,
    volumeM3: 28,
    distanceKm: 96,
    requirements: ["Refrigerado"],
  },
  {
    id: "TRC-1044",
    productName: "Eletronicos de Alto Valor",
    category: "Fragil",
    origin: "Campinas, SP",
    destination: "Ribeirao Preto, SP",
    risk: RISK.WARNING,
    riskLabel: "Atencao: Entrega sensivel com janela curta",
    weightKg: 4800,
    volumeM3: 22,
    distanceKm: 223,
    requirements: ["Fragil"],
  },
  {
    id: "TRC-1045",
    productName: "Vacinas Influenza",
    category: "Saude",
    origin: "Ribeirao Preto, SP",
    destination: "Uberlandia, MG",
    risk: RISK.CRITIC,
    riskLabel: "Critico: Cadeia fria e horario restrito",
    weightKg: 3200,
    volumeM3: 18,
    distanceKm: 166,
    requirements: ["Refrigerado", "Fragil"],
  },
]

const formatWeight = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} kg`
const formatVolume = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} m³`

const getRiskCardClass = (risk) => {
  switch (risk) {
    case RISK.CRITIC:
      return "border-l-4 border-l-rose-600"
    case RISK.WARNING:
      return "border-l-4 border-l-amber-500"
    default:
      return "border-l-4 border-l-slate-200"
  }
}

const getRiskTextClass = (risk) => {
  switch (risk) {
    case RISK.CRITIC:
      return "text-rose-700"
    case RISK.WARNING:
      return "text-amber-700"
    default:
      return "text-slate-500"
  }
}

const getMostRestrictiveRequirement = (segments) => {
  const requirements = segments.flatMap((segment) => segment.requirements)

  if (requirements.includes("Hazmat")) {
    return "Hazmat"
  }

  if (requirements.includes("Refrigerado")) {
    return "Refrigerado"
  }

  if (requirements.includes("Fragil")) {
    return "Fragil"
  }

  return requirements[0] || "Carga seca"
}

const buildTimelineNodes = (segments) => {
  const nodes = []

  const appendAction = (city, action) => {
    const existingNode = nodes.find((node) => node.city === city)

    if (existingNode) {
      existingNode.actions.push(action)
      return
    }

    nodes.push({ city, actions: [action] })
  }

  segments.forEach((segment) => {
    appendAction(segment.origin, `Coleta ${segment.productName}`)
    appendAction(segment.destination, `Descarga ${segment.productName}`)
  })

  const resolveNodeType = (index, totalNodes) => {
    if (index === 0) {
      return "Coleta"
    }

    if (index === totalNodes - 1) {
      return "Destino Final"
    }

    return "Parada"
  }

  return nodes.map((node, index) => ({
    ...node,
    type: resolveNodeType(index, nodes.length),
  }))
}

export default function LoadManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSegmentIds, setSelectedSegmentIds] = useState([])
  const [auctionDeadline, setAuctionDeadline] = useState("")

  const visibleSegments = availableRouteSegments.filter((segment) => {
    const term = searchTerm.trim().toLowerCase()

    if (!term) {
      return true
    }

    return [segment.id, segment.productName, segment.category, segment.origin, segment.destination]
      .join(" ")
      .toLowerCase()
      .includes(term)
  })

  const selectedSegments = availableRouteSegments.filter((segment) => selectedSegmentIds.includes(segment.id))
  const timelineNodes = buildTimelineNodes(selectedSegments)
  const totalDistance = selectedSegments.reduce((sum, segment) => sum + segment.distanceKm, 0)
  const maxWeight = selectedSegments.reduce((max, segment) => Math.max(max, segment.weightKg), 0)
  const maxVolume = selectedSegments.reduce((max, segment) => Math.max(max, segment.volumeM3), 0)
  const restrictiveRequirement = getMostRestrictiveRequirement(selectedSegments)

  const handleToggleSegment = (segmentId) => {
    setSelectedSegmentIds((currentIds) => (
      currentIds.includes(segmentId)
        ? currentIds.filter((id) => id !== segmentId)
        : [...currentIds, segmentId]
    ))
  }

  return (
    <AppShell title="Gestão de Trechos">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-8">
        <section className="min-w-0 space-y-5">
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Consolidação de Trechos de Rota</h1>
              <p className="max-w-3xl text-sm text-slate-600">
                Selecione pernas avulsas disponíveis para agrupá-las em uma nova rota e publicar o conjunto no leilão reverso.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscar por trecho, produto, origem ou destino..."
                  className="h-11 border-slate-200 bg-white pl-10"
                />
              </div>

              <Button asChild className="h-11 bg-sky-700 text-white hover:bg-sky-800">
                <Link to="/create-load">
                  <Plus size={16} className="mr-2" /> Novo Trecho
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {visibleSegments.map((segment) => {
              const isChecked = selectedSegmentIds.includes(segment.id)

              return (
                <label
                  key={segment.id}
                  className={`grid cursor-pointer gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md md:grid-cols-[56px_minmax(0,1.2fr)_minmax(0,1.3fr)_auto] ${getRiskCardClass(segment.risk)} ${isChecked ? "ring-2 ring-sky-200" : ""}`}
                >
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleSegment(segment.id)}
                      className="h-5 w-5 rounded border-slate-300 text-sky-700 focus:ring-sky-500"
                      aria-label={`Selecionar ${segment.id}`}
                    />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <p className="font-mono text-sm font-semibold text-slate-900">{segment.id}</p>
                    <p className="truncate text-sm font-medium text-slate-800">{segment.productName}</p>
                    <Badge variant="outline" className="w-fit border-slate-200 bg-slate-50 text-slate-600">
                      {segment.category}
                    </Badge>
                  </div>

                  <div className="min-w-0 space-y-1.5">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {segment.origin} <span className="text-slate-400">➔</span> {segment.destination}
                    </p>
                    <p className={`text-xs font-medium ${getRiskTextClass(segment.risk)}`}>
                      {segment.riskLabel}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 md:justify-end">
                    <Badge className="border-none bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-slate-100">
                      {formatWeight(segment.weightKg)}
                    </Badge>
                    <Badge className="border-none bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-slate-100">
                      {formatVolume(segment.volumeM3)}
                    </Badge>
                  </div>
                </label>
              )
            })}

            {visibleSegments.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-500">
                Nenhum trecho disponivel para composicao foi encontrado com esse filtro.
              </div>
            )}
          </div>
        </section>

        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <div className="rounded-3xl border-l border-slate-200 bg-slate-50 p-5 shadow-sm lg:min-h-[640px] lg:rounded-[28px]">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-semibold text-slate-900">Nova Rota em Composição</h2>
              <p className="mt-1 text-sm text-slate-600">
                O painel reage aos trechos marcados e mostra uma prévia operacional unificada da rota que irá para o leilão.
              </p>
            </div>

            <div className="space-y-5 py-5">
              {selectedSegments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-sm text-slate-500">
                  Marque um ou mais trechos na lista para montar a prévia da rota e habilitar a publicação no leilão reverso.
                </div>
              ) : (
                <>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Preview do roteiro</p>
                    <div className="mt-4 space-y-4">
                      {timelineNodes.map((node, index) => (
                        <div key={`${node.city}-${index}`} className="grid grid-cols-[24px_minmax(0,1fr)] gap-3">
                          <div className="flex flex-col items-center">
                            <span className="h-3 w-3 rounded-full bg-sky-600" />
                            {index < timelineNodes.length - 1 && <span className="mt-2 h-full min-h-8 w-px border-l border-dashed border-slate-300" />}
                          </div>

                          <div className="pb-2">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{node.type}</p>
                            <p className="mt-1 text-sm font-semibold text-slate-900">{node.city}</p>
                            <div className="mt-2 space-y-1.5">
                              {node.actions.map((action) => (
                                <p key={`${node.city}-${action}`} className="text-sm text-slate-600">
                                  {action}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Resumo</p>
                    <div className="mt-4 space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Distancia total estimada</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">{new Intl.NumberFormat("pt-BR").format(totalDistance)} km</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Capacidade critica requisitada</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {formatWeight(maxWeight)} • {formatVolume(maxVolume)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Exigencia mais restritiva</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">{restrictiveRequirement}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label htmlFor="auction-deadline" className="text-sm font-medium text-slate-700">
                  Encerramento do Leilao
                </label>
                <Input
                  id="auction-deadline"
                  type="datetime-local"
                  value={auctionDeadline}
                  onChange={(event) => setAuctionDeadline(event.target.value)}
                  className="border-slate-200 bg-white"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-5">
              <Button className="h-11 w-full bg-sky-700 text-white hover:bg-sky-800" disabled={selectedSegments.length === 0}>
                Publicar Rota no Leilao Reverso
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  )
}