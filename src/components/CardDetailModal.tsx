import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ArrowUpDown, Send, DollarSign } from "lucide-react";
import { Card, CARD_RARITIES } from "@/types/cards";
import { useToast } from "@/hooks/use-toast";

interface CardDetailModalProps {
  card: Card | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CardDetailModal = ({ card, isOpen, onClose }: CardDetailModalProps) => {
  const { toast } = useToast();

  if (!card) return null;

  const rarity = CARD_RARITIES[card.rarity];

  const handleSell = () => {
    toast({
      title: "Продажа карты",
      description: `${card.name} выставлена на продажу`,
    });
    onClose();
  };

  const handleExchange = () => {
    toast({
      title: "Обмен карты", 
      description: `${card.name} выставлена на обмен`,
    });
    onClose();
  };

  const handleGift = () => {
    toast({
      title: "Подарок карты",
      description: `${card.name} отправлена в дар`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 gap-0 max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border-0">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={16} className="text-gray-600 dark:text-gray-400" />
          </button>
          
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {card.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {card.type}
            </p>
          </div>
        </div>

        {/* Card Image */}
        <div className="px-6 pb-4">
          <div className="relative">
            <div className={`w-full aspect-[3/4] rounded-2xl ${rarity.bgColor} border-2 ${rarity.borderColor} flex items-center justify-center overflow-hidden`}>
              {card.image ? (
                <img 
                  src={card.image} 
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-6xl">🏎️</div>
              )}
            </div>
            
            {/* Rarity Badge */}
            <div className="absolute -top-2 -right-2">
              <Badge 
                variant="secondary" 
                className={`${rarity.color} ${rarity.bgColor} border ${rarity.borderColor} font-medium`}
              >
                {rarity.name}
              </Badge>
            </div>
          </div>
        </div>

        {/* Card Description */}
        {card.description && (
          <div className="px-6 pb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              {card.description}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-6 pt-2 space-y-3">
          <Button
            onClick={handleSell}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2"
          >
            <DollarSign size={16} />
            Продать
          </Button>
          
          <Button
            onClick={handleExchange}
            variant="outline"
            className="w-full border-2 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950 rounded-xl py-3 font-medium flex items-center justify-center gap-2"
          >
            <ArrowUpDown size={16} />
            Обменять
          </Button>
          
          <Button
            onClick={handleGift}
            variant="outline"
            className="w-full border-2 border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950 rounded-xl py-3 font-medium flex items-center justify-center gap-2"
          >
            <Send size={16} />
            Отправить в дар
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};