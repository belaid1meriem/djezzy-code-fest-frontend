import Map, { Marker } from "react-map-gl/mapbox-legacy";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useRef } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const geocodingClient = mbxGeocoding({ accessToken: import.meta.env.VITE_MAPBOX_TOKEN });

interface MapSelectionProps {
  closeMap: () => void;
  selectedLocation: { lat: number; lng: number } | null;
  setSelectedLocation: (location: { lat: number; lng: number; } | null) => void;
}

function MapSelection({ closeMap, selectedLocation, setSelectedLocation }: MapSelectionProps) {
  const { isDarkMode } = useTheme();
  const mapRef = useRef(null);

  const [viewport, setViewport] = useState({
    longitude: 2.3522, // Default: Paris
    latitude: 48.8566,
    zoom: 10,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ place_name: string; center: [number, number] }[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Handle location search
  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);

    try {
      const response = await geocodingClient
        .forwardGeocode({
          query: searchQuery,
          autocomplete: true,
          limit: 5,
        })
        .send();

      const results = response.body.features.map((feature) => ({
        place_name: feature.place_name,
        center: feature.center as [number, number],
      }));

      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Select location from list
  const handleSelectLocation = (place: { place_name: string; center: [number, number] }) => {
    const [lng, lat] = place.center;
    setSelectedLocation({ lat, lng });

    setViewport((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      zoom: 12,
    }));

    setSearchQuery(place.place_name);
    setSearchResults([]);
  };

  // 🔹 Select location by clicking on the map
  const handleMapClick = (event: mapboxgl.MapMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setSelectedLocation({ lat, lng });

    setViewport((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      zoom: 12,
    }));

    // 🔹 Reverse geocode to get place name
    geocodingClient
      .reverseGeocode({
        query: [lng, lat],
        limit: 1,
      })
      .send()
      .then((response) => {
        const placeName = response.body.features[0]?.place_name || `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
        setSearchQuery(placeName);
      })
      .catch((error) => console.error("Error fetching place name:", error));
  };

  return (
    <div className="bg-black/30 w-screen h-screen fixed top-0 left-0 z-30 flex justify-center items-center">
      <div className="relative h-[500px] w-[500px] shadow">
        <Card className="absolute top-2 left-2 right-2 z-10 p-3 bg-white rounded-md shadow-lg">
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Search for a place..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "..." : "Search"}
            </Button>
          </div>

          {searchResults.length > 0 && (
            <ScrollArea className="mt-2 border rounded-lg h-40">
              <ul>
                {searchResults.map((place, index) => (
                  <li key={index} className="cursor-pointer p-3 hover:bg-gray-100" onClick={() => handleSelectLocation(place)}>
                    {place.place_name}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          )}
        </Card>

        <Map ref={mapRef} mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN} {...viewport} onMove={(evt) => setViewport(evt.viewState)} onClick={handleMapClick} style={{ width: "100%", height: "100%" }} mapStyle={isDarkMode ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/streets-v11" } >
          {selectedLocation && <Marker longitude={selectedLocation.lng} latitude={selectedLocation.lat} color="red" />}
        </Map>

        {selectedLocation && <Button onClick={closeMap} className="absolute bottom-0 right-0 z-40">Confirm</Button>}
      </div>
    </div>
  );
}

export default MapSelection;
