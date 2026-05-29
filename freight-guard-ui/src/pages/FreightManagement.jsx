import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Truck } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function FreightManagement() {
  const navigate = useNavigate()

  const vehicles = [
    {
      id: 1,
      plate: "ABC-1234",
      type: "Carreta LS",
      capacity: "50 m³",
      status: "Livre",
    },
    {
      id: 2,
      plate: "XYZ-9876",
      type: "Truck",
      capacity: "30 m³",
      status: "Em Viagem",
    },
  ]

  return (
    <AppShell title="Gestão da Frota">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Meus Veículos
          </h2>
          <p className="text-sm text-slate-500">
            Cadastre e gerencie a capacidade dos seus caminhões.
          </p>
        </div>
        <Button
          onClick={() => navigate("/vehicle-form")}
          className="bg-slate-900 text-white hover:bg-slate-800"
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Veículo
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold text-slate-600">
                  Placa
                </TableHead>
                <TableHead className="font-semibold text-slate-600">
                  Tipo / Modelo
                </TableHead>
                <TableHead className="font-semibold text-slate-600">
                  Vol. Máximo
                </TableHead>
                <TableHead className="font-semibold text-slate-600">
                  Status
                </TableHead>
                <TableHead className="text-right font-semibold text-slate-600">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-bold text-slate-700">
                    {v.plate}
                  </TableCell>
                  <TableCell className="text-slate-600">{v.type}</TableCell>
                  <TableCell className="text-slate-600">{v.capacity}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${v.status === "Livre" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {v.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/vehicle-form/${v.id}`)}
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => alert("Excluir " + v.plate)}
                    >
                      <Trash2 className="h-4 w-4 text-rose-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  )
}
