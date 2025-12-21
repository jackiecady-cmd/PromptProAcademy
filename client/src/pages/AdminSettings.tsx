import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CreditCard, 
  DollarSign, 
  Settings, 
  Bell, 
  Shield, 
  Package,
  BookOpen,
  ExternalLink,
  TrendingUp,
  Calculator
} from "lucide-react";

interface Order {
  id: string;
  email: string;
  productType: string;
  amount: number;
  status: string;
  createdAt: string;
  fulfillmentStatus?: string;
  vendorCost?: number;
  customerName?: string;
}

const VENDOR_COSTS = {
  blurb: {
    heritage_book_standard: 2500,
    heritage_book_premium: 3500,
    heritage_book_deluxe: 4500,
  },
  lulu: {
    heritage_book_standard: 2200,
    heritage_book_premium: 3200,
    heritage_book_deluxe: 4200,
  }
};

const productLabels: Record<string, string> = {
  base_analysis: "Base DNA Analysis",
  royal_blood: "Royal Blood Add-on",
  holocaust_search: "Holocaust Survivor Search",
  tribe_trace: "Tribe Trace Add-on",
  heritage_book_standard: "Heritage Book - Standard",
  heritage_book_premium: "Heritage Book - Premium",
  heritage_book_deluxe: "Heritage Book - Deluxe",
  academy_starter: "PromptPro Starter",
  academy_foundation: "PromptPro Foundation",
  academy_professional: "PromptPro Professional",
  latin_subscription: "Sacred Latin Course",
  consultation: "1-on-1 Consultation",
};

const fulfillmentLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Awaiting Order", color: "bg-yellow-100 text-yellow-800" },
  ordered_blurb: { label: "Ordered via Blurb", color: "bg-blue-100 text-blue-800" },
  ordered_lulu: { label: "Ordered via Lulu", color: "bg-purple-100 text-purple-800" },
  shipped: { label: "Shipped", color: "bg-orange-100 text-orange-800" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
};

export default function AdminSettings() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Record<string, string>>({});

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders/all");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
    setLoading(false);
  };

  const updateFulfillment = async (orderId: string, fulfillmentStatus: string, vendorCost?: number) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/fulfillment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fulfillmentStatus, vendorCost }),
      });
      if (res.ok) {
        loadOrders();
      }
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const handleMarkOrdered = (order: Order, vendor: "blurb" | "lulu") => {
    const productKey = order.productType as keyof typeof VENDOR_COSTS.blurb;
    const cost = VENDOR_COSTS[vendor][productKey] || 3000;
    updateFulfillment(order.id, `ordered_${vendor}`, cost);
  };

  const heritageBookOrders = orders.filter(o => o.productType.includes("heritage_book"));
  const otherOrders = orders.filter(o => !o.productType.includes("heritage_book"));
  const completedOrders = orders.filter(o => o.status === "completed");

  const calculateProfit = (order: Order) => {
    if (!order.vendorCost) return null;
    return (order.amount - order.vendorCost) / 100;
  };

  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.amount, 0) / 100;
  const totalCosts = completedOrders.reduce((sum, o) => sum + (o.vendorCost || 0), 0) / 100;
  const totalProfit = totalRevenue - totalCosts;

  return (
    <div className="min-h-screen bg-muted/10 py-12">
      <div className="container px-4 md:px-6 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage orders, fulfillment, and payments.</p>
          </div>
          <Button variant="outline">View Live Site</Button>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="w-full justify-start h-12">
            <TabsTrigger value="orders" className="px-6">
              <Package className="h-4 w-4 mr-2" /> Orders & Fulfillment
            </TabsTrigger>
            <TabsTrigger value="payments" className="px-6">Payments & Payouts</TabsTrigger>
            <TabsTrigger value="general" className="px-6">General</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            
            {/* Profit Summary */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">{orders.length}</p>
                      <p className="text-xs text-muted-foreground">{completedOrders.length} completed</p>
                    </div>
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue (Paid)</p>
                      <p className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Vendor Costs</p>
                      <p className="text-2xl font-bold text-orange-600">${totalCosts.toFixed(2)}</p>
                    </div>
                    <Calculator className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700">Your Profit</p>
                      <p className="text-2xl font-bold text-green-700">${totalProfit.toFixed(2)}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Heritage Book Orders - Need Fulfillment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#7D0A24]" />
                  Heritage Book Orders
                </CardTitle>
                <CardDescription>
                  Print-on-demand orders. Order from Blurb or Lulu, then mark as shipped.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {heritageBookOrders.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No Heritage Book orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {heritageBookOrders.map(order => {
                      const profit = calculateProfit(order);
                      const productKey = order.productType as keyof typeof VENDOR_COSTS.blurb;
                      const blurbCost = VENDOR_COSTS.blurb[productKey] || 3000;
                      const luluCost = VENDOR_COSTS.lulu[productKey] || 2700;
                      
                      return (
                        <div key={order.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold">{productLabels[order.productType] || order.productType}</h4>
                                {order.fulfillmentStatus && (
                                  <Badge className={fulfillmentLabels[order.fulfillmentStatus]?.color}>
                                    {fulfillmentLabels[order.fulfillmentStatus]?.label}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{order.email}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">
                                Customer paid: ${(order.amount / 100).toFixed(2)}
                              </p>
                              {profit !== null && (
                                <p className="text-sm text-emerald-600 font-medium">
                                  Your profit: ${profit.toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Vendor Selection */}
                          {(!order.fulfillmentStatus || order.fulfillmentStatus === "pending") && (
                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                              <p className="font-medium text-amber-800 mb-3">Choose your vendor:</p>
                              <div className="grid md:grid-cols-2 gap-3">
                                <div className="border rounded-lg p-3 bg-white">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold">Blurb</span>
                                    <span className="text-orange-600">-${(blurbCost / 100).toFixed(2)}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Your profit: <span className="text-green-600 font-bold">
                                      ${((order.amount - blurbCost) / 100).toFixed(2)}
                                    </span>
                                  </p>
                                  <Button 
                                    size="sm" 
                                    className="w-full"
                                    onClick={() => handleMarkOrdered(order, "blurb")}
                                  >
                                    Order via Blurb <ExternalLink className="h-3 w-3 ml-1" />
                                  </Button>
                                </div>
                                <div className="border rounded-lg p-3 bg-white">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold">Lulu</span>
                                    <span className="text-orange-600">-${(luluCost / 100).toFixed(2)}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Your profit: <span className="text-green-600 font-bold">
                                      ${((order.amount - luluCost) / 100).toFixed(2)}
                                    </span>
                                  </p>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleMarkOrdered(order, "lulu")}
                                  >
                                    Order via Lulu <ExternalLink className="h-3 w-3 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Status Update for ordered items */}
                          {order.fulfillmentStatus && order.fulfillmentStatus.includes("ordered") && (
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateFulfillment(order.id, "shipped", order.vendorCost)}
                              >
                                Mark as Shipped
                              </Button>
                            </div>
                          )}
                          
                          {order.fulfillmentStatus === "shipped" && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-green-600"
                              onClick={() => updateFulfillment(order.id, "delivered", order.vendorCost)}
                            >
                              Mark as Delivered
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Other Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Other Orders</CardTitle>
                <CardDescription>DNA analyses, Academy courses, and consultations</CardDescription>
              </CardHeader>
              <CardContent>
                {otherOrders.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No other orders yet</p>
                ) : (
                  <div className="space-y-2">
                    {otherOrders.map(order => (
                      <div key={order.id} className="flex items-center justify-between border-b py-3">
                        <div>
                          <p className="font-medium">{productLabels[order.productType] || order.productType}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">${(order.amount / 100).toFixed(2)}</p>
                          <Badge variant={order.status === "completed" ? "default" : "secondary"}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

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
              <CardHeader>
                <CardTitle>Vendor Cost Settings</CardTitle>
                <CardDescription>Adjust estimated print costs for profit calculations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3">Blurb Costs</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Standard Book</span>
                        <span className="font-mono">$25.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Premium Book</span>
                        <span className="font-mono">$35.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Deluxe Book</span>
                        <span className="font-mono">$45.00</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3">Lulu Costs</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Standard Book</span>
                        <span className="font-mono">$22.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Premium Book</span>
                        <span className="font-mono">$32.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Deluxe Book</span>
                        <span className="font-mono">$42.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  These are estimated costs. Actual costs may vary based on page count and shipping.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
