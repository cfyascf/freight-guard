import { useEffect, useMemo, useState } from "react"
import { ArrowRight, Clock3, Search, Truck } from "lucide-react"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const vehicleOptions = ["Todos", "Baú Frigorífico", "Sider", "Carga Seca"]

const auctionOpportunities = [
  {
    id: "ROT-9921",
    vehicleType: "Baú Frigorífico",
    deadline: "2026-06-04T16:45:00",
    cities: ["Curitiba-PR", "São Paulo-SP", "Rio de Janeiro-RJ"],
    totalWeight: "18.400 kg",
    totalVolume: "58 m³",
    currentBid: 4200,
  },
  {
    id: "ROT-9938",
    vehicleType: "Sider",
    deadline: "2026-06-04T17:52:00",
    cities: ["Joinville-SC", "Campinas-SP", "Betim-MG"],
    totalWeight: "22.000 kg",
    totalVolume: "72 m³",
    currentBid: 5150,
  },
  {
    id: "ROT-9954",
    vehicleType: "Carga Seca",
    deadline: "2026-06-04T19:08:00",
    cities: ["Londrina-PR", "Ribeirão Preto-SP", "Contagem-MG"],
    totalWeight: "14.600 kg",
    totalVolume: "49 m³",
    currentBid: 3890,
  },
  {
    id: "ROT-9962",
    vehicleType: "Baú Frigorífico",
    deadline: "2026-06-04T18:36:00",
    cities: ["Maringá-PR", "Guarulhos-SP", "Serra-ES"],
    totalWeight: "19.200 kg",
    totalVolume: "61 m³",
    currentBid: 4680,
  },
]

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

function getCountdownLabel(deadline, now) {
  const diffMs = new Date(deadline).getTime() - now.getTime()

  if (diffMs <= 0) {
    return "Encerrado"
  }

  const totalMinutes = Math.floor(diffMs / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `Encerra em: ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`
}

export default function CarrierPortal() {
  const [searchTerm, setSearchTerm] = useState("")
  const [vehicleFilter, setVehicleFilter] = useState("Todos")
  const [bidValues, setBidValues] = useState({})
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const intervalId = globalThis.setInterval(() => {
      setNow(new Date())
    }, 60000)

    return () => globalThis.clearInterval(intervalId)
  }, [])

  const filteredOpportunities = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return auctionOpportunities.filter((opportunity) => {
      const matchesVehicle = vehicleFilter === "Todos" || opportunity.vehicleType === vehicleFilter
      const matchesCity =
        normalizedSearch.length === 0 ||
        opportunity.cities.some((city) => city.toLowerCase().includes(normalizedSearch))

      return matchesVehicle && matchesCity
    })
  }, [searchTerm, vehicleFilter])

  const updateBidValue = (routeId, value) => {
    setBidValues((current) => ({
      ...current,
      [routeId]: value,
    }))
  }

  const getBidState = (opportunity) => {
    const rawValue = bidValues[opportunity.id]

    if (!rawValue) {
      return {
        isValid: false,
        buttonLabel: "Enviar Lance",
      }
    }

    const bidNumber = Number(rawValue)

    if (!Number.isFinite(bidNumber) || bidNumber <= 0) {
      return {
        isValid: false,
        buttonLabel: "Valor inválido",
      }
    }

    if (bidNumber >= opportunity.currentBid) {
      return {
        isValid: false,
        buttonLabel: "Lance deve ser menor",
      }
    }

    return {
      isValid: true,
      buttonLabel: "Enviar Lance",
    }
  }

  return (
    <AppShell title="Portal do Transportador - Oportunidades de Frete">
      <div className="mx-auto max-w-7xl space-y-6">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight text-slate-900">
              Mural de Ofertas Ativas
            </CardTitle>
            <CardDescription className="max-w-3xl text-sm leading-6 text-slate-600">
              Avalie as rotas publicadas e envie um lance competitivo. Para ser computado no motor do leilão reverso, o valor informado precisa ser obrigatoriamente menor que o lance atual mais baixo.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscar por cidade do itinerário"
                  className="h-11 border-slate-200 bg-white pl-10"
                />
              </div>

              <div className="w-full lg:w-[260px]">
                <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                  <SelectTrigger className="h-11 border-slate-200 bg-white">
                    <SelectValue placeholder="Filtrar por equipamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-5 xl:grid-cols-2">
          {filteredOpportunities.map((opportunity) => {
            const bidState = getBidState(opportunity)

            return (
              <Card
                key={opportunity.id}
                className="border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardHeader className="space-y-4 border-b border-slate-100 pb-5">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <p className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                        {opportunity.id}
                      </p>
                      <Badge className="w-fit border-none bg-sky-100 text-sky-800 hover:bg-sky-100">
                        {opportunity.vehicleType}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
                      <Clock3 className="h-4 w-4" />
                      <span>{getCountdownLabel(opportunity.deadline, now)}</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                      {opportunity.cities.map((city, index) => (
                        <div key={`${opportunity.id}-${city}`} className="flex items-center gap-2">
                          <span className="font-medium text-slate-700">{city}</span>
                          {index < opportunity.cities.length - 1 ? <ArrowRight className="h-3.5 w-3.5 text-slate-300" /> : null}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1">
                        <Truck className="h-3.5 w-3.5 text-slate-400" />
                        Peso total: {opportunity.totalWeight}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1">
                        Cubagem: {opportunity.totalVolume}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-5">
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Lance Atual Mais Baixo
                      </p>
                      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                        {currencyFormatter.format(opportunity.currentBid)}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Ação de Lance
                      </p>
                      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          inputMode="decimal"
                          value={bidValues[opportunity.id] ?? ""}
                          onChange={(event) => updateBidValue(opportunity.id, event.target.value)}
                          placeholder="Digite seu valor (R$)"
                          className="h-11 border-slate-200 bg-white"
                        />
                        <Button
                          type="button"
                          title="O sistema validará se o valor informado é menor que o lance atual antes de processar no backend em C#."
                          disabled={!bidState.isValid}
                          className={`h-11 min-w-[170px] text-white ${
                            bidState.isValid
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : "bg-slate-300 text-slate-500 hover:bg-slate-300"
                          }`}
                        >
                          {bidState.buttonLabel}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {filteredOpportunities.length === 0 ? (
          <Card className="border-dashed border-slate-300 bg-white shadow-sm">
            <CardContent className="flex min-h-40 items-center justify-center pt-6 text-center text-sm text-slate-500">
              Nenhuma oportunidade encontrada para os filtros aplicados.
            </CardContent>
          </Card>
        ) : null}
      </div>
    </AppShell>
  )
}
