import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";

type RewardFormData = {
  user_id: number;
  description: string;
  points: number;
};

export default function AddReward({ user_id, closeForm }: { user_id:number, closeForm: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RewardFormData>();

  const onSubmit = async (data: RewardFormData) => {
    try {
      data.user_id = user_id;   
      await axios.post(`${import.meta.env.VITE_EXPRESS}/rewards/make-a-reward`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      toast.success("Reward added successfully");
      closeForm();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add reward");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <Card className="w-full max-w-md p-6 mx-auto shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Add Reward</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* <div className="space-y-1">
            <Label htmlFor="user_id">User ID</Label>
            <Input
              id="user_id"
              type="number"
              {...register("user_id", { required: "User ID is required", min: 1 })}
            />
            {errors.user_id && <p className="text-sm text-red-500">{errors.user_id.message}</p>}
          </div> */}

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
            <Label htmlFor="points">Points</Label>
            <Input
              id="points"
              type="number"
              {...register("points", { required: "Points are required", min: 1 })}
            />
            {errors.points && <p className="text-sm text-red-500">{errors.points.message}</p>}
          </div>

          <div className="flex gap-2 mt-4">
            <Button type="submit" className="flex-1">
              Add Reward
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  );
}
