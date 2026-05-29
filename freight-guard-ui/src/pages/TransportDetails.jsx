import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useParams, useNavigate } from "react-router-dom"
import { CheckCircle2, Navigation, Package, ArrowLeft } from "lucide-react"

export default function TransportDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock do transporte atual (via API)
  const transport = {
    id: id || 101,
    origin: "São Paulo, SP",
    destination: "Curitiba, PR",
    status: "Em trânsito",
    vehiclePlate: "ABC-1234",
    loadId: "CRG-882",
    departureTime: "2026-05-28 08:00",
  }

  const handleUpdateStatus = () => {
    // Lógica para chamar API de atualização de status do C# (ex: PATCH /api/transports/{id}/status)
    alert("Status atualizado para 'Entregue' com sucesso!")
    navigate("/my-transports")
  }

  return (
    <AppShell title={`Detalhes do Transporte #${transport.id}`}>
      <div className="mx-auto mt-4 max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/my-transports")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
          <Badge className="bg-amber-500 px-3 py-1 text-sm text-white">
            {transport.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Navigation className="text-blue-500" /> Rota em Execução
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">De (Origem)</p>
                <p className="text-md font-semibold">{transport.origin}</p>
                <p className="text-xs text-gray-400">
                  Saída: {transport.departureTime}
                </p>
              </div>
              <div className="ml-2 border-l-2 border-dashed border-gray-300 py-2 pl-4">
                <p className="text-xs text-gray-400">Em andamento</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Para (Destino)</p>
                <p className="text-md font-semibold">{transport.destination}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="text-gray-500" /> Dados da Carga
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">ID da Remessa</p>
                <p className="mb-2 font-bold">{transport.loadId}</p>
                <p className="text-sm text-gray-500">Veículo Alocado</p>
                <p className="font-bold text-blue-600">
                  {transport.vehiclePlate}
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="flex flex-col items-center pt-6 text-center">
                <CheckCircle2 className="mb-2 h-12 w-12 text-green-600" />
                <h3 className="mb-2 font-bold text-gray-800">
                  Finalizar Viagem
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Clique no botão abaixo apenas quando a carga for descarregada
                  no destino final.
                </p>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleUpdateStatus}
                >
                  Marcar como Entregue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
