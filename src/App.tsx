import { Button } from "@/components/ui/button"
import { Routes, Route } from "react-router"
import Map from './components/Map/Map'
import Community from './components/Community/Community'
import Dashboard from './components/Dashboard/Dashboard'
import Auth from './components/Auth/Auth'
import LandingPage from "./pages/LandingPage"
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="map" element={<Map />} />
      <Route path="community" element={<Community />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="auth" element={<Auth />} />
    </Routes>
  )
}

export default App
