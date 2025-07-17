import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Layout from "./components/Layout";
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

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        expand: () => void;
        close: () => void;
        enableClosingConfirmation: () => void;
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
      };
    };
  }
}

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTMA, setIsTMA] = useState(false);

  useEffect(() => {
    const tgWebApp = window.Telegram?.WebApp;
    setIsTMA(!!tgWebApp);

    if (tgWebApp) {
      tgWebApp.expand();
      tgWebApp.enableClosingConfirmation();
      
      // Инициализация BackButton сразу
      tgWebApp.BackButton.hide();
    }

    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout isTMA={isTMA}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/collection" element={<Collection />} />
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
