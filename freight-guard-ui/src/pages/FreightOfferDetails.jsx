import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useParams, useNavigate } from "react-router-dom"
import {
  MapPin,
  Package,
  Truck,
  Calendar,
  Clock,
  DollarSign,
  ArrowLeft,
} from "lucide-react"

export default function FreightOfferDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock simulando retorno da API
  const oferta = {
    id: id || "OFT-9921",
    contratante: "Volvo Cars do Brasil",
    origem: "Curitiba, PR",
    destino: "São Paulo, SP",
    peso: "12 Ton",
    volume: "45 m³",
    veiculoExigido: "Refrigerado",
    dataColeta: "03/05/2026",
    dataEntrega: "04/05/2026",
    valor: "R$ 2.500,00",
    status: "Aguardando Lances",
  }

  return (
    <AppShell title={`Detalhes da Oferta: ${oferta.id}`}>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/freights-mural")}
            className="text-slate-600 hover:bg-slate-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Mural
          </Button>
          <Badge className="border-none bg-amber-100 text-xs tracking-wide text-amber-800 uppercase">
            {oferta.status}
          </Badge>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50">
            <CardTitle className="flex items-center text-lg text-slate-800">
              <MapPin className="mr-2 text-blue-500" size={20} /> Rota e
              Agendamento
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase">
                Ponto de Coleta
              </p>
              <p className="text-lg font-bold text-slate-800">
                {oferta.origem}
              </p>
              <p className="flex items-center pt-2 text-sm text-slate-600">
                <Calendar className="mr-1 h-4 w-4" /> {oferta.dataColeta}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase">
                Ponto de Entrega
              </p>
              <p className="text-lg font-bold text-slate-800">
                {oferta.destino}
              </p>
              <p className="flex items-center pt-2 text-sm text-slate-600">
                <Clock className="mr-1 h-4 w-4" /> {oferta.dataEntrega}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-semibold tracking-wider text-slate-500 uppercase">
                <Package className="mr-2 h-4 w-4" /> Carga Física
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-800">
                <strong className="text-lg">{oferta.peso}</strong> peso total
              </p>
              <p className="mt-1 text-slate-800">
                <strong className="text-lg">{oferta.volume}</strong> volume
                livre req.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-semibold tracking-wider text-slate-500 uppercase">
                <Truck className="mr-2 h-4 w-4" /> Veículo Req.
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-slate-800">
                {oferta.veiculoExigido}
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-semibold tracking-wider text-emerald-700 uppercase">
                <DollarSign className="mr-2 h-4 w-4" /> Valor Ofertado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-black text-emerald-800">
                {oferta.valor}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
