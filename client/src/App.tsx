import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Forum from "@/pages/Forum";
import Pricing from "@/pages/Pricing";
import Checkout from "@/pages/Checkout";
import AdminSettings from "@/pages/AdminSettings";
import PromptLibrary from "@/pages/PromptLibrary";
import Contact from "@/pages/Contact";
import LearnPromptEngineering from "@/pages/LearnPromptEngineering";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

function Router() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/forum" component={Forum} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/prompts" component={PromptLibrary} />
          <Route path="/learn" component={LearnPromptEngineering} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={AdminSettings} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
