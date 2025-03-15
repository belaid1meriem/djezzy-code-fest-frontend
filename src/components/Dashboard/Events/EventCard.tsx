import { FC } from "react";
import _Event from "@/models/Event";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, MapPin } from "lucide-react";

interface EventCProps {
  event: _Event;
}

const EventCard: FC<EventCProps> = ({ event }) => {
  return (
    <Card className="w-full max-w-sm rounded-xl p-4">
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
            <div className="flex justify-end items-end mt-4">
                <Button variant={'outline'} >
                    View details
                </Button>
            </div>
        </CardContent>
    </Card>

  );
};

export default EventCard;
