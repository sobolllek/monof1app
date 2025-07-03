
interface StatsCardProps {
  label: string;
  value: string | number;
  className?: string;
}

const StatsCard = ({ label, value, className = '' }: StatsCardProps) => {
  return (
    <div className={`f1-card p-4 text-center ${className}`}>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
};

export default StatsCard;
