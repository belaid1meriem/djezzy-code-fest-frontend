import { FC, useState } from "react";
import _Event from "@/models/Event";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, MapPin } from "lucide-react";
import VolunteeringForm from "./VolunteeringForm";
import { toast } from "sonner";

interface EventCProps {
  event: _Event;
  closeEvent: () => void;
}

const EventC: FC<EventCProps> = ({ event, closeEvent }) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const handleClick = () => {
    if (localStorage.getItem('access') &&  JSON.parse(localStorage.getItem('user')!).role === 'volunteer') {
      setOpenForm(true);
    }
    else {
      toast.error('You must be a volunteer to participate in this event.');
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="w-full max-w-sm shadow-lg rounded-xl p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">{event.name}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm  text-center">{event.description}</p>

            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="">
                {new Date(event.date).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-5 h-5 text-green-600" />
              <span className="">
                {event.latitude}, {event.longitude}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="">
                Charity: {event.charity_name}
              </span>
            </div>

            {/* Buttons at the bottom */}
            <div className="flex justify-between mt-4">
              <Button variant="outline" className="w-1/2 mr-2" onClick={closeEvent}>
                Close
              </Button>
              <Button onClick={ () => handleClick() } className="w-1/2">
                Volunteer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      { openForm && <VolunteeringForm tasks={event.tasks} closeForm={ () => setOpenForm(false) }/>}
    </>
  );
};

export default EventC;
