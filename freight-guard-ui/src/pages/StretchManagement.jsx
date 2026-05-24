import { useState, useEffect } from "react"
import { Plus, Waypoints, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const MOCK_STRETCHES = [
  {
    id: "1",
    origin: "Curitiba, PR",
    destination: "São Paulo, SP",
    distance: 408,
    duration: "6h 30m",
  },
  {
    id: "2",
    origin: "São Paulo, SP",
    destination: "Campinas, SP",
    distance: 99,
    duration: "1h 20m",
  },
]

export default function StretchManagement() {
  const [stretches, setStretches] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setStretches(MOCK_STRETCHES)
      setIsLoading(false)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      `Tem a certeza que deseja excluir o trecho ${id}?`
    )
    if (confirmDelete) {
      setStretches((current) => current.filter((s) => s.id !== id))
    }
  }

  return (
    <AppShell title="Gestão de Trechos">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Trechos Cadastrados
            </h1>
            <p className="text-sm text-slate-500">
              Gerencie as origens e destinos reutilizáveis para as suas cargas.
            </p>
          </div>
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
            <Link to="/create-stretch">
              <Plus size={16} className="mr-2" />
              Novo Trecho
            </Link>
          </Button>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-slate-800">
              <Waypoints size={18} className="mr-2 text-blue-600" />
              Trechos Base
            </CardTitle>
            <CardDescription>
              Lista de rotas trechos disponíveis para associação nas
              cargas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8 text-sm text-slate-500">
                A carregar os trechos...
              </div>
            ) : stretches.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-sm text-slate-500">
                Nenhum trecho cadastrado no sistema.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Origem</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Distância (km)</TableHead>
                    <TableHead>Tempo Estimado</TableHead>
                    <TableHead className="w-[64px] text-right">
                      <span className="sr-only">Ações</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stretches.map((stretch) => (
                    <TableRow key={stretch.id}>
                      <TableCell className="font-medium">
                        {stretch.origin}
                      </TableCell>
                      <TableCell>{stretch.destination}</TableCell>
                      <TableCell>{stretch.distance} km</TableCell>
                      <TableCell>{stretch.duration}</TableCell>
                      <TableCell className="text-right">
                        <div onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-slate-200"
                              >
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal
                                  size={16}
                                  className="text-slate-600"
                                />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-[160px]"
                            >
                              <DropdownMenuItem
                                asChild
                                className="cursor-pointer text-slate-700"
                              >
                                <Link to={`/edit-stretch/${stretch.id}`}>
                                  <Pencil size={14} className="mr-2" />
                                  Editar
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
                                onClick={() => handleDelete(stretch.id)}
                              >
                                <Trash2 size={14} className="mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
