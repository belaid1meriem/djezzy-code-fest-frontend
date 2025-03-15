import { useParams } from 'react-router'
import AllocatedProducts from './Event/AllocatedProducts'
import Tasks from './Event/Tasks'
import Volunteers from './Event/Volunteers'
import EventCard from './EventCard'
import { useEffect, useState } from 'react'
import _Event from '@/models/Event'
import axios from 'axios'
import { toast } from 'sonner'


function EventDetails() {
  const { id } = useParams()
  const [event, setEvent] = useState<_Event | null>(null)
  const [ allocatedProducts, setAllocatedProducts ] = useState([])
  const [ volunteers, setVolunteers ] = useState([])
  const [ loading, setLoading ] = useState(true)


  useEffect(()=> {
    const fetchEvent = async () =>{
      setLoading(true)
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND+'/events/event/'+ id+'/',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          }
        })
        
        console.log(response)
        setEvent(response.data)
      }
      catch (error) {
        console.error(error)
        toast.error('Error while fetching, Try again later')
      }finally{
        setLoading(false)
      }
    }

    const fetchAllocatedProducts = async () =>{
      setLoading(true)
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND+'/events/eventAllocations/'+ id+'/',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          }
        })
        
        console.log(response)
        setAllocatedProducts(response.data)
      }
      catch (error) {
        console.error(error)
        toast.error('Error while fetching, Try again later')
      }finally{
        setLoading(false)
      }
    }

    const fetchVolunteers = async () =>{
      setLoading(true)
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND+'/events/usertasks/'+ id+'/',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          }
        })
        
        console.log(response)
        setVolunteers(response.data)
      }
      catch (error) {
        console.error(error)
        toast.error('Error while fetching, Try again later')
      }finally{
        setLoading(false)
      }
    }

    const fetchAll = async () => {
      await fetchEvent()
      await fetchAllocatedProducts()
      await fetchVolunteers()
    }

    fetchAll()
    
  }, [])
  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center bg-background border rounded shadow py-2 px-4 fixed right-4 top-8">
          <p className="font-semibold">Fetching Data...</p>
        </div>
      ) : (
        <div className='flex items-center justify-center'>
          <div className='grid grid-cols-3 gap-y-6 '>
            <Volunteers className='col-span-3' />
            <EventCard event={event!} viewDetails={false} />
            <AllocatedProducts className='col-span-2'/>
            <Tasks className='col-span-3'/> 
          </div>      
        </div>
      )
      }
     
    </div>
  )
}

export default EventDetails