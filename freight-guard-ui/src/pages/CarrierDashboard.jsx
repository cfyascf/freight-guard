import AppShell from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  Truck,
  PackageCheck,
  ShieldCheck,
  ArrowRight,
  Navigation,
  Clock,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CarrierDashboard() {
  const navigate = useNavigate()

  // Mocks dos Indicadores (KPIs)
  const kpis = {
    faturamentoMensal: "R$ 45.200,00",
    transportesAtivos: 4,
    taxaOcupacao: "85%", // Relacionado à US011/US012 (Cálculo de volume)
    overbookingsBloqueados: 2, // Mostra o valor da sua regra de negócio principal
  }

  // Mock de Veículos em Operação (Mini-lista)
  const frotaAtiva = [
    {
      placa: "ABC-1234",
      rota: "Curitiba → São Paulo",
      eta: "Hoje, 14:00",
      status: "No Prazo",
    },
    {
      placa: "XYZ-9876",
      rota: "Ponta Grossa → Joinville",
      eta: "Amanhã, 09:00",
      status: "Atrasado",
    },
  ]

  // Mock de Ofertas Recentes (Mini Mural de Leilão)
  const ofertasRecentes = [
    {
      id: "OFT-9940",
      origem: "Cascavel, PR",
      destino: "Paranaguá, PR",
      valor: "R$ 3.200,00",
      volume: "50 m³",
    },
    {
      id: "OFT-9941",
      origem: "Ortigueira, PR",
      destino: "Itajaí, SC",
      valor: "R$ 2.900,00",
      volume: "48 m³",
    },
  ]

  return (
    <AppShell title="Painel de Controle - Transportador">
      <div className="mx-auto mt-2 max-w-6xl space-y-6">
        {/* Cabeçalho de Boas-vindas */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Visão Geral da Operação
          </h2>
          <p className="text-sm text-slate-500">
            Acompanhe a rentabilidade e o desempenho da sua frota em tempo real.
          </p>
        </div>

        {/* Linha de KPIs (Key Performance Indicators) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Receita Estimada (Mês)
              </CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                {kpis.faturamentoMensal}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                +12% em relação ao mês passado
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Viagens em Andamento
              </CardTitle>
              <Truck className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                {kpis.transportesAtivos}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Veículos atualmente na estrada
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Aproveitamento de Frota
              </CardTitle>
              <PackageCheck className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                {kpis.taxaOcupacao}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Volume médio ocupado por viagem
              </p>
            </CardContent>
          </Card>

          <Card className="border-none bg-slate-900 text-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Proteção SIGLOC
              </CardTitle>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpis.overbookingsBloqueados}
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Overbookings logísticos prevenidos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Seção Inferior: Listas Rápidas */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Frota em Operação */}
          <Card className="flex flex-col border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50 pb-4">
              <CardTitle className="flex items-center text-base text-slate-800">
                <Navigation className="mr-2 h-4 w-4 text-blue-500" />{" "}
                Monitoramento de Frota
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-blue-600"
                onClick={() => navigate("/my-transports")}
              >
                Ver todos <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="divide-y divide-slate-100">
                {frotaAtiva.map((frota, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50"
                  >
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <p className="font-bold text-slate-800">
                          {frota.placa}
                        </p>
                        <Badge
                          className={`border-none px-2 py-0.5 text-[10px] uppercase ${frota.status === "No Prazo" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                        >
                          {frota.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">{frota.rota}</p>
                    </div>
                    <div className="text-right">
                      <p className="flex items-center justify-end text-xs font-semibold text-slate-600">
                        <Clock className="mr-1 h-3 w-3" /> ETA
                      </p>
                      <p className="text-sm font-bold text-slate-800">
                        {frota.eta}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Oportunidades / Leilão */}
          <Card className="flex flex-col border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50 pb-4">
              <CardTitle className="flex items-center text-base text-slate-800">
                <PackageCheck className="mr-2 h-4 w-4 text-amber-500" /> Novas
                Ofertas (Leilão)
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-amber-600"
                onClick={() => navigate("/freights-mural")}
              >
                Ir para o Mural <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="divide-y divide-slate-100">
                {ofertasRecentes.map((oferta, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50"
                  >
                    <div>
                      <p className="mb-1 text-xs font-bold text-slate-500">
                        {oferta.id} • {oferta.volume}
                      </p>
                      <p className="text-sm font-semibold text-slate-800">
                        {oferta.origem}{" "}
                        <span className="font-normal text-slate-400">→</span>{" "}
                        {oferta.destino}
                      </p>
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <p className="text-sm font-black text-emerald-700">
                        {oferta.valor}
                      </p>
                      <Button
                        size="sm"
                        className="mt-2 h-7 bg-slate-900 text-xs hover:bg-slate-800"
                        onClick={() => navigate(`/freight-offer/${oferta.id}`)}
                      >
                        Dar Lance
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
