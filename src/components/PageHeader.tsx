import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InfoButton from './InfoButton';

interface PageHeaderProps {
  title?: string;
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
                 pt-28 pb-6 px-6
                 bg-gradient-to-b from-black via-black to-black/0
                 sticky top-0 z-40 text-white font-sf"
    >  
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Назад"
          >
            <svg 
              width="8" 
              height="13" 
              viewBox="0 0 8 13" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="block"
            >
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M7.75335 0.223977C8.08222 0.522613 8.08222 1.0068 7.75335 1.30543L2.03302 6.5L7.75335 11.6946C8.08222 11.9932 8.08222 12.4774 7.75335 12.776C7.42449 13.0747 6.8913 13.0747 6.56244 12.776L0.246647 7.04073C-0.0822163 6.74209 -0.0822163 6.25791 0.246647 5.95927L6.56244 0.223977C6.8913 -0.0746591 7.42449 -0.0746591 7.75335 0.223977Z" 
                fill="white" 
              />
            </svg>
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
