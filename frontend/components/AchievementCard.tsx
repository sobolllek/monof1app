
import { Check, X } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
  reward: {
    type: 'coins' | 'stars' | 'pack';
    amount: number;
  };
}

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  return (
    <div className="flex items-center justify-between p-3 f1-card">
      <div className="flex-1">
        <span className={`text-sm ${achievement.completed ? 'text-white' : 'text-gray-500'}`}>
          {achievement.title}
        </span>
        <div className="text-xs text-gray-400 mt-1">
          {achievement.description}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">
            {achievement.progress}/{achievement.maxProgress}
          </span>
        </div>
      </div>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
        achievement.completed ? 'bg-green-500' : 'bg-gray-600'
      }`}>
        {achievement.completed ? <Check size={14} /> : <X size={14} />}
      </div>
    </div>
  );
};

export default AchievementCard;
