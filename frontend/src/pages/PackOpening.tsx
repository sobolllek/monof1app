
import { useNavigate, useParams } from 'react-router-dom';
import PackOpeningAnimation from '../components/PackOpeningAnimation';

const PackOpening = () => {
  const { packType } = useParams();
  const navigate = useNavigate();

  const handlePackOpened = (cards: any[]) => {
    console.log('Получены карты:', cards);
    // Здесь можно добавить логику обработки полученных карт
  };

  const handleClose = () => {
    navigate('/market'); // Возвращаемся в маркет после открытия
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <PackOpeningAnimation
        isOpen={true}
        onClose={handleClose}
        packType={packType || 'BASE'}
        onPackOpened={handlePackOpened}
      />
    </div>
  );
};

export default PackOpening;