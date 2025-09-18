"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useAuth } from "@/lib/hooks/use-auth";
import { registerSchema } from "@/lib/validators";
import { REGIONS } from "@/lib/constants";
import { z } from "zod";

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register: registerUser, isLoading } = useAuth();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      handle: "",
      name: "",
      email: "",
      password: "",
      region: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data);
      router.push("/dashboard");
    } catch {
      // Error handled in the useAuth hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          id="handle"
          label="Username"
          leftIcon={<User className="w-4 h-4 text-textSecondary" />}
          error={errors.handle?.message}
          {...register("handle")}
        />
      </div>

      <div>
        <Input
          id="name"
          label="Full name"
          leftIcon={<User className="w-4 h-4 text-textSecondary" />}
          error={errors.name?.message}
          {...register("name")}
        />
      </div>

      <div>
        <Input
          id="email"
          label="Email"
          type="email"
          leftIcon={<Mail className="w-4 h-4 text-textSecondary" />}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div>
        <Input
          id="password"
          label="Password"
          type="password"
          leftIcon={<Lock className="w-4 h-4 text-textSecondary" />}
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      <div>
        <Select
          id="region"
          label="Region"
          options={REGIONS}
          error={errors.region?.message}
          {...register("region")}
        />
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer"
        isLoading={isLoading}
      >
        Register
      </Button>

      <div className="text-center text-sm text-textSecondary">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-primaryHover cursor-pointer"
        >
          Login
        </Link>
      </div>
    </form>
  );
}