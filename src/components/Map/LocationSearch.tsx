import React, { useState } from "react";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios"
import _Event from "@/models/Event";

const geocodingClient = mbxGeocoding({ accessToken: import.meta.env.VITE_MAPBOX_TOKEN });

const LocationSearch: React.FC<{ onSelect: (coords: { lat: number; lng: number }, events: _Event[]) => void; className: string }> = ({ onSelect, className }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<{ place_name: string; center: [number, number] }[]>([]);
  const [showFilters, setShowFilters] = useState(false); // Toggle filters
  const [loading, setLoading] = useState(false);
  // Filters state
  const [filters, setFilters] = useState<{radius: number; category: string; eventDate: string}>({
    radius: 5,
    category: "",
    eventDate: "",
  });

  // Function to update filters dynamically
  const handleFilterChange = (key: keyof typeof filters, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearchList = async (place: { place_name: string; center: [number, number] } ) => {
    if(!place) return
    setLoading(true);
    await handleSearch(query, setResults)
    const queryString = generateSearchQuery(place.center, filters)
    await fetchEvents(queryString,place,setResults, setQuery, onSelect, setLoading)
  }

  const handleSearchBtn = async (query: string, setResults: React.Dispatch<React.SetStateAction<{ place_name: string; center: [number, number] }[]>>) => {
    setLoading(true);
    const location = await handleSearch(query, setResults)
    const place = location ? location : results[0]
    const queryString = generateSearchQuery(place.center, filters)
    await fetchEvents(queryString,place,setResults, setQuery, onSelect, setLoading)
  }
  
  return (
    <Card className={`p-5 pb-2 w-full max-w-md mx-auto flex flex-col justify-center gap-1 ${className}`}>
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <Input
          type="text"
          placeholder="Search location..."
          value={query}
          onChange={(e) => handleChange(e, query, setResults, setQuery)}
          className="flex-1"
        />
        <Button onClick={() => handleSearchBtn(query, setResults)} disabled={loading}>Search</Button>
      </div>

      {/* Filter Toggle Button */}
      <Button
        variant="ghost"
        className="flex w-fit justify-between items-center self-end"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        Filters
        {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </Button>

      <ScrollArea className="flex flex-col max-h-72 min-h-0">
        {/* Filters (Hidden by Default) */}
        {showFilters && (
          <div className="space-y-3 border p-4 rounded-lg h-fit">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col justify-center gap-1.5">
                <Label>Radius (km)</Label>
                <Input
                  type="number"
                  min="1"
                  value={filters.radius}
                  onChange={(e) => handleFilterChange("radius", Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col justify-center gap-1.5">
                <Label>Category</Label>
                <Select onValueChange={(value) => handleFilterChange("category", value)} defaultValue={filters.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="charity">Charity</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-1.5 col-span-2 w-fit" >
              <Label>Event Date</Label>
              <Input
                type="date"
                value={filters.eventDate}
                onChange={(e) => handleFilterChange("eventDate", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Search Results */}
        {results.length > 0 && (
          <ScrollArea className="h-60 border rounded-lg mt-3">
            <ul>
              {results.map((place, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-3 hover:bg-gray-100"
                  onClick={() => handleSearchList(place) }
                >
                  {place.place_name}
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </ScrollArea>
    </Card>
  );
};

export default LocationSearch;

const handleSearch = async (
  query: string,
  setResults: React.Dispatch<React.SetStateAction<{ place_name: string; center: [number, number] }[]>>
) => {
  if (!query) return;
  try {
    const response = await geocodingClient
      .forwardGeocode({
        query,
        autocomplete: true,
        limit: 100,
      })
      .send();

    let features = response.body.features.map((feature) => ({
      place_name: feature.place_name,
      center: feature.center as [number, number],
    }));
    setResults(features);
    return features[0];
  } catch (error) {
    console.error("Error fetching location:", error);
    alert("Error fetching location, Try reloading the page.");
  }
};

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  query: string,
  setResults: React.Dispatch<React.SetStateAction<{ place_name: string; center: [number, number] }[]>>,
  setQuery: React.Dispatch<React.SetStateAction<string>>
) => {
  setQuery(e.target.value);
  handleSearch(query, setResults);
};

const generateSearchQuery = (center: [number, number], filter: {radius: number; category: string; eventDate: string}): string => {
  const params = new URLSearchParams();

  if (center[1] !== null && center[1] !== undefined) params.append("lat", center[1].toString());
  if (center[0] !== null && center[0] !== undefined) params.append("lng", center[0].toString());
  if (filter.radius) params.append("radius", filter.radius.toString());
  if (filter.eventDate) params.append("event_date", filter.eventDate);
  if (filter.category) params.append("category", filter.category);

  return `?${params.toString()}`;
};

const fetchEvents = async (
  queryString: string,
  place: { place_name: string; center: [number, number] },
  setResults: React.Dispatch<React.SetStateAction<{ place_name: string; center: [number, number] }[]>>,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  onSelect: (coords: { lat: number; lng: number }, events: _Event[]) => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let events: any;
  try {
    events = await axios.get(import.meta.env.VITE_BACKEND+'/events/nearbySearchcharities/'+queryString)
    console.log(events.data)
  }
  catch (error) {
    console.error(error)
  }
  finally{
    setResults([]);
    onSelect({ lat: place.center[1], lng: place.center[0] }, events.data);
    setQuery(place.place_name);
    setLoading(false);
  } 
}