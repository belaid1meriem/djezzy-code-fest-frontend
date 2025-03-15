import _Event from '@/models/Event'
import React, { useEffect, useState } from 'react'
import EventCard from './EventCard';
import axios from 'axios';
import { toast } from 'sonner';
 
const eventsData: _Event[] = [
  {
    id: "b8e3c1d2-9f4a-4a6b-8c5e-1d7f3a2e6c9b",
    longitude: -122.4194,
    latitude: 37.7749,
    name: "Community Clean-Up",
    description: "Join us to clean up our parks and streets.",
    date: "2025-04-22T09:00:00Z",
    charity: 201,
    charity_name: "Clean Earth Initiative"
  },
  {
    id: "c7a1e4b5-2d8c-4f6a-9b3e-5d7f2c9a8e1d",
    longitude: 2.3522,
    latitude: 48.8566,
    name: "Soup Kitchen Service",
    description: "Providing meals for those in need.",
    date: "2025-05-10T12:30:00Z",
    charity: 202,
    charity_name: "Helping Hands"
  },
  {
    id: "d9f2b6c3-7a8e-4d5f-9b1c-2e6a3c7d8f4b",
    longitude: -0.1276,
    latitude: 51.5074,
    name: "Homeless Shelter Support",
    description: "Helping homeless individuals with food and shelter.",
    date: "2025-06-05T18:00:00Z",
    charity: 203,
    charity_name: "Safe Haven Foundation"
  },
  {
    id: "a4d7c9f2-6e3b-41a8-97b5-2c8f5d1e7a3c",
    longitude: 139.6917,
    latitude: 35.6895,
    name: "School Supply Drive",
    description: "Collecting school supplies for underprivileged students.",
    date: "2025-07-15T14:00:00Z",
    charity: 204,
    charity_name: "Education for All"
  },
  {
    id: "e5a7d1c9-3f4b-48e6-9a2c-7d8f5b3e1c9a",
    longitude: 151.2093,
    latitude: -33.8688,
    name: "Blood Donation Camp",
    description: "Donate blood and save lives.",
    date: "2025-08-20T08:30:00Z",
    charity: 205,
    charity_name: "Life Saver Initiative"
  }
];

function Overview() {

  const [events, setEvents] = useState<_Event[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND + "/events/Creat_ListEvent" +
            // JSON.parse(localStorage.getItem("user")!).charity_id +
            "/",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access"),
            },
          }
        );
        console.log(response.data);
        setEvents(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch events. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
        
  }, [])
  return (
    <div className='flex items-center justify-center'>
      
      {loading && (
        <div className="flex flex-col items-center bg-background border rounded shadow py-2 px-4 fixed right-4 top-8">
          <p className="font-semibold">Fetching Events...</p>
        </div>
      )}
      <div className='grid px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}

export default Overview