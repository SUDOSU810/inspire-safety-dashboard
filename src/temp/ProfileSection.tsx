
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileSection = () => {
  const [profileData, setProfileData] = useState({
    name: "Jane Smith",
    email: "jane.smith@example.com",
    title: "Safety Coordinator",
    bio: "Passionate about creating safe work environments and implementing effective training programs."
  });

  // Placeholder component for the profile section
  return (
    <div className="grid gap-6">
      <Card className="elegant-card overflow-hidden">
        <CardHeader className="border-b border-white/5 bg-card/80">
          <CardTitle className="text-lg font-semibold text-white">Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
              <Avatar className="w-24 h-24 border-4 border-white/10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={profileData.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={profileData.email} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" defaultValue={profileData.title} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" defaultValue={profileData.bio} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-white/5 bg-card/80 px-6 py-4">
          <div className="flex justify-end w-full gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSection;
