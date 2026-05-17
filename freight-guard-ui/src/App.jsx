import { Button } from "@/components/ui/button"
import { Link, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext" // <-- Importante!
import { useState } from "react"

import Dashboard from "@/pages/Dashboard.jsx"
import LoadManagement from "@/pages/LoadManagement.jsx"
import FreightsPanel from "./pages/FreightsPanel"
import FreightsMural from "./pages/FreightsMural"
import FreightManagement from "./pages/FreightManagement"
import RouteManagement from "./pages/RouteManagement"
import ProductManagement from "./pages/ProductsManagement"
import TransporterManagement from "./pages/TransporterManagement"
import Auth from "./pages/Auth"
import CarrierManagement from "./pages/CarrierManagement"
import CreateLoad from "./pages/CreateLoad"

// Guarda de Rotas
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth()
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}
import FreightsPanel from "./pages/FreightsPanel"
import FreightsMural from "./pages/FreightsMural"
import FreightManagement from "./pages/FreightManagement"
import RouteManagement from "./pages/RouteManagement"
import ProductManagement from "./pages/ProductsManagement"
import TransporterManagement from "./pages/TransporterManagement"
import Login from "./pages/Login"

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

import Auth from "@/pages/Auth.jsx"
import CarrierManagement from "@/pages/CarrierManagement.jsx"
import CreateLoad from "@/pages/CreateLoad.jsx"
import FreightManagement from "@/pages/FreightManagement.jsx"
import FreightsMural from "@/pages/FreightsMural.jsx"
import FreightsPanel from "@/pages/FreightsPanel.jsx"
import ProductManagement from "@/pages/ProductManagement.jsx"
import RouteManagement from "@/pages/RouteManagement.jsx"
import RouteOverview from "@/pages/RouteOverview.jsx"
import TransportOverview from "@/pages/TransportOverview.jsx"
import VehicleForm from "@/pages/VehicleForm.jsx"

// not found component (mantido igual ao seu)
function NotFound() {
 

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-center text-sm leading-loose">
        <div>
          <h1 className="font-medium">Página não encontrada</h1>
          <p>Esta rota não existe ou não tens permissão para aceder.</p>
          <div className="mt-4 flex justify-center gap-2">
            <Button asChild>
              <Link to="/dashboard">Voltar ao Início</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function App() {
 const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("freightguard_auth") === "true"
  })

  return (
   <Routes>
      {/* ROTA PÚBLICA (Fora do sistema) */}
      <Route 
        path="/login" 
        element={<Login setIsAuthenticated={setIsAuthenticated} />} 
      />

      {/* ROTA RAIZ (Redireciona pro dashboard se logado, ou pro login se não) */}
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
      />

      {/* ROTAS PROTEGIDAS (Só acessa se isAuthenticated for true) */}
      <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} />
      <Route path="/load-management" element={<ProtectedRoute isAuthenticated={isAuthenticated}><LoadManagement /></ProtectedRoute>} />
      <Route path="/freights-panel" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FreightsPanel /></ProtectedRoute>} />
      <Route path="/freights-mural" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FreightsMural /></ProtectedRoute>} />
      <Route path="/freight-management" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FreightManagement /></ProtectedRoute>} />
      <Route path="/route-management" element={<ProtectedRoute isAuthenticated={isAuthenticated}><RouteManagement /></ProtectedRoute>} />
      <Route path="/products-management" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ProductManagement /></ProtectedRoute>} />
      <Route path="/transporters-management" element={<ProtectedRoute isAuthenticated={isAuthenticated}><TransporterManagement /></ProtectedRoute>} />
      
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* --- ROTAS DA EMPRESA CONTRATANTE --- */}
      <Route
        path="/load-management"
        element={
          <PrivateRoute allowedRoles={["contractor"]}>
            <LoadManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-load"
        element={
          <PrivateRoute allowedRoles={["contractor"]}>
            <CreateLoad />
          </PrivateRoute>
        }
      />
      <Route
        path="/freights-panel"
        element={
          <PrivateRoute allowedRoles={["contractor"]}>
            <FreightsPanel />
          </PrivateRoute>
        }
      />
      <Route
        path="/route-management"
        element={
          <PrivateRoute allowedRoles={["contractor"]}>
            <RouteManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/products-management"
        element={
          <PrivateRoute allowedRoles={["contractor"]}>
            <ProductManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/transporters-management"
        element={
          <PrivateRoute allowedRoles={["contractor"]}>
            <TransporterManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/carrier-management"
        element={
          <PrivateRoute allowedRoles={["contractor"]}>
            <CarrierManagement />
          </PrivateRoute>
        }
      />

      {/* --- ROTAS DA TRANSPORTADORA --- */}
      <Route
        path="/freights-mural"
        element={
          <PrivateRoute allowedRoles={["carrier"]}>
            <FreightsMural />
          </PrivateRoute>
        }
      />
      <Route
        path="/freight-management"
        element={
          <PrivateRoute allowedRoles={["carrier"]}>
            <FreightManagement />
          </PrivateRoute>
        }
      />

      <Route path="/carrier-management" element={<CarrierManagement />} />
      <Route path="/load-management" element={<LoadManagement />} />
      <Route path="/create-load" element={<CreateLoad />} />
      <Route path="/freights-panel" element={<FreightsPanel />} />
      <Route path="/freights-mural" element={<FreightsMural />} />
      <Route path="/freight-management" element={<FreightManagement />} />
      <Route path="/fleet-management" element={<FreightManagement />} />
      <Route path="/product-management" element={<ProductManagement />} />
      <Route path="/route-management" element={<RouteManagement />} />
      <Route path="/route-overview" element={<RouteOverview />} />
      <Route path="/transport-overview" element={<TransportOverview />} />
      <Route path="/vehicle-form" element={<VehicleForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
