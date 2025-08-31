import CardCarousel from "../components/CardCarousel";
import { useCards } from "../hooks/useCards";

export function CardsPage() {
  const { cards, loading, error } = useCards();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return <CardCarousel cards={cards} onCardClick={(card) => console.log(card)} />;
}