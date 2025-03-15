import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import MapSelection from "./MapSelection";
import axios from "axios";

interface EventFormData {
  name: string;
  description: string;
  date: string;
  latitude?: number;
  longitude?: number;
}

function CreateEventForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EventFormData>();

  const [showMap, setShowMap] = useState(false);

  const [latitude, longitude] = useWatch({
    control,
    name: ["latitude", "longitude"],
  });

  const locationExists = latitude !== undefined && longitude !== undefined;

  const onSubmit = async (data: EventFormData) => {
    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/events/Creat_ListEvent/`,
        {...data, charity: JSON.parse(localStorage.getItem('user')!).charity_id},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Event created successfully:", response.data);
      toast.success("Your event has been successfully created.");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create the event. Please try again.");
    }
  };
  

  return (
    <Card className="p-8 max-w-xl mx-auto mt-12 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Event</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-medium">Event Name</Label>
          <Input id="name" {...register("name", { required: "Event name is required" })} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="font-medium">Description</Label>
          <Textarea id="description" {...register("description", { required: "Description is required" })} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="font-medium">Event Date</Label>
          <Input type="date" id="date" {...register("date", { required: "Date is required" })} />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Event Location</Label>
          <Button type="button" variant={'outline'} onClick={() => setShowMap(true)} className="w-fit">Select Location</Button>
          {locationExists && (
            <p className="text-sm">Selected: {latitude}, {longitude}</p>
          )}
        </div>

        <Controller
          control={control}
          name="latitude"
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <Controller
          control={control}
          name="longitude"
          render={({ field }) => <input type="hidden" {...field} />}
        />

        <Button type="submit" className="w-full py-3">Create Event</Button>
      </form>

      {showMap && (
        <MapSelection
          closeMap={() => setShowMap(false)}
          selectedLocation={locationExists ? { lat: latitude!, lng: longitude! } : null}
          setSelectedLocation={(location: { lat: number; lng: number; } | null) => {
            if (location) {
              setValue("latitude", location.lat);
              setValue("longitude", location.lng);
            }
          }}
        />
      )}
    </Card>

  );
}

export default CreateEventForm;
