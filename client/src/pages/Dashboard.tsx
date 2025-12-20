import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Map as MapIcon, Crown, Skull, UserCheck } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import mapImage from "@assets/generated_images/stylized_world_migration_map.png";

const ethnicityData = [
  { name: 'Northern European', value: 45, color: 'hsl(346 85% 26%)' }, // Primary
  { name: 'Eastern European', value: 25, color: 'hsl(13 96% 53%)' },  // Accent
  { name: 'Middle Eastern', value: 15, color: 'hsl(200 80% 40%)' },
  { name: 'Ashkenazi Jewish', value: 10, color: 'hsl(150 60% 35%)' },
  { name: 'Native American', value: 5, color: 'hsl(40 90% 50%)' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      {/* Header */}
      <header className="bg-background border-b py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">Welcome back, Sarah</h1>
              <p className="text-muted-foreground">Sample Report ID: #88219-XJ • Last Updated: Dec 20, 2025</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Download PDF</Button>
              <Button size="sm">Update Data</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container px-4 md:px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-background border p-1 h-12 w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-base">Overview</TabsTrigger>
            <TabsTrigger value="ethnicity" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-base">Ethnicity Estimate</TabsTrigger>
            <TabsTrigger value="migration" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-base">Migration Map</TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-base">Deep Heritage</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Ethnicity Summary Card */}
              <Card className="col-span-1 md:col-span-2 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-serif">Genetic Breakdown</CardTitle>
                  <CardDescription>Combined estimate from Ancestry, 23andMe & MyHeritage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full h-full md:w-1/2">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={ethnicityData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {ethnicityData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-full md:w-1/2 space-y-4">
                      {ethnicityData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <span className="font-bold text-muted-foreground">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Haplogroup Card */}
              <Card className="col-span-1 shadow-sm bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <DnaIcon className="h-5 w-5 text-primary" />
                    Maternal Haplogroup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold text-primary">H1a3</div>
                  <p className="text-sm text-muted-foreground">
                    This lineage traces back to a woman who lived approximately 13,000 years ago in the Near East.
                  </p>
                  <div className="pt-4 border-t border-primary/10">
                    <h4 className="font-semibold mb-2">Famous Connections</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-background">Marie Antoinette</Badge>
                      <Badge variant="secondary" className="bg-background">Prince Philip</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10 text-primary">
                    View Paternal Line (Upgrade)
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Special Checks Section */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SpecialCheckCard 
                icon={Crown} 
                title="Royal Blood" 
                status="found" 
                desc="Potential connection to House of Stuart detected."
              />
              <SpecialCheckCard 
                icon={Skull} 
                title="Ancient DNA" 
                status="found" 
                desc="98% match with Viking era samples from Gotland."
              />
              <SpecialCheckCard 
                icon={UserCheck} 
                title="Holocaust Survivors" 
                status="check" 
                desc="Run a deep search against survivor registries."
              />
              <SpecialCheckCard 
                icon={MapIcon} 
                title="Native Tribes" 
                status="locked" 
                desc="Unlock detailed tribal affiliation report."
              />
            </div>
          </TabsContent>

          {/* Migration Tab */}
          <TabsContent value="migration" className="space-y-6">
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <img src={mapImage} alt="Migration Map" className="w-full h-full object-cover opacity-80" />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur p-4 rounded-lg shadow-xl max-w-xs">
                  <h3 className="font-bold mb-2">Migration Path: 1750-1890</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Based on surname matching and DNA segments, your ancestors likely moved from Central Europe to North America during this period.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Bavaria</span>
                      <span>1750</span>
                    </div>
                    <Progress value={100} className="h-1" />
                    <div className="flex justify-between text-xs">
                      <span>Hamburg</span>
                      <span>1882</span>
                    </div>
                    <Progress value={60} className="h-1" />
                    <div className="flex justify-between text-xs">
                      <span>New York</span>
                      <span>1885</span>
                    </div>
                    <Progress value={30} className="h-1" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

           {/* Other tabs placeholders */}
           <TabsContent value="ethnicity"><div className="p-12 text-center text-muted-foreground">Detailed Ethnicity View Placeholder</div></TabsContent>
           <TabsContent value="matches"><div className="p-12 text-center text-muted-foreground">Deep Heritage View Placeholder</div></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function DnaIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 15c6.667-6 13.333 0 20-6" />
      <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
      <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
      <path d="M17 6l-2.5-2.5" />
      <path d="M14 8l-1-1" />
      <path d="M7 18l2.5 2.5" />
      <path d="M3.5 14.5l.5.5" />
      <path d="M20 9l.5.5" />
      <path d="M6.5 12.5l1 1" />
      <path d="M16.5 10.5l1 1" />
      <path d="M10 16l1.5 1.5" />
    </svg>
  )
}

function SpecialCheckCard({ icon: Icon, title, status, desc }: { icon: any, title: string, status: 'found' | 'check' | 'locked', desc: string }) {
  return (
    <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
            <Icon className="h-5 w-5 text-foreground group-hover:text-primary" />
          </div>
          {status === 'found' && <Badge className="bg-green-600">Match Found</Badge>}
          {status === 'check' && <Badge variant="outline">Run Check</Badge>}
          {status === 'locked' && <Badge variant="secondary" className="opacity-50">Premium</Badge>}
        </div>
        <CardTitle className="text-lg mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
      {status !== 'found' && (
        <CardFooter className="pt-0">
           <Button variant="ghost" className="w-full text-xs h-8 text-primary p-0 justify-start hover:bg-transparent hover:underline">
             {status === 'locked' ? 'Unlock for $5' : 'Start Scan'}
           </Button>
        </CardFooter>
      )}
    </Card>
  )
}
