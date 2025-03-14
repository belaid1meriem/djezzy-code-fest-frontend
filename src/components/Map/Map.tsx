import MapComponent from "./MapComponent"
import Header from "../Header"
function Map() {
  return (
    <div className="flex flex-col">
      <Header/>
      <div className="flex justify-center items-center min-h-screen">
        <MapComponent />
      </div>
    </div>
  )
}

export default Map