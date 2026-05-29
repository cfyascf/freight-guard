import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function VehicleForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    plate: "",
    type: "",
    capacity: "",
  })

  useEffect(() => {
    if (isEditing) {
      // Buscar dados do veículo na API C# pelo ID
      setFormData({ plate: "ABC-1234", type: "Carreta LS", capacity: "32 Ton" }) // Mock
    }
  }, [id, isEditing])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Dados salvos:", formData)
    navigate("/freight-management")
  }

  return (
    <AppShell title={isEditing ? "Editar Veículo" : "Novo Veículo"}>
      <Card className="mx-auto mt-4 max-w-2xl">
        <CardHeader>
          <CardTitle>
            {isEditing
              ? "Atualizar dados do veículo"
              : "Cadastrar novo veículo"}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Placa do Veículo</label>
              <Input
                placeholder="Ex: ABC-1234"
                value={formData.plate}
                onChange={(e) =>
                  setFormData({ ...formData, plate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Veículo</label>
              <Input
                placeholder="Ex: Carreta LS, Truck"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Capacidade de Carga</label>
              <Input
                placeholder="Ex: 32 Toneladas"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/freight-management")}
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar Veículo</Button>
          </CardFooter>
        </form>
      </Card>
    </AppShell>
  )
}
