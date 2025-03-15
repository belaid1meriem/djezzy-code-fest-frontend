import _Event from '@/models/Event'
import { useEffect, useState } from 'react'
import EventCard from './EventCard';
import axios from 'axios';
import { toast } from 'sonner';
 

function Overview() {

  const [events, setEvents] = useState<_Event[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND + "/events/eventsByCharity/" +
            JSON.parse(localStorage.getItem("user")!).charity_id +
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