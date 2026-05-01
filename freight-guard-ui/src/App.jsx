import { Button } from "@/components/ui/button"
import { Link, Navigate, Route, Routes } from "react-router-dom"

import Dashboard from "@/pages/Dashboard.jsx"
import LoadManagement from "@/pages/LoadManagement.jsx"
import FreightsPanel from "./pages/FreightsPanel"

function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-center text-sm leading-loose">
        <div>
          <h1 className="font-medium">Page not found</h1>
          <p>This route does not exist in the current app shell.</p>
          <div className="mt-2 flex justify-center gap-2">
            <Button asChild>
              <Link to="/dashboard">Go to dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/load-management">Go to load management</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/freights-panel">Go to freights panel</Link>
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
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/load-management" element={<LoadManagement />} />
      <Route path="/freights-panel" element={<FreightsPanel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App