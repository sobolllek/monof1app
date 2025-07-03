import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InfoButton from './InfoButton';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  showSettings?: boolean;
  infoTitle?: string;
  infoDescription?: string;
  customRightElement?: React.ReactNode; 
}

const PageHeader = ({
  title,
  showBack = false,
  showSettings = false,
  infoTitle,
  infoDescription,
  customRightElement, 
}: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header
      className="flex items-center justify-between 
               pt-18 pb-6 px-6
               bg-gradient-to-b from-black via-black/70 to-black/0
               sticky top-0 z-40 text-white font-sf"
    >  
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-2xl font-bold ml-2">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {customRightElement ? (
          customRightElement 
        ) : (
          <>
            {infoTitle && infoDescription && (
              <InfoButton title={infoTitle} description={infoDescription} />
            )}
            {showSettings && (
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Settings size={25} />
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
