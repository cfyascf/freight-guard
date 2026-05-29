import { useState } from "react"
import AppShell from "@/components/app-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  Navigation,
  Search,
  Truck,
  DollarSign,
  CalendarClock,
  AlertCircle,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function MyTransports() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  // Mocks expandidos com dados operacionais e financeiros
  const ongoing = [
    {
      id: "TR-101",
      origin: "Curitiba, PR",
      dest: "São Paulo, SP",
      status: "Em Trânsito",
      date: "03/05/2026",
      vehiclePlate: "ABC-1234",
      value: "R$ 2.500,00",
    },
    {
      id: "TR-105",
      origin: "Ponta Grossa, PR",
      dest: "Joinville, SC",
      status: "Aguardando Coleta",
      date: "05/05/2026",
      vehiclePlate: "XYZ-9876",
      value: "R$ 1.600,00",
    },
    {
      id: "TR-108",
      origin: "Cascavel, PR",
      dest: "Paranaguá, PR",
      status: "Atrasado",
      date: "02/05/2026",
      vehiclePlate: "DEF-5678",
      value: "R$ 3.200,00",
    },
  ]

  const completed = [
    {
      id: "TR-089",
      origin: "Campinas, SP",
      dest: "Rio de Janeiro, RJ",
      status: "Finalizado",
      date: "28/04/2026",
      vehiclePlate: "ABC-1234",
      value: "R$ 3.100,00",
    },
    {
      id: "TR-072",
      origin: "Ortigueira, PR",
      dest: "Itajaí, SC",
      status: "Finalizado",
      date: "15/04/2026",
      vehiclePlate: "XYZ-9876",
      value: "R$ 2.900,00",
    },
  ]

  // Função para definir a cor do status dinamicamente
  const getStatusStyle = (status) => {
    switch (status) {
      case "Em Trânsito":
        return "bg-blue-100 text-blue-800"
      case "Aguardando Coleta":
        return "bg-amber-100 text-amber-800"
      case "Atrasado":
        return "bg-rose-100 text-rose-800"
      case "Finalizado":
        return "bg-slate-100 text-slate-600"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  // Filtro de pesquisa (busca por ID, origem, destino ou placa)
  const filterTransports = (list) => {
    return list.filter(
      (t) =>
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.dest.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const TransportCard = ({ t, isCompleted }) => (
    <Card className="mb-4 overflow-hidden border-slate-200 shadow-sm transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col items-start justify-between gap-4 p-5 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div
              className={`mt-1 rounded-full p-3 ${isCompleted ? "bg-slate-100" : t.status === "Atrasado" ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"}`}
            >
              {isCompleted ? (
                <MapPin size={20} className="text-slate-400" />
              ) : t.status === "Atrasado" ? (
                <AlertCircle size={20} />
              ) : (
                <Navigation size={20} />
              )}
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <p className="text-xs font-bold text-slate-500">CÓD: {t.id}</p>
                <Badge className={`border-none ${getStatusStyle(t.status)}`}>
                  {t.status}
                </Badge>
              </div>
              <p className="text-lg font-bold text-slate-800">
                {t.origin}{" "}
                <span className="mx-1 font-normal text-slate-400">→</span>{" "}
                {t.dest}
              </p>

              {/* Nova linha com informações operacionais cruciais */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 font-medium">
                  <Truck size={14} className="text-slate-500" />{" "}
                  {t.vehiclePlate}
                </div>
                <div className="flex items-center gap-1">
                  <CalendarClock size={14} className="text-slate-400" />{" "}
                  {t.date}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 flex w-full flex-col items-end gap-3 border-t border-slate-100 pt-4 md:mt-0 md:w-auto md:border-t-0 md:pt-0">
            <div className="flex items-center text-lg font-bold text-emerald-700">
              <DollarSign size={18} className="mr-0.5" /> {t.value}
            </div>
            <Button
              variant={isCompleted ? "outline" : "default"}
              className={`w-full md:w-auto ${isCompleted ? "border-slate-300 text-slate-700" : "bg-slate-900 text-white hover:bg-slate-800"}`}
              onClick={() => navigate(`/transport-details/${t.id}`)}
            >
              {isCompleted ? "Ver Recibo" : "Gerenciar Viagem"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <AppShell title="Meus Transportes">
      <div className="mx-auto mt-2 max-w-5xl">
        {/* Barra de Pesquisa Funcional */}
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Controle Operacional
            </h2>
            <p className="text-sm text-slate-500">
              Gerencie suas viagens ativas e histórico financeiro.
            </p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar por código, cidade ou placa..."
              className="border-slate-200 bg-white pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="ongoing" className="w-full">
          <TabsList className="mb-6 bg-slate-100 p-1">
            <TabsTrigger
              value="ongoing"
              className="px-6 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
            >
              Em Andamento ({filterTransports(ongoing).length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="px-6 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
            >
              Histórico Realizado ({filterTransports(completed).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing">
            {filterTransports(ongoing).length > 0 ? (
              filterTransports(ongoing).map((t) => (
                <TransportCard key={t.id} t={t} isCompleted={false} />
              ))
            ) : (
              <p className="py-8 text-center text-slate-500">
                Nenhum transporte em andamento encontrado.
              </p>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {filterTransports(completed).length > 0 ? (
              filterTransports(completed).map((t) => (
                <TransportCard key={t.id} t={t} isCompleted={true} />
              ))
            ) : (
              <p className="py-8 text-center text-slate-500">
                Nenhum histórico encontrado.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
