import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, Settings, Bell, Shield } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-muted/10 py-12">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Admin Settings</h1>
            <p className="text-muted-foreground">Manage your platform configuration and payments.</p>
          </div>
          <Button variant="outline">View Live Site</Button>
        </div>

        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="w-full justify-start h-12">
            <TabsTrigger value="general" className="px-6">General</TabsTrigger>
            <TabsTrigger value="payments" className="px-6">Payments & Payouts</TabsTrigger>
            <TabsTrigger value="users" className="px-6">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-6">
            
            {/* Connected Accounts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Payment Gateways
                </CardTitle>
                <CardDescription>
                  Configure how you accept payments from customers. We recommend Stripe for the best security and user experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Stripe Integration */}
                <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-[#635BFF] rounded-md flex items-center justify-center text-white font-bold text-lg">
                      S
                    </div>
                    <div>
                      <h4 className="font-bold">Stripe</h4>
                      <p className="text-sm text-muted-foreground">Accept cards, Apple Pay, Google Pay</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                      <Shield className="h-3 w-3" /> Connected
                    </span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>

                {/* PayPal Integration */}
                <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-[#003087] rounded-md flex items-center justify-center text-white font-bold italic">
                      P
                    </div>
                    <div>
                      <h4 className="font-bold">PayPal</h4>
                      <p className="text-sm text-muted-foreground">Accept PayPal and Venmo</p>
                    </div>
                  </div>
                  <Button size="sm">Connect Account</Button>
                </div>

                {/* Shop Pay */}
                <div className="flex items-center justify-between p-4 border rounded-lg bg-background opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-[#5A31F4] rounded-md flex items-center justify-center text-white font-bold">
                      Sh
                    </div>
                    <div>
                      <h4 className="font-bold">Shop Pay</h4>
                      <p className="text-sm text-muted-foreground">Requires Shopify Integration</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" disabled>Unavailable</Button>
                </div>

              </CardContent>
            </Card>

            {/* Payout Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Payout Destination</CardTitle>
                <CardDescription>Where should the money be sent?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label>Bank Account Holder Name</Label>
                       <Input placeholder="Admin Name" />
                     </div>
                     <div className="space-y-2">
                       <Label>PayPal Email (for payouts)</Label>
                       <Input placeholder="admin@example.com" />
                     </div>
                   </div>
                   <div className="flex items-center space-x-2">
                      <Switch id="auto-payout" />
                      <Label htmlFor="auto-payout">Automatic daily payouts</Label>
                   </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Payout Settings</Button>
              </CardFooter>
            </Card>

          </TabsContent>
          
           <TabsContent value="general">
             <Card>
               <CardContent className="py-8 text-center text-muted-foreground">
                 General settings placeholder
               </CardContent>
             </Card>
           </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
