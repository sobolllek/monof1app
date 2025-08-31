import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Star, 
  Trophy, 
  Coins, 
  Calendar, 
  Settings, 
  Bell, 
  Moon, 
  Sun,
  Smartphone,
  Volume2,
  VolumeX
} from "lucide-react";

const userStats = [
  { label: "Карт в коллекции", value: "67/120", icon: Trophy },
  { label: "Общий рейтинг", value: "#15", icon: Star },
  { label: "Монет заработано", value: "2,450", icon: Coins },
  { label: "Дней в игре", value: "23", icon: Calendar },
];

const gameHistory = [
  { date: "Сегодня", activity: "Открыт Gold Pack", reward: "+3 карты", time: "14:30" },
  { date: "Сегодня", activity: "Рулетка", reward: "+40 монет", time: "12:15" },
  { date: "Вчера", activity: "Продажа карты", reward: "+150 монет", time: "19:45" },
  { date: "Вчера", activity: "Coin Flip", reward: "+20 монет", time: "18:20" },
  { date: "2 дня назад", activity: "Обмен карты", reward: "Charles Leclerc", time: "16:10" },
];

export const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Profile Header */}
      <div className="card-f1-glow">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white">
            МВ
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">MaxVerstappen_33</h2>
            <p className="text-muted-foreground">Участник с декабря 2024</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">Уровень 12</Badge>
              <Badge variant="outline" className="text-xs text-primary">2,350 очков</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-full">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-muted/30 rounded-xl p-3 text-center">
                <Icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-sm font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 mt-6">
          {/* Recent Achievements */}
          <div className="card-f1">
            <h3 className="text-lg font-bold mb-4">Последние достижения</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-lg">
                  🏆
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-green-700 dark:text-green-300">Коллекционер</div>
                  <div className="text-xs text-green-600 dark:text-green-400">Собрано 50 карт</div>
                </div>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Новое!
                </Badge>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg">
                  🎰
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-blue-700 dark:text-blue-300">Счастливчик</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">Выиграли в рулетке</div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Level Progress */}
          <div className="card-f1">
            <h3 className="text-lg font-bold mb-4">Прогресс уровня</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Уровень 12</span>
                <span className="text-muted-foreground">2,350 / 2,500 очков</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                  style={{ width: "94%" }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                До следующего уровня: 150 очков
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-6">
          <div className="space-y-3">
            {gameHistory.map((item, index) => (
              <div key={index} className="card-f1 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-bold">{item.activity}</div>
                  <div className="text-xs text-muted-foreground">{item.time}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">{item.date}</div>
                  <div className="text-sm font-medium text-primary">{item.reward}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 mt-6">
          <div className="space-y-4">
            {/* Appearance */}
            <div className="card-f1">
              <h3 className="text-lg font-bold mb-4">Внешний вид</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    <div>
                      <div className="text-sm font-medium">Тёмная тема</div>
                      <div className="text-xs text-muted-foreground">Переключить на тёмный режим</div>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="card-f1">
              <h3 className="text-lg font-bold mb-4">Уведомления</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5" />
                    <div>
                      <div className="text-sm font-medium">Push-уведомления</div>
                      <div className="text-xs text-muted-foreground">Получать уведомления о новых картах</div>
                    </div>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {sounds ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    <div>
                      <div className="text-sm font-medium">Звуки</div>
                      <div className="text-xs text-muted-foreground">Звуковые эффекты в играх</div>
                    </div>
                  </div>
                  <Switch checked={sounds} onCheckedChange={setSounds} />
                </div>
              </div>
            </div>

            {/* App Info */}
            <div className="card-f1">
              <h3 className="text-lg font-bold mb-4">О приложении</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Версия</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Последнее обновление</span>
                  <span>15.12.2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Размер</span>
                  <span>12.5 МБ</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};