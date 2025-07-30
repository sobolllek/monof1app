export const achievementCategories = ['Teams', 'Drivers', 'Circuits', 'Records'] as const;

export type AchievementCategory = (typeof achievementCategories)[number];

export interface Achievement {
  title: string;
  completed: boolean;
}

export const achievements: Record<AchievementCategory, Achievement[]> = {
  Teams: [
    { title: "Скорость? Мы здесь для продаж энергетиков!", completed: true },
    { title: "Стратегия? Наша секретная разработка!", completed: true },
    { title: "Дива? Нет, просто королева!", completed: true },
    { title: "Папайя? Это уже пройденный этап!", completed: false },
    { title: "Инвестиции и зеленая краска. А что дальше?", completed: false },
    { title: "Синий трактор? Скорее французский болид!", completed: false },
    { title: "Мерседес? У нас есть спидометр!", completed: false },
  ],
  Drivers: [
    { title: "Король скорости Макс Ферстаппен", completed: true },
    { title: "Легенда Льюис Хэмилтон", completed: false },
    { title: "Восходящая звезда Шарль Леклер", completed: true },
    { title: "Мастер дождя Ландо Норрис", completed: false },
  ],
  Circuits: [
    { title: "Покоритель Монако", completed: true },
    { title: "Мастер Сильверстоуна", completed: false },
    { title: "Храм скорости Монца", completed: false },
    { title: "Легенда Спа-Франкоршам", completed: true },
  ],
  Records: [
    { title: "100 побед в коллекции", completed: false },
    { title: "Собрано 50 редких карт", completed: true },
    { title: "Месяц без пропусков", completed: false },
    { title: "Первый обмен", completed: true },
  ],
};
