import { useState } from "react"
import { Link } from "react-router-dom"
import { Filter, MoreHorizontal, Pencil, Plus, Route, Search, Trash2 } from "lucide-react"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function RouteManagement() {
  const [routes, setRoutes] = useState([
    {
      id: "RT-101",
      origin: "Curitiba, PR",
      destination: "São Paulo, SP",
      distance: "408 km",
      estimatedTime: "5h 45m",
      baseFare: 2500,
      status: "Ativa",
    },
    {
      id: "RT-102",
      origin: "Joinville, SC",
      destination: "Campinas, SP",
      distance: "530 km",
      estimatedTime: "7h 15m",
      baseFare: 3100,
      status: "Ativa",
    },
    {
      id: "RT-103",
      origin: "Araucária, PR",
      destination: "Rio de Janeiro, RJ",
      distance: "850 km",
      estimatedTime: "11h 30m",
      baseFare: 4200,
      status: "Ativa",
    },
    {
      id: "RT-104",
      origin: "Ponta Grossa, PR",
      destination: "Santos, SP",
      distance: "510 km",
      estimatedTime: "7h 00m",
      baseFare: 2800,
      status: "Inativa",
    },
  ])
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [draftRoute, setDraftRoute] = useState(null)

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const handleEdit = (route) => {
    setSelectedRoute(route)
    setDraftRoute(route)
    setIsEditOpen(true)
  }

  const handleDelete = (routeId) => {
    const shouldDelete = globalThis.confirm(`Tem certeza que deseja excluir a rota ${routeId}?`)

    if (!shouldDelete) {
      return
    }

    setRoutes((currentRoutes) => currentRoutes.filter((route) => route.id !== routeId))
  }

  const handleDraftChange = (field, value) => {
    setDraftRoute((current) => ({
      ...current,
      [field]: field === "baseFare" ? Number(value) || 0 : value,
    }))
  }

  const handleSaveEdit = () => {
    if (!draftRoute) {
      return
    }

    setRoutes((currentRoutes) => currentRoutes.map((route) => (route.id === draftRoute.id ? draftRoute : route)))
    setIsEditOpen(false)
    setSelectedRoute(null)
    setDraftRoute(null)
  }

  const handleCloseEdit = (open) => {
    setIsEditOpen(open)

    if (!open) {
      setSelectedRoute(null)
      setDraftRoute(null)
    }
  }

  return (
    <AppShell title="Gestão de Rotas">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex w-full items-center gap-3 md:w-auto">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar por ID, origem ou destino..."
              className="border-slate-200 bg-white pl-9"
            />
          </div>

          <Button variant="outline" className="border-slate-200 bg-white">
            <Filter size={16} className="mr-2" /> Filtros
          </Button>
        </div>

        <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
          <Link to="/create-route">
            <Plus size={16} className="mr-2" /> Nova Rota
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Trajeto (Origem → Destino)</TableHead>
              <TableHead>Distância</TableHead>
              <TableHead>Tempo (ETA)</TableHead>
              <TableHead>Tarifa Base</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[64px] text-right">
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id} className="hover:bg-slate-50/50">
                <TableCell className="font-medium text-slate-900">{route.id}</TableCell>
                <TableCell className="flex items-center font-medium text-slate-700">
                  {route.origin} <Route size={14} className="mx-2 text-slate-300" /> {route.destination}
                </TableCell>
                <TableCell className="text-slate-600">{route.distance}</TableCell>
                <TableCell className="font-medium text-blue-600">{route.estimatedTime}</TableCell>
                <TableCell className="font-medium text-emerald-700">{formatCurrency(route.baseFare)}</TableCell>
                <TableCell>
                  <Badge
                    variant={route.status === "Ativa" ? "secondary" : "outline"}
                    className={route.status === "Ativa" ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : "text-slate-500"}
                  >
                    {route.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-200">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal size={16} className="text-slate-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem className="cursor-pointer text-slate-700" onClick={() => handleEdit(route)}>
                        <Pencil size={14} className="mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700" onClick={() => handleDelete(route.id)}>
                        <Trash2 size={14} className="mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditOpen} onOpenChange={handleCloseEdit}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-slate-800">
              <Route size={18} className="mr-2 text-blue-600" />
              Editar Rota
            </DialogTitle>
            <DialogDescription>
              Atualize os dados da rota {selectedRoute?.id} e salve para refletir na tabela.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="route-origin" className="text-sm font-medium text-slate-700">
                Ponto de Origem
              </label>
              <Input
                id="route-origin"
                value={draftRoute?.origin || ""}
                onChange={(e) => handleDraftChange("origin", e.target.value)}
                className="border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="route-destination" className="text-sm font-medium text-slate-700">
                Ponto de Destino
              </label>
              <Input
                id="route-destination"
                value={draftRoute?.destination || ""}
                onChange={(e) => handleDraftChange("destination", e.target.value)}
                className="border-slate-200"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="route-distance" className="text-sm font-medium text-slate-700">
                  Distância
                </label>
                <Input
                  id="route-distance"
                  value={draftRoute?.distance || ""}
                  onChange={(e) => handleDraftChange("distance", e.target.value)}
                  className="border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="route-eta" className="text-sm font-medium text-slate-700">
                  Tempo (ETA)
                </label>
                <Input
                  id="route-eta"
                  value={draftRoute?.estimatedTime || ""}
                  onChange={(e) => handleDraftChange("estimatedTime", e.target.value)}
                  className="border-slate-200"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="route-base-fare" className="text-sm font-medium text-slate-700">
                  Tarifa Base Padrão (R$)
                </label>
                <Input
                  id="route-base-fare"
                  type="number"
                  value={draftRoute?.baseFare ?? 0}
                  onChange={(e) => handleDraftChange("baseFare", e.target.value)}
                  className="border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="route-status" className="text-sm font-medium text-slate-700">
                  Status
                </label>
                <Input
                  id="route-status"
                  value={draftRoute?.status || ""}
                  onChange={(e) => handleDraftChange("status", e.target.value)}
                  className="border-slate-200"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => handleCloseEdit(false)}>
              Cancelar
            </Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSaveEdit}>
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  )
}
