"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";
import { loginSchema } from "@/lib/validators";
import { z } from "zod";

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      router.push("/dashboard");
    } catch  {
      // Error handled in the useAuth hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          id="email"
          label="Email"
          type="email"
          leftIcon={<Mail className="w-4 h-4 text-light-500" />}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div>
        <Input
          id="password"
          label="Password"
          type="password"
          leftIcon={<Lock className="w-4 h-4 text-light-500" />}
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      <div className="text-right">
        <Link
          href="#"
          className="text-sm text-primary-400 hover:text-primary-300"
        >
          Forgot your password?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
      >
        Login
      </Button>

      <div className="text-center text-sm text-light-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-primary-400 hover:text-primary-300"
        >
          Register
        </Link>
      </div>
    </form>
  );
}