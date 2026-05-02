import { useState } from "react"
import { MapPin, Plus, Route, Search } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function RouteManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const routesMock = [
    {
      id: "RT-101",
      origin: "Curitiba, PR",
      destination: "São Paulo, SP",
      distance: "408 km",
      estimatedTime: "5h 45m",
      baseFare: 2500.00,
      status: "Ativa"
    },
    {
      id: "RT-102",
      origin: "Joinville, SC",
      destination: "Campinas, SP",
      distance: "530 km",
      estimatedTime: "7h 15m",
      baseFare: 3100.00,
      status: "Ativa"
    },
    {
      id: "RT-103",
      origin: "Araucária, PR",
      destination: "Rio de Janeiro, RJ",
      distance: "850 km",
      estimatedTime: "11h 30m",
      baseFare: 4200.00,
      status: "Ativa"
    },
    {
      id: "RT-104",
      origin: "Ponta Grossa, PR",
      destination: "Santos, SP",
      distance: "510 km",
      estimatedTime: "7h 00m",
      baseFare: 2800.00,
      status: "Inativa"
    }
  ]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  return (
    <AppShell
      title="Gestão de Rotas"
      actions={
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 md:w-auto">
              <Plus size={16} className="mr-2" /> Nova Rota
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center text-slate-800">
                <Route size={18} className="mr-2 text-blue-600" />
                Cadastrar Nova Rota
              </DialogTitle>
              <DialogDescription>
                Informe os pontos de origem e destino. O sistema OSRM calculará o ETA automaticamente.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Ponto de Origem</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-2.5 text-slate-400" />
                  <Input placeholder="Ex: Curitiba, PR ou CEP..." className="pl-9 border-slate-200" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Ponto de Destino</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-2.5 text-red-400" />
                  <Input placeholder="Ex: São Paulo, SP ou CEP..." className="pl-9 border-slate-200" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Tarifa Base Padrão (R$)</label>
                <Input type="number" placeholder="0,00" className="border-slate-200" />
                <p className="text-xs text-slate-500">Valor de referência para geração de leilões.</p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setIsModalOpen(false)}>
                Salvar e Calcular Rota
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="mb-6 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            type="text" 
            placeholder="Buscar por ID, origem ou destino..." 
            className="border-slate-200 bg-white pl-9 shadow-sm"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Trajeto (Origem → Destino)</TableHead>
              <TableHead>Distância</TableHead>
              <TableHead>Tempo (ETA)</TableHead>
              <TableHead>Tarifa Base</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routesMock.map((route) => (
              <TableRow key={route.id} className="hover:bg-slate-50/50">
                <TableCell className="font-medium text-slate-900">{route.id}</TableCell>
                <TableCell className="text-slate-700 font-medium flex items-center">
                  {route.origin} <Route size={14} className="mx-2 text-slate-300" /> {route.destination}
                </TableCell>
                <TableCell className="text-slate-600">{route.distance}</TableCell>
                <TableCell className="text-blue-600 font-medium">{route.estimatedTime}</TableCell>
                <TableCell className="text-emerald-700 font-medium">{formatCurrency(route.baseFare)}</TableCell>
                <TableCell>
                  <Badge variant={route.status === "Ativa" ? "secondary" : "outline"} className={route.status === "Ativa" ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : "text-slate-500"}>
                    {route.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-50">
                    <Link to="/route-overview" aria-label={`Ver rota ${route.id}`}>
                      Detalhes
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppShell>
  )
}