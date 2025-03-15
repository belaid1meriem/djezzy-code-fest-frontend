import Map, { Marker } from "react-map-gl/mapbox-legacy";
import LocationSearch from "./LocationSearch";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import _Event from "@/models/Event";
import bbox from "@turf/bbox";
import { featureCollection, point } from "@turf/helpers";
import { LngLatBounds } from "mapbox-gl";
import EventC from "./EventC";
function MapComponent() {
  const { isDarkMode } = useTheme();
  const mapRef = useRef<any>(null); // Ref for the Mapbox map instance

  const [viewport, setViewport] = useState({
    longitude: 2.3522, // Default to Paris
    latitude: 48.8566,
    zoom: 10,
  });

  const [events, setEvents] = useState<_Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<_Event | null>(null);

  const handleLocationSelect = (coords: { lat: number; lng: number }, events: _Event[]) => {
    setViewport({
      latitude: coords.lat,
      longitude: coords.lng,
      zoom: 15,
    });
    setEvents(events);
  };

  // Fit map to show all markers when `events` change
  useEffect(() => {
    if (events.length === 0 || !mapRef.current) return;

    const points = events.map(event => point([event.longitude, event.latitude]));
    const featureCollectionData = featureCollection(points);
    const [minLng, minLat, maxLng, maxLat] = bbox(featureCollectionData);

    const bounds = new LngLatBounds([minLng, minLat], [maxLng, maxLat]);

    mapRef.current.fitBounds(bounds, {
      padding: 100, // Add padding around the markers
      duration: 1000, // Smooth animation
    });
  }, [events]);

  return (
    <div className="h-screen w-full relative">
      <LocationSearch onSelect={handleLocationSelect} className="absolute top-3 left-3 z-20" />
      <Map
        ref={mapRef} // Attach ref to the Map component
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle={isDarkMode ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/streets-v11"}
      >
        {events.map(event => (
          <Marker
            key={event.id}
            longitude={event.longitude}
            latitude={event.latitude}
            onClick={() => setSelectedEvent(event)}
            color="red"
          />
        ))}

        {selectedEvent && (
          <EventC event={selectedEvent} closeEvent={()=>setSelectedEvent(null)}/>
        )}
      </Map>
    </div>
  );
}

export default MapComponent;

