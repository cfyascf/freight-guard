import { useState } from "react"
import { Box, PackageOpen, Plus, Search, Tags } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ProductManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const productsMock = [
    {
      id: "PRD-001",
      name: "Peças Automotivas (Motor)",
      category: "Carga Seca",
      sku: "SKU-AUTO-992",
      requiresPackaging: "Pallet Padrão",
      status: "Ativo"
    },
    {
      id: "PRD-002",
      name: "Vacinas H1N1",
      category: "Termolábil",
      sku: "SKU-MED-104",
      requiresPackaging: "Caixa Térmica",
      status: "Ativo"
    },
    {
      id: "PRD-003",
      name: "Ácido Sulfúrico",
      category: "Carga Perigosa",
      sku: "SKU-QUI-775",
      requiresPackaging: "Tambor Homologado",
      status: "Ativo"
    },
    {
      id: "PRD-004",
      name: "Bobinas de Aço",
      category: "Carga Pesada",
      sku: "SKU-MET-221",
      requiresPackaging: "Berço de Madeira",
      status: "Inativo"
    }
  ]

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Termolábil': return 'bg-blue-100 text-blue-800 border-transparent'
      case 'Carga Perigosa': return 'bg-red-100 text-red-800 border-transparent'
      case 'Carga Pesada': return 'bg-amber-100 text-amber-800 border-transparent'
      default: return 'bg-slate-100 text-slate-700 border-transparent'
    }
  }

  return (
    <AppShell
      title="Gestão de Produtos"
      actions={
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 md:w-auto">
              <Plus size={16} className="mr-2" /> Cadastrar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center text-slate-800">
                <PackageOpen size={18} className="mr-2 text-blue-600" />
                Novo Produto Padrão
              </DialogTitle>
              <DialogDescription>
                Cadastre os produtos frequentes para agilizar o lançamento de novas cargas.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nome do Produto</label>
                <div className="relative">
                  <Box size={16} className="absolute left-3 top-2.5 text-slate-400" />
                  <Input placeholder="Ex: Motores Elétricos WEG..." className="pl-9 border-slate-200" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">SKU / Código</label>
                  <Input placeholder="Ex: SKU-9988" className="border-slate-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Categoria</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seca">Carga Seca</SelectItem>
                      <SelectItem value="termolabil">Termolábil (Refrigerada)</SelectItem>
                      <SelectItem value="perigosa">Carga Perigosa (Química)</SelectItem>
                      <SelectItem value="pesada">Carga Pesada / Indivisível</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Embalagem Exigida</label>
                <div className="relative">
                  <Tags size={16} className="absolute left-3 top-2.5 text-slate-400" />
                  <Input placeholder="Ex: Pallet Padrão, Tambor..." className="pl-9 border-slate-200" />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setIsModalOpen(false)}>
                Salvar Produto
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
            placeholder="Buscar por nome, SKU ou categoria..." 
            className="border-slate-200 bg-white pl-9 shadow-sm"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[120px]">Cód. Sistema</TableHead>
              <TableHead>Nome do Produto</TableHead>
              <TableHead>SKU / Ref</TableHead>
              <TableHead>Categoria Primária</TableHead>
              <TableHead>Embalagem / Paletização</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsMock.map((product) => (
              <TableRow key={product.id} className="hover:bg-slate-50/50">
                <TableCell className="font-medium text-slate-900">{product.id}</TableCell>
                <TableCell className="font-semibold text-slate-700">{product.name}</TableCell>
                <TableCell className="text-slate-500 font-mono text-sm">{product.sku}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getCategoryColor(product.category)}>
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600">{product.requiresPackaging}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={product.status === "Ativo" ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-slate-100 text-slate-500"}>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-50">
                    <Link to="/create-load" aria-label={`Usar produto ${product.id} na carga`}>
                      Usar
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