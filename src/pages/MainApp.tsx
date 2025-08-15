import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { HomePage } from "@/components/HomePage";
import CollectionPage from "@/components/CollectionPage";
import { ShopPage } from "@/components/ShopPage";
import TradingPage from "@/components/TradingPage";
import { GamesPage } from "@/components/GamesPage";
import { RatingPage } from "@/components/RatingPage";
import { ProfilePage } from "@/components/ProfilePage";
import { PackOpening } from "@/components/PackOpening";
import { RouletteGame } from "@/components/RouletteGame";
import { initTelegram, getTelegramWebApp } from "@/utils/telegram";

export const MainApp = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [showPackOpening, setShowPackOpening] = useState(false);
  const [showRoulette, setShowRoulette] = useState(false);
  const [navigationStack, setNavigationStack] = useState<string[]>(["home"]);
  const [userCoins, setUserCoins] = useState(15420);
  const [userStars, setUserStars] = useState(25);

  useEffect(() => {
    initTelegram();
    
    const telegram = getTelegramWebApp();
    if (telegram) {
      document.body.classList.add('telegram-fullscreen');
    }
    
    return () => {
      document.body.classList.remove('telegram-fullscreen');
    };
  }, []);

  useEffect(() => {
    const telegram = getTelegramWebApp();
    if (!telegram) return;
    
    if (navigationStack.length > 1 || showPackOpening || showRoulette) {
      telegram.BackButton.show();
      const backHandler = () => {
        if (showPackOpening) {
          setShowPackOpening(false);
        } else if (showRoulette) {
          setShowRoulette(false);
        } else {
          handleBackNavigation();
        }
      };
      telegram.BackButton.onClick(backHandler);
      
      return () => {
        telegram.BackButton.offClick(backHandler);
      };
    } else {
      telegram.BackButton.hide();
    }
  }, [navigationStack, showPackOpening, showRoulette]);

  const handleNavigation = (page: string) => {
    setNavigationStack(prev => [...prev, page]);
    setCurrentPage(page);
  };

  const handleBackNavigation = () => {
    if (navigationStack.length > 1) {
      const newStack = navigationStack.slice(0, -1);
      setNavigationStack(newStack);
      setCurrentPage(newStack[newStack.length - 1]);
    }
  };

  const handlePackOpened = (rewards: any[]) => {
    console.log("Pack rewards:", rewards);
  };

  const handleRouletteReward = (reward: any) => {
    console.log("Roulette reward:", reward);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage 
            onOpenPack={() => setShowPackOpening(true)}
            onOpenRoulette={() => setShowRoulette(true)}
            userCoins={userCoins}
            userStars={userStars}
          />
        );
      case "collection":
        return <CollectionPage />;
      case "shop":
        return <ShopPage />;
      case "buy":
        return <TradingPage />;
      case "sell":
        return <TradingPage />;
      case "exchange":
        return <TradingPage />;
      case "auction":
        return <TradingPage />;
      case "games":
        return (
          <GamesPage 
            userCoins={userCoins}
            userStars={userStars}
            onCoinsChange={setUserCoins}
          />
        );
      case "rating":
        return <RatingPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return (
          <HomePage 
            onOpenPack={() => setShowPackOpening(true)} 
            onOpenRoulette={() => setShowRoulette(true)}
            userCoins={userCoins}
            userStars={userStars}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-f1-dark">
      <PageHeader title={currentPage} />
      {renderPage()}
      
      {showPackOpening && (
        <PackOpening
          onClose={() => setShowPackOpening(false)}
          onPackOpened={handlePackOpened}
        />
      )}
      
      {showRoulette && (
        <RouletteGame
          onClose={() => setShowRoulette(false)}
          onRewardWon={handleRouletteReward}
        />
      )}
    </div>
  );
};