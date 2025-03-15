import { motion } from "framer-motion";
import { Event } from "./types";

interface EventSelectorProps {
  events: Event[];
  currentEventId: number | null;
  onSelectEvent: (id: number) => void;
}

const EventSelector = ({ events, currentEventId, onSelectEvent }: EventSelectorProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium">Current Event</h3>
      <select 
        className="p-2 border border-border rounded-md bg-input"
        value={currentEventId?.toString() || ""} 
        onChange={(e) => onSelectEvent(Number(e.target.value))}
      >
        {events.map(event => (
          <option key={event.id} value={event.id.toString()}>{event.name}</option>
        ))}
      </select>
    </div>
  );
};

export default EventSelector;