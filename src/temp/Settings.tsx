import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Mail, Shield, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProfileSection from "../temp/ProfileSection";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat text-white tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="animate-fade-in">
        <TabsList className="grid grid-cols-4 w-full max-w-md mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="organization" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Organization</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSection />
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="elegant-card overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-card/80">
              <CardTitle className="text-lg font-semibold text-white">Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Training Updates</p>
                        <p className="text-muted-foreground text-xs">Receive updates about training sessions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator className="bg-white/5" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">New Document Uploads</p>
                        <p className="text-muted-foreground text-xs">Be notified when new documents are uploaded</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator className="bg-white/5" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Schedule Changes</p>
                        <p className="text-muted-foreground text-xs">Get alerts about schedule modifications</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator className="bg-white/5" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">System Announcements</p>
                        <p className="text-muted-foreground text-xs">Important system updates and announcements</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-4">In-App Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Training Reminders</p>
                        <p className="text-muted-foreground text-xs">Get reminders about upcoming training sessions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator className="bg-white/5" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Document Updates</p>
                        <p className="text-muted-foreground text-xs">Notifications about document changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator className="bg-white/5" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Messages</p>
                        <p className="text-muted-foreground text-xs">Receive notifications for new messages</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <div className="grid gap-6 grid-cols-1">
            <Card className="elegant-card overflow-hidden">
              <CardHeader className="border-b border-white/5 bg-card/80">
                <CardTitle className="text-lg font-semibold text-white">Security Settings</CardTitle>
                <CardDescription>Manage your account security preferences</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium mb-4">Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        <p>Password must contain:</p>
                        <ul className="list-disc pl-4 mt-1 space-y-1">
                          <li>At least 8 characters</li>
                          <li>At least one uppercase letter</li>
                          <li>At least one number</li>
                          <li>At least one special character</li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Update Password</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="bg-white/5" />
                  
                  <div>
                    <h3 className="text-base font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium text-sm">Enable Two-Factor Authentication</p>
                        <p className="text-muted-foreground text-xs">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <Separator className="bg-white/5" />
                  
                  <div>
                    <h3 className="text-base font-medium mb-4">Login Sessions</h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-white/5 rounded-lg bg-card/50">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">Current Session</p>
                            <p className="text-muted-foreground text-xs">Chrome on Windows • Chennai, India</p>
                            <p className="text-muted-foreground text-xs mt-1">Started 2 hours ago</p>
                          </div>
                          <Badge className="bg-success-green/10 text-success-green border-success-green/30">
                            Active
                          </Badge>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">
                        Sign Out of All Sessions
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="organization">
          <Card className="elegant-card overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-card/80">
              <CardTitle className="text-lg font-semibold text-white">Organization Settings</CardTitle>
              <CardDescription>Manage your organization details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input id="orgName" defaultValue="Inspire Safety Foundation" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select defaultValue="safety">
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safety">Safety & Training</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="health">Healthcare</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Organization Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="size">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (1-50 employees)</SelectItem>
                        <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                        <SelectItem value="large">Large (201-1000 employees)</SelectItem>
                        <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    rows={3}
                    defaultValue="123 Safety Street, Chennai, Tamil Nadu, 600001, India"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input id="contactEmail" type="email" defaultValue="contact@inspiresafety.org" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input id="contactPhone" defaultValue="+91 44 1234 5678" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" type="url" defaultValue="https://www.inspiresafety.org" />
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Organization Details</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
