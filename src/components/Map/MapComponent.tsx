import Map, { Marker } from "react-map-gl/mapbox-legacy";
import LocationSearch from "./LocationSearch";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";


function MapComponent() {
  const { isDarkMode } = useTheme();
  const [viewport, setViewport] = useState({
    longitude: 2.3522, // Default to Paris
    latitude: 48.8566,
    zoom: 10,
  });

  const handleLocationSelect = (coords: { lat: number; lng: number }) => {
    setViewport({
      latitude: coords.lat,
      longitude: coords.lng,
      zoom: 15, // Zoom in on selection
    });
  };
  
  return (
    <div className="h-screen w-full relative">
      <LocationSearch onSelect={handleLocationSelect} className="absolute top-3 left-3 z-20" />
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle={isDarkMode ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/streets-v11"}      >
        <Marker longitude={viewport.longitude} latitude={viewport.latitude} color="red" />
      </Map>
    </div>
  );
};

export default MapComponent;
