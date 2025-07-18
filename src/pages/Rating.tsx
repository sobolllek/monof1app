
import { useState } from 'react';
import { ChevronLeft, TrendingUp, Trophy, Users, Star, Target } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Rating = () => {
  // Данные для подиума (топ-3)
  const podiumData = [
    { position: 2, name: 'Boabo', points: 301, avatar: '🏎️' },
    { position: 1, name: 'Kaizen', points: 410, avatar: '👑' },
    { position: 3, name: 'Meome', points: 175, avatar: '🎯' }
  ];

  // Данные для остальных позиций (4-6+)
  const leaderboardData = [
    { position: 4, name: 'Evil Monkey', points: 160, avatar: '🐵' },
    { position: 5, name: 'Cutiee Neko', points: 158, avatar: '🐱' },
    { position: 6, name: 'Motorono', points: 150, avatar: '🏁' },
  ];

  return (
    <div className="min-h-screen bg-f1-gradient-dark pb-20">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-b from-black via-black/80 to-transparent z-40">
        <div className="p-4 pt-[3.75rem]">
          <div className="flex items-center justify-center">
            <h1 className="text-xl font-bold text-white">Рейтинг</h1>
          </div>
        </div>
      </div>
      
      <div className="pt-32 p-4 space-y-6">
        {/* User's Rating */}
        <div className="f1-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-f1-orange" size={24} />
            <div>
              <h3 className="text-white font-semibold">Ваш рейтинг</h3>
              <p className="text-gray-400 text-sm">Место #234 • 3.97 ⭐</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-f1-orange">↗</div>
        </div>

        {/* Leaderboard Card */}
        <Card className="f1-card p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">Недельный рейтинг</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-f1-red text-white text-sm rounded-full">Daily</button>
                <button className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">Weekly</button>
                <button className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">Monthly</button>
              </div>
            </div>

            {/* Podium */}
            <div className="relative mb-8">
              <div className="flex items-end justify-center gap-4 mb-4">
                {/* 2nd Place */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-2 text-xl">
                    {podiumData[0].avatar}
                  </div>
                  <div className="text-white font-semibold text-sm">{podiumData[0].name}</div>
                  <div className="text-purple-400 text-xs">⭐ {podiumData[0].points}</div>
                </div>
                
                {/* 1st Place */}
                <div className="text-center -mt-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-2 text-2xl border-4 border-yellow-300">
                    {podiumData[1].avatar}
                  </div>
                  <div className="text-white font-bold">{podiumData[1].name}</div>
                  <div className="text-yellow-400 font-semibold">⭐ {podiumData[1].points}</div>
                </div>
                
                {/* 3rd Place */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-2 text-xl">
                    {podiumData[2].avatar}
                  </div>
                  <div className="text-white font-semibold text-sm">{podiumData[2].name}</div>
                  <div className="text-purple-400 text-xs">⭐ {podiumData[2].points}</div>
                </div>
              </div>

              {/* Podium Base */}
              <div className="flex items-end justify-center gap-4 h-16">
                <div className="w-16 h-12 bg-gray-600 rounded-t-lg flex items-center justify-center text-white font-bold text-xl">2</div>
                <div className="w-16 h-16 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-lg flex items-center justify-center text-white font-bold text-2xl">1</div>
                <div className="w-16 h-8 bg-amber-600 rounded-t-lg flex items-center justify-center text-white font-bold text-xl">3</div>
              </div>
            </div>

            {/* Rest of leaderboard */}
            <div className="space-y-3">
              {leaderboardData.map((player) => (
                <div key={player.position} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-white font-bold">
                    {player.position}
                  </div>
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg">
                    {player.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{player.name}</div>
                  </div>
                  <div className="text-purple-400 font-semibold">
                    ⭐ {player.points}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default Rating;
