import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });
  
  const navigate = useNavigate()
  const onSubmit = async (data: { email: string; password: string }) => {

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND+'/accounts/login/', data)
      console.log("Login successful", response);
      toast.success("Login successful!");
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("user", response.data.user);
      navigate("/community")
    } catch (err) {
      toast.error("Invalid email or password. Please try again.");
      console.error("Login failed", err);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account? <a href="#" className="underline underline-offset-4">Sign up</a>
      </div>
    </form>
  );
}
