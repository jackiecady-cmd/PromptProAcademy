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
import AcademyDashboard from "@/pages/AcademyDashboard";
import AcademyCheckout from "@/pages/AcademyCheckout";
import HeritageBookCheckout from "@/pages/HeritageBookCheckout";
import AcademyForum from "@/pages/AcademyForum";
import AcademyTutor from "@/pages/AcademyTutor";
import LatinCourse from "@/pages/LatinCourse";
import DNAJourney from "@/pages/DNAJourney";
import MyResearch from "@/pages/MyResearch";
import HeritageBookPreview from "@/pages/HeritageBookPreview";
import UploadDNA from "@/pages/UploadDNA";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";

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
          <Route path="/checkout/heritage-book" component={HeritageBookCheckout} />
          <Route path="/prompts" component={PromptLibrary} />
          <Route path="/learn" component={LearnPromptEngineering} />
          <Route path="/academy" component={AcademyDashboard} />
          <Route path="/academy/checkout" component={AcademyCheckout} />
          <Route path="/academy/forum" component={AcademyForum} />
          <Route path="/academy/tutor" component={AcademyTutor} />
          <Route path="/latin" component={LatinCourse} />
          <Route path="/journey" component={DNAJourney} />
          <Route path="/upload-dna" component={UploadDNA} />
          <Route path="/my-research" component={MyResearch} />
          <Route path="/my-book" component={HeritageBookPreview} />
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
        <ChatWidget />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
