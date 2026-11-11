import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AdminSettings from "@/pages/AdminSettings";
import PromptLibrary from "@/pages/PromptLibrary";
import Contact from "@/pages/Contact";
import LearnPromptEngineering from "@/pages/LearnPromptEngineering";
import AcademyDashboard from "@/pages/AcademyDashboard";
import AcademyCheckout from "@/pages/AcademyCheckout";
import AcademyForum from "@/pages/AcademyForum";
import AcademyTutor from "@/pages/AcademyTutor";
import LatinCourse from "@/pages/LatinCourse";
import OpenArchive from "@/pages/OpenArchive";
import ResearchCenter from "@/pages/ResearchCenter";
import MyResearch from "@/pages/MyResearch";
import DNAHub from "@/pages/DNAHub";
import DNAJourney from "@/pages/DNAJourney";
import UploadDNA from "@/pages/UploadDNA";
import Forum from "@/pages/Forum";
import HeritageBookPreview from "@/pages/HeritageBookPreview";
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
          <Route path="/prompts" component={PromptLibrary} />
          <Route path="/learn" component={LearnPromptEngineering} />
          <Route path="/academy" component={AcademyDashboard} />
          <Route path="/academy/checkout" component={AcademyCheckout} />
          <Route path="/academy/forum" component={AcademyForum} />
          <Route path="/academy/tutor" component={AcademyTutor} />
          <Route path="/latin" component={LatinCourse} />
          <Route path="/archive" component={OpenArchive} />
          <Route path="/research" component={ResearchCenter} />
          <Route path="/research/forum" component={Forum} />
          <Route path="/my-research" component={MyResearch} />
          <Route path="/dna-hub" component={DNAHub} />
          <Route path="/journey" component={DNAJourney} />
          <Route path="/upload-dna" component={UploadDNA} />
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
