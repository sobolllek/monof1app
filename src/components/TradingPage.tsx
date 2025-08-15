import React, { useState } from 'react';
import { Card, Rarity, TradingOffer, CARD_RARITIES } from '@/types/cards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const tradingOffers: TradingOffer[] = [
  {
    id: '1',
    fromCard: {
      id: '1',
      name: 'Max Verstappen',
      team: 'Red Bull',
      type: 'driver',
      rarity: 'ultrasoft',
      image: '/image/cards/verstappen/png/verstappen-1.png',
      description: 'Чемпион мира',
      dropInfo: { isDroppable: true, year: 2024 }
    },
    type: 'driver',
    cardName: 'Max Verstappen',
    seller: 'Player123',
    price: 1500,
    timeLeft: '2 дня',
    rarity: 'ultrasoft',
    status: 'active'
  },
  {
    id: '2',
    fromCard: {
      id: '2',
      name: 'Lewis Hamilton',
      team: 'Mercedes',
      type: 'driver',
      rarity: 'supersoft',
      image: '/image/cards/hamilton/png/hamilton-1.png',
      description: 'Семикратный чемпион',
      dropInfo: { isDroppable: true, year: 2024 }
    },
    type: 'driver',
    cardName: 'Lewis Hamilton',
    seller: 'F1Fan',
    currentBid: 850,
    timeLeft: '12:45',
    rarity: 'supersoft',
    status: 'auction'
  },
  {
    id: '3',
    fromCard: {
      id: '3',
      name: 'Monaco GP',
      type: 'track',
      rarity: 'ultrasoft',
      image: '/image/cards/circuits/png/monaco-1.png',
      description: 'Легендарная трасса',
      dropInfo: { isDroppable: true, year: 2024 }
    },
    type: 'track',
    cardName: 'Monaco GP',
    seller: 'TrackMaster',
    wantedCard: 'Silverstone GP',
    timeLeft: '1 день',
    rarity: 'ultrasoft',
    status: 'exchange'
  }
];

const myOffers: TradingOffer[] = [
  {
    id: '4',
    type: 'driver',
    cardName: 'Lewis Hamilton',
    seller: 'Я',
    rarity: 'supersoft',
    price: 1200,
    timeLeft: '2 дня 5:30',
    status: 'active'
  },
  {
    id: '5',
    type: 'team',
    cardName: 'Red Bull Racing',
    seller: 'Я',
    rarity: 'ultrasoft',
    currentBid: 850,
    timeLeft: '12:45',
    status: 'active'
  }
];

const completedTrades: TradingOffer[] = [
  {
    id: '6',
    type: 'driver',
    cardName: 'Charles Leclerc',
    seller: 'SpeedDemon',
    rarity: 'soft',
    price: 900,
    timeLeft: 'Завершено',
    status: 'completed'
  }
];

const TradingPage = () => {
  const [selectedTab, setSelectedTab] = useState('market');

  const getRarityColor = (rarity: Rarity) => {
    return CARD_RARITIES[rarity]?.color || 'bg-gray-500';
  };

  const handleBid = (offerId: string) => {
    console.log('Placing bid on offer:', offerId);
  };

  const handleBuyNow = (offerId: string) => {
    console.log('Buying offer:', offerId);
  };

  const handleExchange = (offerId: string) => {
    console.log('Requesting exchange for offer:', offerId);
  };

  const renderOfferCard = (offer: TradingOffer) => (
    <div key={offer.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold">{offer.cardName}</h3>
          <p className="text-gray-400 text-sm">Продавец: {offer.seller}</p>
        </div>
        <Badge className={`${getRarityColor(offer.rarity)} text-white`}>
          {CARD_RARITIES[offer.rarity]?.name || offer.rarity}
        </Badge>
      </div>

      {offer.fromCard?.image && (
        <div className="mb-3">
          <img
            src={offer.fromCard.image}
            alt={offer.cardName}
            className="w-20 h-28 object-cover rounded border-2 border-gray-600"
          />
        </div>
      )}

      <div className="space-y-2 mb-4">
        {offer.price && (
          <p className="text-yellow-400 font-semibold">
            Цена: {offer.price} монет
          </p>
        )}
        {offer.currentBid && (
          <p className="text-green-400 font-semibold">
            Текущая ставка: {offer.currentBid} монет
          </p>
        )}
        {offer.wantedCard && (
          <p className="text-blue-400">
            Нужна карта: {offer.wantedCard}
          </p>
        )}
        <p className="text-gray-300 text-sm">
          Время: {offer.timeLeft}
        </p>
      </div>

      <div className="flex gap-2">
        {offer.status === 'auction' && (
          <>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleBid(offer.id)}
            >
              Сделать ставку
            </Button>
            {offer.price && (
              <Button 
                size="sm"
                onClick={() => handleBuyNow(offer.id)}
              >
                Купить сейчас
              </Button>
            )}
          </>
        )}
        {offer.status === 'active' && offer.price && (
          <Button 
            size="sm"
            onClick={() => handleBuyNow(offer.id)}
          >
            Купить
          </Button>
        )}
        {offer.status === 'exchange' && (
          <Button 
            size="sm" 
            variant="secondary"
            onClick={() => handleExchange(offer.id)}
          >
            Предложить обмен
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Торговая площадка
        </h1>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="market">Рынок ({tradingOffers.length})</TabsTrigger>
            <TabsTrigger value="my-offers">Мои предложения ({myOffers.length})</TabsTrigger>
            <TabsTrigger value="history">История ({completedTrades.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="market">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tradingOffers.map(renderOfferCard)}
            </div>
          </TabsContent>

          <TabsContent value="my-offers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myOffers.map(renderOfferCard)}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedTrades.map(renderOfferCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TradingPage;