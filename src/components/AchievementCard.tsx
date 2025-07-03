
import { Check, X } from 'lucide-react';

interface AchievementCardProps {
  title: string;
  completed: boolean;
}

const AchievementCard = ({ title, completed }: AchievementCardProps) => {
  return (
    <div className="flex items-center justify-between p-3 f1-card">
      <span className={`text-sm ${completed ? 'text-white' : 'text-gray-500'}`}>
        {title}
      </span>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
        completed ? 'bg-green-500' : 'bg-gray-600'
      }`}>
        {completed ? <Check size={14} /> : <X size={14} />}
      </div>
    </div>
  );
};

export default AchievementCard;
