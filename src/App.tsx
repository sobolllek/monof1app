import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import LoadingScreen from "./components/LoadingScreen";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import Collection from "./pages/Collection";
import Market from "./pages/Market";
import Games from "./pages/Games";
import DailyRoulette from "./pages/DailyRoulette";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const noTabbarRoutes = ["/profile"];
  const showNavigation = !noTabbarRoutes.includes(location.pathname);

  return (
    <div className="relative min-h-screen pb-24">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/market" element={<Market />} />
        <Route path="/games" element={<Games />} />
        <Route path="/daily-roulette" element={<DailyRoulette />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showNavigation && <Navigation />}
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
