import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router";
// Zod schema for validation
const volunteerSchema = z.object({
  full_name: z.string().min(3, "Full name must be at least 3 characters"),
  phone: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
  address: z.string().min(5, "Address is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type VolunteerForm = z.infer<typeof volunteerSchema>;

export default function RegisterVolunteerForm({ className, ...props }: React.ComponentProps<"form">) {
  const { register, handleSubmit, formState: { errors } } = useForm<VolunteerForm>({
    resolver: zodResolver(volunteerSchema),
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: VolunteerForm) => {
    setLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND+"/accounts/register/volunteer/", data);
      toast.success("Volunteer registered successfully!");
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("user", response.data.user);
      navigate("/community")
    } catch(error) {
      toast.error("Registration failed. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Join as a Volunteer</h1>
        <p className="text-sm text-muted-foreground">Help communities by signing up.</p>
      </div>

      <div className="grid gap-4">
        {/* Full Name */}
        <div className="grid gap-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input id="full_name" {...register("full_name")} />
          {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
        </div>

        {/* Phone */}
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Address */}
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" {...register("address")} />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}
