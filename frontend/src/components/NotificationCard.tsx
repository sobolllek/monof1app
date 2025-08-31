
import { ChevronRight } from 'lucide-react';

interface NotificationCardProps {
  title: string;
  description: string;
  time: string;
  type: 'pack' | 'achievement' | 'roulette' | 'update';
}

const NotificationCard = ({ title, description, time, type }: NotificationCardProps) => {
  const getIconColor = () => {
    switch (type) {
      case 'pack':
        return 'bg-f1-red';
      case 'achievement':
        return 'bg-green-500';
      case 'roulette':
        return 'bg-f1-orange';
      case 'update':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="f1-card p-4 flex items-center gap-4">
      <div className={`w-3 h-3 rounded-full ${getIconColor()}`}></div>
      <div className={`w-12 h-12 rounded-full ${getIconColor()}`}></div>
      <div className="flex-1">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">{time}</span>
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </div>
  );
};

export default NotificationCard;
