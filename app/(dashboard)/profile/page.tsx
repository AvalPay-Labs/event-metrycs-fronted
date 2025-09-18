"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/lib/hooks/use-toast";
import { useAuth } from "@/lib/hooks/use-auth";
import { profileSchema } from "@/lib/validators";
import { REGIONS } from "@/lib/constants";
import { User, Mail, Lock, Upload } from "lucide-react";
import { z } from "zod";
import { PageHeader } from "@/components/shared/page-header";
import Image from "next/image";

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profilePicture || null
  );
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      region: user?.region || "",
    },
  });

  const onSubmit = async () => {
    setIsUpdating(true);
    try {
      // Simulation of update
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Error updating the profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Spinner size="lg" variant="primary" className="mx-auto mb-4" />
          <p className="text-textSecondary">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader 
        title="My profile"
        subtitle="Manage your personal information and preferences"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-element flex items-center justify-center">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt={user?.name || "Profile image"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-textSecondary" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer hover:bg-primaryHover transition-colors">
                    <Upload className="w-4 h-4 text-text" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <h3 className="text-xl font-bold text-text">{user?.name}</h3>
                <p className="text-textSecondary text-sm">{user?.email}</p>
                <div className="mt-2">
                  <Badge variant={user?.role === "admin" ? "accent" : "secondary"}>
                    {user?.role === "admin" ? "Admin" : "User"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">User information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-textSecondary">User ID:</span>
                  <span className="font-mono">{user?._id.substring(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Username:</span>
                  <span>{user?.handle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Region:</span>
                  <span>{user?.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Registration date:</span>
                  <span>{new Date(user?.createdAt || "").toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Edit profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  id="name"
                  label="Full name"
                  leftIcon={<User className="w-4 h-4 text-textSecondary" />}
                  error={errors.name?.message}
                  {...register("name")}
                />
                
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  leftIcon={<Mail className="w-4 h-4 text-textSecondary" />}
                  error={errors.email?.message}
                  {...register("email")}
                />
                
                <Select
                  id="region"
                  label="Region"
                  options={REGIONS}
                  error={errors.region?.message}
                  {...register("region")}
                />
                
                <div className="pt-4 border-t border-element">
                  <h4 className="font-medium mb-4">Change password</h4>
                  
                  <Input
                    id="password"
                    label="Current password"
                    type="password"
                    leftIcon={<Lock className="w-4 h-4 text-textSecondary" />} 
                    error={errors.password?.message}
                    {...register("password")}
                  />
                  
                  <div className="mt-4">
                    <Input
                      id="newPassword"
                      label="New password"
                      type="password"
                      leftIcon={<Lock className="w-4 h-4 text-textSecondary" />}
                      error={errors.newPassword?.message}
                      {...register("newPassword")}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isUpdating}
                    className="cursor-pointer"
                  >
                    Save changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text">You created a new event</p>
                      <p className="text-xs text-textSecondary">Webinar: DeFi en Avalanche</p>
                    </div>
                    <div className="text-xs text-textSecondary">
                      2 days ago
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text">You updated an event</p>
                      <p className="text-xs text-textSecondary">Avalanche Summit III</p>
                    </div>
                    <div className="text-xs text-textSecondary">
                      5 days ago
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text">Imported data</p>
                      <p className="text-xs text-textSecondary">Hackathon Latinoamericano</p>
                    </div>
                    <div className="text-xs text-textSecondary">
                      1 week ago
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">My statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text">Organized events</span>
                      <span className="font-medium text-text">12</span>
                    </div>
                    <div className="w-full bg-element rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text">Created wallets</span>
                      <span className="font-medium text-text">847</span>
                    </div>
                    <div className="w-full bg-element rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text">Efficiency</span>
                      <span className="font-medium text-success">98%</span>
                    </div>
                    <div className="w-full bg-element rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}