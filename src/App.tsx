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
import Stock from "./components/Dashboard/Stock"
import Events from "./components/Dashboard/Events"
import Tasks from "./components/Dashboard/Tasks"
import General from "./components/Dashboard/Stock/General"
import AddStock from "./components/Dashboard/Stock/AddStock"
import StockAlerts from "./components/Dashboard/Stock/StockAlerts"
import Overview from "./components/Dashboard/Events/Overview"
import EventDetails from "./components/Dashboard/Events/EventDetails"
import AddEvent from "./components/Dashboard/Events/AddEvent"



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="map" element={<Map />} />
        <Route path="community/:event_id" element={<Community />} />


        <Route path="dashboard" element={<Dashboard />} >
        
          <Route index  element={<General />} />

          <Route path="stock"  element={<Stock />} >
            <Route index element={<General/>} />
            <Route path="add" element={<AddStock/>} />
            <Route path="alerts" element={<StockAlerts/>} />
          </Route>

          <Route path="events" element={<Events />} >
            <Route index element={<Overview />} />
            <Route path=":id" element={<EventDetails />} />
            <Route path="new" element={<AddEvent />} />
          </Route>

          <Route path="tasks" element={<Tasks />} />
        </Route>

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
