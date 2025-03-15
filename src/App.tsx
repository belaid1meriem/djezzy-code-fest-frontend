import { Routes, Route } from "react-router"
import Map from './components/Map/Map'
import Community from './components/Community/Community'
import Dashboard from './components/Dashboard/Dashboard'
import Auth from './components/Auth/Auth'
import LandingPage from "./pages/LandingPage"
import RegisterVolunteer from "./components/Auth/RegisterVolunteer"
import RegisterOrga from "./components/Auth/RegisterCharity"
import Login from "./components/Auth/Login"
import { Toaster } from "@/components/ui/sonner"



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="map" element={<Map />} />
        <Route path="community/:event_id" element={<Community />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="auth" element={<Auth />} />
        <Route path="register/volunteer" element={<RegisterVolunteer />} />
        <Route path="register/organization" element={<RegisterOrga />} />
        <Route path="login" element={<Login />} />

      </Routes>
      <Toaster />
    </>
  )
}

export default App
