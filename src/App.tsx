import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Layout from "./components/Layout";
import TelegramWebAppProvider from "./components/TelegramWebAppProvider";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import Collection from "./pages/Collection";
import Market from "./pages/Market";
import Games from "./pages/Games";
import DailyRoulette from "./pages/DailyRoulette";
import Trades from "./pages/Trades";
import Rating from "./pages/Rating";
import LegendGarage from "./pages/LegendGarage";
import RacerMap from "./pages/RacerMap";
import TeamManager from "./pages/TeamManager";
import CategoryCards from './pages/CategoryCards';

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <TelegramWebAppProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/collection/:categoryId" element={<CategoryCards />} />
                <Route path="/market" element={<Market />} />
                <Route path="/trades" element={<Trades />} />
                <Route path="/games" element={<Games />} />
                <Route path="/daily-roulette" element={<DailyRoulette />} />
                <Route path="/rating" element={<Rating />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/legend-garage" element={<LegendGarage />} />
                <Route path="/racer-map" element={<RacerMap />} />
                <Route path="/team-manager" element={<TeamManager />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </TelegramWebAppProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
