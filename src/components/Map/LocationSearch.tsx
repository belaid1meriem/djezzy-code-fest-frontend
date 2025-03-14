import React, { useState } from "react";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibW1iZWxhaWQiLCJhIjoiY2x5c2t6eWNyMGR1ajJpc2h3aTVrdjFzciJ9.4GCWWfr4RB4PwaFxb7G1Gg"; // Replace with your token

const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });

const LocationSearch: React.FC<{ onSelect: (coords: { lat: number; lng: number }) => void, className: string }> = ({ onSelect, className }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ place_name: string; center: [number, number] }[]>([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await geocodingClient
        .forwardGeocode({
          query,
          autocomplete: true,
          limit: 20,
        })
        .send();

      const features = response.body.features.map((feature) => ({
        place_name: feature.place_name,
        center: feature.center as [number, number],
      }));

      setResults(features);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    handleSearch();
  };

  return (
    <Card className={`p-4 w-full max-w-md mx-auto ${className}`}>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search location..."
          value={query}
          onChange={(e) => handleChange(e)}
          className="flex-1"
        />
        <Button onClick={handleSearch} className="shrink-0">Search</Button>
      </div>
      {results.length > 0 && (
        <ScrollArea className="h-60 border rounded-md ">
          <ul>
            {results.map((place, index) => (
              <li
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => {
                  onSelect({ lat: place.center[1], lng: place.center[0] });
                  setResults([]);
                }}
              >
                {place.place_name}
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </Card>
  );
};

export default LocationSearch;
