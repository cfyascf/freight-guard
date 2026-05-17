import { Button } from "@/components/ui/button"
import { Link, Navigate, Route, Routes } from "react-router-dom"

import Dashboard from "@/pages/Dashboard.jsx"
import LoadManagement from "@/pages/LoadManagement.jsx"
import FreightsPanel from "@/pages/FreightsPanel"
import FreightsMural from "@/pages/FreightsMural"
import FreightManagement from "@/pages/FreightManagement"
import RouteManagement from "@/pages/RouteManagement"
import ProductManagement from "@/pages/ProductsManagement"
import TransporterManagement from "@/pages/TransporterManagement"
import Auth from "@/pages/Auth"
import CarrierManagement from "@/pages/CarrierManagement"
import CreateLoad from "@/pages/CreateLoad"
import Login from "@/pages/Login"
import RouteOverview from "@/pages/RouteOverview.jsx"
import TransportOverview from "@/pages/TransportOverview.jsx"
import VehicleForm from "@/pages/VehicleForm.jsx"
import { ROLES } from "@/constants/roles"
import { PublicOnly, RequireAuth, RequireRole } from "@/routes/route-guards"

function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-center text-sm leading-loose">
        <div>
          <h1 className="font-medium">Pagina nao encontrada</h1>
          <p>Esta rota nao existe ou nao tens permissao para aceder.</p>
          <div className="mt-4 flex justify-center gap-2">
            <Button asChild>
              <Link to="/dashboard">Voltar ao Inicio</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function App() {
  return (
    <Routes>
      <Route element={<PublicOnly />}>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Auth />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/route-overview" element={<RouteOverview />} />
        <Route path="/transport-overview" element={<TransportOverview />} />
        <Route path="/vehicle-form" element={<VehicleForm />} />

        <Route element={<RequireRole allowedRoles={[ROLES.CONTRACTOR]} />}>
          <Route path="/load-management" element={<LoadManagement />} />
          <Route path="/create-load" element={<CreateLoad />} />
          <Route path="/freights-panel" element={<FreightsPanel />} />
          <Route path="/route-management" element={<RouteManagement />} />
          <Route path="/products-management" element={<ProductManagement />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route
            path="/transporters-management"
            element={<TransporterManagement />}
          />
          <Route path="/carrier-management" element={<CarrierManagement />} />
        </Route>

        <Route element={<RequireRole allowedRoles={[ROLES.CARRIER]} />}>
          <Route path="/freights-mural" element={<FreightsMural />} />
          <Route path="/freight-management" element={<FreightManagement />} />
          <Route path="/fleet-management" element={<FreightManagement />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
