import { ArrowLeft, CheckCircle2, Search, Truck, XCircle } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AuctionBids() {
  const { loadId } = useParams()

  const bidsMock = [
    {
      id: "BID-5521",
      loadRef: "CRG-1042",
      carrier: "Expresso Sul Ltda",
      vehicle: "ABC-1234",
      proposedValue: 2150,
      eta: "Hoje, 18:30",
      status: "Em Análise",
    },
    {
      id: "BID-5522",
      loadRef: "CRG-1043",
      carrier: "Rota Norte Logística",
      vehicle: "XYZ-9876",
      proposedValue: 1985,
      eta: "Amanhã, 10:00",
      status: "Em Análise",
    },
    {
      id: "BID-5523",
      loadRef: "CRG-1043",
      carrier: "TransVale Transportes",
      vehicle: "JKL-4421",
      proposedValue: 1930,
      eta: "Amanhã, 09:15",
      status: "Em Análise",
    },
  ]

  const visibleBids = loadId ? bidsMock.filter((bid) => bid.loadRef === loadId) : bidsMock

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  return (
    <AppShell title={loadId ? `Lances da Carga ${loadId}` : "Lances do Leilão"}>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link to="/freights-panel">
            <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar ao Painel de Leilão
            </Button>
          </Link>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar por ID, transportadora ou veículo..."
              className="border-slate-200 bg-white pl-9 shadow-sm"
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[120px]">ID Lance</TableHead>
                <TableHead>Transportadora</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead className="text-right">Valor ofertado</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleBids.map((bid) => (
                <TableRow key={bid.id} className="hover:bg-slate-50/50">
                  <TableCell>
                    <p className="font-bold text-slate-900">{bid.id}</p>
                    <p className="text-xs text-slate-500">Carga: {bid.loadRef}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                      {bid.carrier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono bg-slate-50 text-slate-700 border-slate-200">
                      <Truck size={12} className="mr-1 text-slate-400" /> {bid.vehicle}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold text-emerald-700">
                    {formatCurrency(bid.proposedValue)}
                  </TableCell>
                  <TableCell className="text-slate-600 text-sm">{bid.eta}</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800 border-none hover:bg-blue-200">
                      {bid.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                        <CheckCircle2 size={16} className="mr-2" /> Aceitar
                      </Button>
                      <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                        <XCircle size={16} className="mr-2" /> Recusar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {visibleBids.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-slate-500">
                    Nenhum lance encontrado para esta carga.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppShell>
  )
}
