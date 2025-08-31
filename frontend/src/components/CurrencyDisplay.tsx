import { Coins, Star } from "lucide-react";

interface CurrencyDisplayProps {
  coins: number;
  stars: number;
}

export const CurrencyDisplay = ({ coins, stars }: CurrencyDisplayProps) => {
  return (
    <div className="flex items-center space-x-4">
      {/* Coins */}
      <div className="currency-display">
        <Coins className="w-4 h-4 text-accent" />
        <span>{coins.toLocaleString()}</span>
      </div>

      {/* Telegram Stars */}
      <div className="currency-display">
        <Star className="w-4 h-4 text-primary fill-current" />
        <span>{stars}</span>
      </div>
    </div>
  );
};

export default CurrencyDisplay;