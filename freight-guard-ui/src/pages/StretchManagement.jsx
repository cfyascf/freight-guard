import { useState, useEffect } from "react"
import { Plus, Waypoints } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// 1. Definição do Mock Inicial (Simula a estrutura que virá da Base de Dados)
const MOCK_STRETCHES = [
  { id: "1", origin: "Curitiba, PR", destination: "São Paulo, SP", distance: 408, duration: "6h 30m" },
  { id: "2", origin: "São Paulo, SP", destination: "Campinas, SP", distance: 99, duration: "1h 20m" }
]

export default function StretchManagement() {
  // 2. Estado local que armazena a lista de trechos
  const [stretches, setStretches] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // 3. Efeito preparado para carregar os dados (Simula o ciclo de vida de uma API)
  useEffect(() => {
    // FUNÇÃO DE INTEGRAÇÃO (Quando o back-end em Java estiver pronto):
    // async function fetchStretches() {
    //   try {
    //     const response = await fetch("http://localhost:8080/api/stretches")
    //     const data = await response.json()
    //     setStretches(data)
    //   } catch (error) {
    //     console.error("Erro ao carregar trechos:", error)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }
    // fetchStretches()

    // Enquanto não há API, usamos o Mock com um pequeno delay para simular rede
    const timer = setTimeout(() => {
      setStretches(MOCK_STRETCHES)
      setIsLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AppShell title="Gestão de Trechos">
      <div className="mx-auto max-w-6xl space-y-6">
        
        {/* Header da Página */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Trechos Cadastrados</h1>
            <p className="text-sm text-slate-500">
              Gerencie as origens e destinos reutilizáveis para suas cargas.
            </p>
          </div>
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
            <Link to="/create-stretch">
              <Plus size={16} className="mr-2" />
              Novo Trecho
            </Link>
          </Button>
        </div>

        {/* Tabela de Trechos */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-slate-800">
              <Waypoints size={18} className="mr-2 text-blue-600" />
              Trechos Base
            </CardTitle>
            <CardDescription>
              Lista de rotas parciais (trechos) disponíveis para associação nas cargas.
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
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* 4. Renderização Dinâmica usando .map() */}
                  {stretches.map((stretch) => (
                    <TableRow key={stretch.id}>
                      <TableCell className="font-medium">{stretch.origin}</TableCell>
                      <TableCell>{stretch.destination}</TableCell>
                      <TableCell>{stretch.distance} km</TableCell>
                      <TableCell>{stretch.duration}</TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                          <Link to={`/edit-stretch/${stretch.id}`}>Editar</Link>
                        </Button>
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