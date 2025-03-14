
import Map, { Marker } from "react-map-gl/mapbox-legacy";
import LocationSearch from "./LocationSearch";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

const MAPBOX_TOKEN = "pk.eyJ1IjoibW1iZWxhaWQiLCJhIjoiY2x5c2t6eWNyMGR1ajJpc2h3aTVrdjFzciJ9.4GCWWfr4RB4PwaFxb7G1Gg"; // Replace with your token

function MapComponent() {
  const [viewport, setViewport] = useState({
    longitude: 2.3522, // Default to Paris
    latitude: 48.8566,
    zoom: 10,
  });

  const handleLocationSelect = (coords: { lat: number; lng: number }) => {
    setViewport({
      latitude: coords.lat,
      longitude: coords.lng,
      zoom: 20, // Zoom in on selection
    });
  };
  
  return (
    <div className="h-screen w-full relative">
      <LocationSearch onSelect={handleLocationSelect} className="absolute top-3 left-3 z-20" />
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11" // Change styles here
      >
        <Marker longitude={viewport.longitude} latitude={viewport.latitude} color="red" />
      </Map>
    </div>
  );
};

export default MapComponent;
