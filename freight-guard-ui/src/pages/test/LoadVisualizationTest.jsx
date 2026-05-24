import { useState, useMemo, useRef } from "react"
import { ArrowLeft, Box as BoxIcon, Truck, Layers, MousePointerClick, PackagePlus, Trash2, Move } from "lucide-react"
import { Link } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Box as Box3D, Edges, Text, Grid, TransformControls } from "@react-three/drei"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

const GAP = 0.001

const getAABB = (pos, size) => ({
  minX: pos[0] - size[0] / 2 - GAP, maxX: pos[0] + size[0] / 2 + GAP,
  minY: pos[1] - size[1] / 2 - GAP, maxY: pos[1] + size[1] / 2 + GAP,
  minZ: pos[2] - size[2] / 2 - GAP, maxZ: pos[2] + size[2] / 2 + GAP,
})

const isColliding = (a, b) => {
  return (
    a.minX < b.maxX && a.maxX > b.minX &&
    a.minY < b.maxY && a.maxY > b.minY &&
    a.minZ < b.maxZ && a.maxZ > b.minZ
  )
}

const checkCollisions = (pos, size, excludeId, loaded, truckDim) => {
  const limitX = truckDim.width / 2 - size[0] / 2 - GAP
  const limitZ = truckDim.depth / 2 - size[2] / 2 - GAP
  const limitY = truckDim.height - size[1] / 2 - GAP

  if (pos[0] < -limitX - 0.01 || pos[0] > limitX + 0.01 || pos[2] < -limitZ - 0.01 || pos[2] > limitZ + 0.01 || pos[1] < size[1] / 2 + GAP - 0.01 || pos[1] > limitY + 0.01) {
    return true
  }

  const currentAABB = getAABB(pos, size)
  for (let item of loaded) {
    if (item.id === excludeId) continue
    const itemAABB = getAABB(item.pos, item.size)
    if (isColliding(currentAABB, itemAABB)) {
      return true
    }
  }
  return false
}

const calculatePlacement = (x, z, size, loaded, truckDim) => {
  let sx = Math.round(x / 0.25) * 0.25
  let sz = Math.round(z / 0.25) * 0.25

  const limitX = truckDim.width / 2 - size[0] / 2 - GAP
  const limitZ = truckDim.depth / 2 - size[2] / 2 - GAP
  sx = Math.max(-limitX, Math.min(limitX, sx))
  sz = Math.max(-limitZ, Math.min(limitZ, sz))

  let sy = size[1] / 2 + GAP
  let isValid = true
  let resolved = false
  let iterations = 0

  while (!resolved && iterations < 20) {
    let currentAABB = getAABB([sx, sy, sz], size)
    let collisionFound = false
    let highestSupportY = sy

    for (let item of loaded) {
      let itemAABB = getAABB(item.pos, item.size)
      if (isColliding(currentAABB, itemAABB)) {
        collisionFound = true
        highestSupportY = Math.max(highestSupportY, itemAABB.maxY + size[1] / 2 + GAP)
      }
    }

    if (collisionFound) {
      sy = highestSupportY
    } else {
      resolved = true
    }
    iterations++
  }

  if (sy + size[1] / 2 + GAP > truckDim.height) {
    isValid = false
  }

  return { pos: [sx, sy, sz], isValid }
}

const INITIAL_CATALOG = [
  { templateId: "1", name: "Palete Eletrônicos", color: "#3b82f6", size: [1.2, 1.5, 1.0], weight: 500 },
  { templateId: "2", name: "Bloco Motor", color: "#334155", size: [1.5, 1.2, 1.5], weight: 1200 },
  { templateId: "3", name: "Caixas Frágeis", color: "#14b8a6", size: [1.0, 1.0, 1.0], weight: 300 },
  { templateId: "4", name: "Bobina Metálica", color: "#f59e0b", size: [2.0, 2.0, 2.0], weight: 2500 },
]

function EditableCargo({ cargo, isSelected, onSelect, loadedCargos, setLoadedCargos, truckDimensions }) {
  const transformRef = useRef(null)
  const [isValid, setIsValid] = useState(true)

  const handleObjectChange = () => {
    if (transformRef.current && transformRef.current.object) {
      const obj = transformRef.current.object
      const collision = checkCollisions([obj.position.x, obj.position.y, obj.position.z], cargo.size, cargo.id, loadedCargos, truckDimensions)
      if (isValid === collision) {
        setIsValid(!collision)
      }
    }
  }

  const handleMouseUp = () => {
    if (transformRef.current && transformRef.current.object) {
      const obj = transformRef.current.object
      const collision = checkCollisions([obj.position.x, obj.position.y, obj.position.z], cargo.size, cargo.id, loadedCargos, truckDimensions)
      if (!collision) {
        setLoadedCargos(prev => prev.map(c => c.id === cargo.id ? { ...c, pos: [obj.position.x, obj.position.y, obj.position.z] } : c))
      } else {
        obj.position.set(...cargo.pos)
        setIsValid(true)
      }
    }
  }

  return (
    <TransformControls
      ref={transformRef}
      showX={isSelected} showY={isSelected} showZ={isSelected}
      mode="translate"
      translationSnap={0.25}
      onObjectChange={handleObjectChange}
      onMouseUp={handleMouseUp}
    >
      <Box3D 
        position={cargo.pos}
        args={cargo.size} 
        onClick={(e) => { e.stopPropagation(); onSelect(cargo); }}
      >
        <meshStandardMaterial 
          color={!isValid && isSelected ? "#ef4444" : cargo.color} 
          emissive={isSelected ? (isValid ? "#ffffff" : "#dc2626") : "#000000"} 
          emissiveIntensity={isSelected ? 0.3 : 0} 
        />
        <Edges color={isSelected ? (isValid ? "#f59e0b" : "#ef4444") : "black"} linewidth={isSelected ? 4 : 2} />
        <Text position={[0, cargo.size[1] / 2 + 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.3} color="white" outlineWidth={0.04} outlineColor="black">
          {cargo.name}
        </Text>
      </Box3D>
    </TransformControls>
  )
}

export default function LoadVisualizationTest() {
  const truckDimensions = useMemo(() => ({ width: 5.2, height: 4.0, depth: 10.0, maxWeight: 15000 }), [])
  const [catalog, setCatalog] = useState(INITIAL_CATALOG)
  const [loadedCargos, setLoadedCargos] = useState([])
  const [activeCargo, setActiveCargo] = useState(null)
  const [editingCargo, setEditingCargo] = useState(null)
  const [ghostPos, setGhostPos] = useState([0, 0, 0])
  const [ghostValid, setGhostValid] = useState(false)
  const [newProd, setNewProd] = useState({ name: "", weight: 1000, w: 1, h: 1, d: 1, color: "#8b5cf6" })

  const currentWeight = loadedCargos.reduce((acc, curr) => acc + curr.weight, 0)
  const weightPercent = (currentWeight / truckDimensions.maxWeight) * 100

  const handleAddTemplate = (e) => {
    e.preventDefault()
    if (!newProd.name) return
    setCatalog([...catalog, {
      templateId: Math.random().toString(), name: newProd.name, color: newProd.color,
      size: [Number(newProd.w), Number(newProd.h), Number(newProd.d)], weight: Number(newProd.weight)
    }])
    setNewProd({ name: "", weight: 1000, w: 1, h: 1, d: 1, color: "#8b5cf6" })
  }

  const pickFromCatalog = (template) => {
    setEditingCargo(null)
    setActiveCargo({ ...template, id: Math.random().toString() })
  }

  const handlePointerMove = (e) => {
    if (!activeCargo) return
    e.stopPropagation()
    const hit = e.intersections.find(i => i.object.name === "floorPlane")
    if (hit) {
      const { pos, isValid } = calculatePlacement(hit.point.x, hit.point.z, activeCargo.size, loadedCargos, truckDimensions)
      setGhostPos(pos)
      setGhostValid(isValid)
    }
  }

  const handlePlace = (e) => {
    if (editingCargo) {
      setEditingCargo(null)
      return
    }
    if (!activeCargo) return
    e.stopPropagation()
    if (ghostValid) {
      setLoadedCargos([...loadedCargos, { ...activeCargo, pos: ghostPos }])
      setActiveCargo(null)
    }
  }

  const handleDeleteEditing = () => {
    if (!editingCargo) return
    setLoadedCargos(loadedCargos.filter(c => c.id !== editingCargo.id))
    setEditingCargo(null)
  }

  return (
    <AppShell title="Laboratório de Alocação (Bin Packing)">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl text-white shadow-md">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Layers size={20} className="text-slate-900" />
            </div>
            <div>
              <h2 className="font-bold text-md text-white">Simulador de Empilhamento Avançado</h2>
            </div>
          </div>
          <Link to="/load-management">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
              <ArrowLeft size={16} className="mr-2" /> Encerrar Simulador
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 flex flex-col space-y-6">
            
            {editingCargo ? (
              <Card className="border-blue-200 shadow-sm bg-blue-50">
                <CardHeader className="bg-blue-100/50 border-b border-blue-200 py-4">
                  <CardTitle className="text-sm font-bold text-blue-900 flex items-center">
                    <Move size={16} className="mr-2" /> Menu de Edição
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div>
                    <p className="font-bold text-blue-900">{editingCargo.name}</p>
                    <p className="text-xs text-blue-700">Dimensões: {editingCargo.size.join(" x ")}m</p>
                  </div>
                  <div className="text-xs bg-white p-2 rounded border border-blue-200 text-blue-800">
                    Utilize as setas no mapa 3D para reposicionar a carga. O sistema impedirá automaticamente colisões.
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button variant="outline" size="sm" className="bg-white" onClick={() => setEditingCargo(null)}>
                      Concluir
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleDeleteEditing}>
                      <Trash2 size={14} className="mr-2" /> Remover
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : activeCargo ? (
              <Card className="border-emerald-200 shadow-sm bg-emerald-50">
                <CardContent className="pt-6 text-center">
                  <MousePointerClick size={32} className="mx-auto mb-2 text-emerald-600 animate-bounce" />
                  <p className="text-sm font-bold text-emerald-900">Posicionando: {activeCargo.name}</p>
                  <Button variant="outline" size="sm" className="mt-4 w-full bg-white" onClick={() => setActiveCargo(null)}>
                    Cancelar Posicionamento
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
                  <CardTitle className="text-sm font-bold text-slate-800 flex items-center">
                    <PackagePlus size={16} className="mr-2 text-emerald-600" /> Catálogo
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-2">
                  <div className="grid grid-cols-1 gap-2 max-h-[250px] overflow-y-auto pr-1">
                    {catalog.map(item => (
                      <div key={item.templateId} onClick={() => pickFromCatalog(item)} className="p-2 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 hover:border-emerald-300 transition-all flex justify-between items-center bg-white">
                        <div className="flex items-center space-x-2">
                          <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></span>
                          <div>
                            <p className="text-xs font-bold text-slate-700">{item.name}</p>
                            <p className="text-[10px] text-slate-500">{item.size.join(" x ")}m</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{item.weight}kg</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-slate-200 shadow-sm flex-1">
              <CardHeader className="bg-slate-50 border-b border-slate-100 py-3">
                <CardTitle className="text-xs font-bold text-slate-800 uppercase">Criar Novo Tipo</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleAddTemplate} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">NOME</label>
                    <Input className="h-7 text-xs" value={newProd.name} onChange={e => setNewProd({...newProd, name: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500">L (X)</label>
                      <Input type="number" step="0.1" className="h-7 text-xs" value={newProd.w} onChange={e => setNewProd({...newProd, w: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500">A (Y)</label>
                      <Input type="number" step="0.1" className="h-7 text-xs" value={newProd.h} onChange={e => setNewProd({...newProd, h: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500">P (Z)</label>
                      <Input type="number" step="0.1" className="h-7 text-xs" value={newProd.d} onChange={e => setNewProd({...newProd, d: e.target.value})} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-8 text-xs bg-slate-800 text-white">Adicionar</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 flex flex-col space-y-4">
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1 mr-6">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-bold text-slate-500 flex items-center"><Truck size={14} className="mr-1"/> Capacidade de Carga</span>
                    <span className="text-xs font-bold text-slate-800">{currentWeight} / {truckDimensions.maxWeight} kg</span>
                  </div>
                  <Progress value={weightPercent} className="h-2" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500">Itens</p>
                  <p className="text-xl font-black text-slate-800">{loadedCargos.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm flex-1 min-h-[500px] overflow-hidden bg-slate-900 relative">
              <Canvas camera={{ position: [-8, 6, 8], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 15, 10]} intensity={1.2} />

                <mesh name="floorPlane" position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} onPointerMove={handlePointerMove} onClick={handlePlace}>
                  <planeGeometry args={[100, 100]} />
                  <meshBasicMaterial visible={false} />
                </mesh>

                <Box3D args={[truckDimensions.width, truckDimensions.height, truckDimensions.depth]} position={[0, truckDimensions.height / 2, 0]} pointerEvents="none">
                  <meshStandardMaterial color="#475569" transparent opacity={0.1} depthWrite={false} side={2} />
                  <Edges color="#64748b" linewidth={1} />
                </Box3D>

                {loadedCargos.map((cargo) => (
                  editingCargo?.id === cargo.id ? (
                    <EditableCargo 
                      key={cargo.id} cargo={cargo} isSelected={true} onSelect={setEditingCargo} 
                      loadedCargos={loadedCargos} setLoadedCargos={setLoadedCargos} truckDimensions={truckDimensions}
                    />
                  ) : (
                    <Box3D key={cargo.id} args={cargo.size} position={cargo.pos} onClick={(e) => { e.stopPropagation(); setActiveCargo(null); setEditingCargo(cargo); }}>
                      <meshStandardMaterial color={cargo.color} />
                      <Edges color="black" linewidth={2} />
                      <Text position={[0, cargo.size[1] / 2 + 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.3} color="white" outlineWidth={0.04} outlineColor="black">
                        {cargo.name}
                      </Text>
                    </Box3D>
                  )
                ))}

                {activeCargo && !editingCargo && (
                  <Box3D args={activeCargo.size} position={ghostPos} pointerEvents="none">
                    <meshStandardMaterial color={ghostValid ? "#10b981" : "#ef4444"} transparent opacity={0.6} emissive={ghostValid ? "#059669" : "#dc2626"} emissiveIntensity={0.5} />
                    <Edges color="white" linewidth={2} />
                  </Box3D>
                )}

                <Grid infiniteGrid fadeDistance={20} sectionColor="#475569" cellColor="#334155" position={[0, 0, 0]} />
                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2 - 0.05} />
              </Canvas>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}