import { motion } from "framer-motion";
import { Calendar, MapPin, Building, Info } from "lucide-react";
import { Event, formatDate } from "./types";

interface EventDetailsProps {
  event: Event;
}

const EventDetails = ({ event }: EventDetailsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary/20 p-4 rounded-md mb-6"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xl font-semibold">{event.name}</h4>
        <span className="px-2 py-1 text-xs bg-primary/10 rounded-full">
          ID: {event.charity_id}
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(event.date)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Location: {event.latitude.toFixed(4)}, {event.longitude.toFixed(4)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <Building className="h-4 w-4" />
          <span>Charity ID: {event.charity_id}</span>
        </div>
        
        <div className="flex items-start gap-2 text-muted-foreground mt-2">
          <Info className="h-4 w-4 mt-1" />
          <p>{event.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetails;