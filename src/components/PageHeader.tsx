
import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InfoButton from './InfoButton';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  showSettings?: boolean;
  infoTitle?: string;
  infoDescription?: string;
}

const PageHeader = ({ 
  title, 
  showBack = false, 
  showSettings = false,
  infoTitle,
  infoDescription
}: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 bg-f1-dark/90 backdrop-blur-lg border-b border-f1-gray-light/20 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-f1-gray-light/50 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        {infoTitle && infoDescription && (
          <InfoButton title={infoTitle} description={infoDescription} />
        )}
        {showSettings && (
          <button className="p-2 rounded-lg hover:bg-f1-gray-light/50 transition-colors">
            <Settings size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
