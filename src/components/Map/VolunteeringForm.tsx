import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router";

interface Task {
  id: number;
  task_name: string;
  description: string;
  volunteer_limit: number;
  event: number;
}


export default function VolunteeringForm({ closeForm, tasks }: { closeForm: () => void, tasks: Task[] }) {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedTask === null) {
      toast.error("Please select a task.");
      return;
    }
  
    try {
        const response = await axios.post(
            import.meta.env.VITE_BACKEND+"/events/assign-task/",
            {
                task_id: selectedTask, // Task ID to assign
                user_id: JSON.parse(localStorage.getItem("user")!).id, // Get user ID
                event_id: tasks.find((task) => task.id === selectedTask)?.event, // Get event ID from selected task
            },
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`, 
                },
            }
          );
        toast.success("Task assigned successfully!");
        navigate('/community/'+ tasks.find((task) => task.id === selectedTask)?.event )

    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while assigning the task.");
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 overflow-hidden">
      <Card className="w-full max-w-sm shadow-xl rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <h2 className="text-xl font-semibold text-center">Choose the task that you want to help with!</h2>

          <RadioGroup 
            value={selectedTask?.toString()} 
            onValueChange={(value) => setSelectedTask(Number(value))} 
            className="space-y-3"
          >
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-3">
                <RadioGroupItem id={`task-${task.id}`} value={task.id.toString()} />
                <Label htmlFor={`task-${task.id}`} className="cursor-pointer">{task.task_name} - {task.description}</Label>
              </div>
            ))}
          </RadioGroup>
          { tasks.length === 0 && <p className="text-center text-lg">No Tasks to help with ! Thank u !</p>}

          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" className="w-1/2" onClick={closeForm}>
              Close
            </Button>
            { tasks.length > 0 && <Button type="submit" className="w-1/2">Submit</Button> }
          </div>
        </form>
      </Card>
    </div>
  );
}
