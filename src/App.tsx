import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import Playground from "./pages/Playground";
import InspectSimulator from "./pages/InspectSimulator";
import Leaderboard from "./pages/Leaderboard";
import Challenges from "./pages/Challenges";
import NotFound from "./pages/NotFound";
import AIAssistant from "./components/AIAssistant";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/lessons" element={<Lessons />} />
                    <Route path="/playground" element={<Playground />} />
                    <Route path="/inspect" element={<InspectSimulator />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/challenges" element={<Challenges />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <AIAssistant />
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;