import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useParams } from "react-router";
import { toast } from "sonner";
import { Task } from "@/models/Event";

type TaskFormData = {
  event: number;
  task_name: string;
  description: string;
  volunteer_limit: number;
};

export default function AddTask({ closeForm }: { closeForm: () => void}) {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>();

  const onSubmit = async (data: TaskFormData) => {
    try {
      data.event = Number(id);
      const res = await axios.post(
        import.meta.env.VITE_BACKEND + "/events/tasks/create/",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      console.log(res.data);
      toast.success("Task created successfully");
      window.location.reload();
      closeForm();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create task");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Create Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="task_name">Task Name</Label>
              <Input
                id="task_name"
                {...register("task_name", { required: "Task name is required" })}
              />
              {errors.task_name && (
                <p className="text-sm text-red-500">{errors.task_name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="volunteer_limit">Volunteer Limit</Label>
              <Input
                id="volunteer_limit"
                type="number"
                {...register("volunteer_limit", {
                  required: "Volunteer limit is required",
                  min: 1,
                })}
              />
              {errors.volunteer_limit && (
                <p className="text-sm text-red-500">
                  {errors.volunteer_limit.message}
                </p>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1" onClick={closeForm}>
                Close
              </Button>
              <Button type="submit" className="flex-1">
                Create Task
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
