import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award, Star, TrendingUp } from "lucide-react";

const weeklyLeaders = [
  { id: 1, name: "MaxSpeed_RU", points: 2845, change: "+12", avatar: "🏆" },
  { id: 2, name: "Hamilton_Fan", points: 2720, change: "+8", avatar: "🥈" },
  { id: 3, name: "F1_Legend", points: 2680, change: "-2", avatar: "🥉" },
  { id: 4, name: "RedBull_Power", points: 2645, change: "+5", avatar: "🏎️" },
  { id: 5, name: "Verstappen33", points: 2590, change: "+15", avatar: "⚡" },
  { id: 6, name: "LewisHam44", points: 2545, change: "-3", avatar: "🏁" },
  { id: 7, name: "Ferrari_Tifosi", points: 2520, change: "+7", avatar: "🔴" },
  { id: 8, name: "McLaren_Speed", points: 2485, change: "+2", avatar: "🧡" },
  { id: 9, name: "AlpineF1", points: 2460, change: "-1", avatar: "💙" },
  { id: 10, name: "Williams_Racing", points: 2435, change: "+4", avatar: "💚" },
];

const weeklyRewards = [
  { place: 1, reward: "Prize Pack", icon: "🎁", color: "text-yellow-600 bg-yellow-100" },
  { place: 2, reward: "80 монет", icon: "🪙", color: "text-gray-600 bg-gray-100" },
  { place: 3, reward: "40 монет", icon: "🪙", color: "text-orange-600 bg-orange-100" },
];

const achievements = [
  { id: 1, name: "Первая покупка", description: "Купите первую карту", completed: true, icon: "🛒" },
  { id: 2, name: "Коллекционер", description: "Соберите 50 карт", completed: true, icon: "📚" },
  { id: 3, name: "Торговец", description: "Продайте 10 карт", completed: false, icon: "💰" },
  { id: 4, name: "Обменщик", description: "Обменяйте 5 карт", completed: false, icon: "🔄" },
  { id: 5, name: "Счастливчик", description: "Выиграйте в рулетке", completed: true, icon: "🎰" },
  { id: 6, name: "Игрок", description: "Сыграйте 100 игр", completed: false, icon: "🎮" },
];

export const RatingPage = () => {
  const [selectedTab, setSelectedTab] = useState("weekly");
  
  const userPosition = 15;
  const userPoints = 2350;

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="card-f1-glow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Рейтинг</h2>
            <p className="text-muted-foreground">Лидеры недели</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Ваша позиция</div>
            <div className="text-lg font-bold text-primary">#{userPosition}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <span className="font-bold">{userPoints} очков</span>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +6 за неделю
          </Badge>
        </div>
      </div>

      {/* Weekly Rewards */}
      <div className="card-f1">
        <h3 className="text-lg font-bold mb-4">Награды за неделю</h3>
        <div className="space-y-3">
          {weeklyRewards.map((reward) => (
            <div key={reward.place} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${reward.color} flex items-center justify-center text-sm font-bold`}>
                  {reward.place}
                </div>
                <span className="font-medium">{reward.place} место</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{reward.icon}</span>
                <span className="text-sm font-medium">{reward.reward}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-card">
          <TabsTrigger value="weekly">Лидеры недели</TabsTrigger>
          <TabsTrigger value="achievements">Достижения</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-4 mt-6">
          <div className="space-y-2">
            {weeklyLeaders.map((leader, index) => (
              <div 
                key={leader.id}
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  index < 3 
                    ? 'bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20' 
                    : 'bg-card border border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index === 1 ? 'bg-gray-400 text-white' :
                    index === 2 ? 'bg-orange-500 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index < 3 ? (index + 1) : leader.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{leader.name}</div>
                    <div className="text-xs text-muted-foreground">{leader.points} очков</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-bold">#{index + 1}</div>
                  <div className={`text-xs ${
                    leader.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {leader.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 gap-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  achievement.completed 
                    ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
                    : 'bg-card border-border'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  achievement.completed ? 'bg-green-500' : 'bg-muted'
                }`}>
                  {achievement.completed ? '✅' : achievement.icon}
                </div>
                
                <div className="flex-1">
                  <div className={`font-bold text-sm ${
                    achievement.completed ? 'text-green-700 dark:text-green-300' : 'text-foreground'
                  }`}>
                    {achievement.name}
                  </div>
                  <div className={`text-xs ${
                    achievement.completed ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                  }`}>
                    {achievement.description}
                  </div>
                </div>
                
                {achievement.completed && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Получено
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};