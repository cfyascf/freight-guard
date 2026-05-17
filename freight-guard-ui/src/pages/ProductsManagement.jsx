import { useState } from "react"
import { Box, MoreHorizontal, Pencil, Plus, Trash2, AlertTriangle, Search, Filter } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function ProductManagement() {
  // Mock inicial dos produtos com os novos campos focados em logística
  const [produtos, setProdutos] = useState([
    {
      id: "PRD-1001",
      sku: "CBO-099",
      nome: "Cebola Roxa (Saca)",
      tipo: "Alimentício",
      fragil: false,
    },
    {
      id: "PRD-1002",
      sku: "MTR-V800",
      nome: "Motor Automotivo V8",
      tipo: "Peça",
      fragil: true,
    },
    {
      id: "PRD-1003",
      sku: "CASC-INV",
      nome: "Casaco de Inverno",
      tipo: "Roupa",
      fragil: false,
    },
    {
      id: "PRD-1004",
      sku: "VD-MED",
      nome: "Ampolas de Vacina",
      tipo: "Medicamento",
      fragil: true,
    }
  ])
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [draftProduct, setDraftProduct] = useState(null)

  const handleDelete = (idParaDeletar) => {
    setProdutos(produtos.filter(produto => produto.id !== idParaDeletar))
  }

  const handleEdit = (produto) => {
    setSelectedProduct(produto)
    setDraftProduct(produto)
    setIsEditOpen(true)
  }

  const handleDraftChange = (field, value) => {
    setDraftProduct((current) => ({
      ...current,
      [field]: field === "fragil" ? value === "true" : value,
    }))
  }

  const handleSaveEdit = () => {
    if (!draftProduct) {
      return
    }

    setProdutos((currentProdutos) => currentProdutos.map((produto) => (produto.id === draftProduct.id ? draftProduct : produto)))
    setIsEditOpen(false)
    setSelectedProduct(null)
    setDraftProduct(null)
  }

  const handleCloseEdit = (open) => {
    setIsEditOpen(open)

    if (!open) {
      setSelectedProduct(null)
      setDraftProduct(null)
    }
  }

  return (
    <AppShell title="Gestão de Produtos">
      <div className="flex flex-col space-y-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex w-full items-center gap-3 md:w-auto">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Buscar por SKU, nome ou tipo..."
                className="border-slate-200 bg-white pl-9"
              />
            </div>

            <Button asChild variant="outline" className="border-slate-200 bg-white">
              <Link to="/product-management">
                <Filter size={16} className="mr-2" /> Filtros
              </Link>
            </Button>
          </div>

          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
            <Link to="/create-product">
              <Plus size={16} className="mr-2" /> Novo Produto
            </Link>
          </Button>
        </div>
        
        <Card className="gap-0 border-slate-200 py-0">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[100px] font-semibold">SKU</TableHead>
                  <TableHead className="font-semibold">Nome</TableHead>
                  <TableHead className="font-semibold">Categoria / Tipo</TableHead>
                  <TableHead className="font-semibold text-center">Cuidados</TableHead>
                  <TableHead className="text-right font-semibold">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produtos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      Nenhum produto cadastrado no momento.
                    </TableCell>
                  </TableRow>
                ) : (
                  produtos.map((produto) => (
                    <TableRow key={produto.id} className="hover:bg-slate-50/50 transition-colors">
                      
                      <TableCell className="font-medium text-slate-500 text-xs">
                        {produto.sku}
                      </TableCell>
                      
                      <TableCell className="font-semibold text-slate-800">
                        {produto.nome}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center text-slate-600">
                          <Box size={14} className="mr-1.5 text-slate-400" />
                          {produto.tipo}
                        </div>
                      </TableCell>
                      

                      <TableCell className="text-center">
                        {produto.fragil ? (
                          <Badge variant="destructive" className="bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100">
                            <AlertTriangle size={12} className="mr-1" />
                            Frágil
                          </Badge>
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </TableCell>
                      
                      {/* Menu de Ações */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-200">
                              <span className="sr-only">Abrir menu</span>
                              <MoreHorizontal size={16} className="text-slate-600" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            
                            <DropdownMenuItem 
                              className="cursor-pointer text-slate-700"
                              onClick={() => handleEdit(produto)}
                            >
                              <Pencil size={14} className="mr-2" />
                              Editar
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
                              onClick={() => handleDelete(produto.id)}
                            >
                              <Trash2 size={14} className="mr-2" />
                              Excluir
                            </DropdownMenuItem>
                            
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>

                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isEditOpen} onOpenChange={handleCloseEdit}>
          <DialogContent className="sm:max-w-[520px]">
            <DialogHeader>
              <DialogTitle>Editar Produto</DialogTitle>
              <DialogDescription>
                Atualize os dados do produto {selectedProduct?.id} e salve para refletir na tabela.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <div className="space-y-2">
                <label htmlFor="product-sku" className="text-sm font-medium text-slate-700">SKU</label>
                <Input
                  id="product-sku"
                  value={draftProduct?.sku || ""}
                  onChange={(e) => handleDraftChange("sku", e.target.value)}
                  className="border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product-name" className="text-sm font-medium text-slate-700">Nome</label>
                <Input
                  id="product-name"
                  value={draftProduct?.nome || ""}
                  onChange={(e) => handleDraftChange("nome", e.target.value)}
                  className="border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product-type" className="text-sm font-medium text-slate-700">Categoria / Tipo</label>
                <Input
                  id="product-type"
                  value={draftProduct?.tipo || ""}
                  onChange={(e) => handleDraftChange("tipo", e.target.value)}
                  className="border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product-fragil" className="text-sm font-medium text-slate-700">Cuidado especial</label>
                <select
                  id="product-fragil"
                  value={draftProduct?.fragil ? "true" : "false"}
                  onChange={(e) => handleDraftChange("fragil", e.target.value)}
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-300"
                >
                  <option value="false">Não frágil</option>
                  <option value="true">Frágil</option>
                </select>
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

      </div>
    </AppShell>
  )
}