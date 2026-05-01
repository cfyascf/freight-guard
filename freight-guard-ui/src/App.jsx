import { Button } from "@/components/ui/button"
import { Navigate, Route, Routes } from "react-router-dom"

import Dashboard from "@/pages/Dashboard.jsx"

function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-center text-sm leading-loose">
        <div>
          <h1 className="font-medium">Page not found</h1>
          <p>This route does not exist in the current app shell.</p>
          <Button asChild className="mt-2">
            <a href="/dashboard">Go to dashboard</a>
          </Button>
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App