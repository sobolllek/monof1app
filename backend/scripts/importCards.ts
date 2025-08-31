import { prisma } from '../src/db/client';
import { cardsData } from '../src/data/cardsData';
import { UploadService } from '../src/services/uploadService';
import fs from 'fs';
import path from 'path';

async function importCards() {
  try {
    console.log('Начинаем импорт карт...');
    
    const packs = await Promise.all([
      prisma.pack.upsert({
        where: { id: 1 },
        update: { name: 'Starter Pack', description: 'Начальный пак', price: 500 },
        create: { id: 1, name: 'Starter Pack', description: 'Начальный пак', price: 500 }
      }),
      prisma.pack.upsert({
        where: { id: 2 },
        update: { name: 'Rare Pack', description: 'Редкий пак', price: 1000 },
        create: { id: 2, name: 'Rare Pack', description: 'Редкий пак', price: 1000 }
      }),
      prisma.pack.upsert({
        where: { id: 3 },
        update: { name: 'Legendary Pack', description: 'Легендарный пак', price: 2000 },
        create: { id: 3, name: 'Legendary Pack', description: 'Легендарный пак', price: 2000 }
      })
    ]);

    console.log('Паки созданы/обновлены');

    let importedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const cardData of cardsData) {
      try {
        const existingCard = await prisma.card.findUnique({
          where: { id: parseInt(cardData.id) }
        });

        if (existingCard) {
          console.log(`Карта ${cardData.id} уже существует, пропускаем...`);
          skippedCount++;
          continue;
        }

        let packId = 1;
        if (cardData.rarity === 'soft' || cardData.rarity === 'medium') {
          packId = 2;
        } else if (cardData.rarity === 'intermediate' || cardData.rarity === 'wet') {
          packId = 3;
        }

        let imageUrl = cardData.image;
        
        // Пытаемся загрузить изображение на Vercel Blob
        const localImagePath = path.join(__dirname, '../frontend/public', cardData.image);
        
        if (fs.existsSync(localImagePath)) {
          try {
            const uploadResult = await UploadService.uploadCardImage(
              localImagePath,
              parseInt(cardData.id),
              cardData.name
            );
            imageUrl = uploadResult.url;
          } catch (uploadError) {
            console.error(`Ошибка загрузки изображения для карты ${cardData.id}:`, 
              uploadError instanceof Error ? uploadError.message : 'Unknown error');
            errorCount++;
            continue; // Пропускаем карту если не удалось загрузить изображение
          }
        } else {
          console.warn(`Файл изображения не найден: ${localImagePath}, используем оригинальный URL`);
        }

        await prisma.card.create({
          data: {
            id: parseInt(cardData.id),
            name: cardData.name,
            type: cardData.type,
            team: cardData.team || null,
            description: cardData.description || '',
            imageUrl: imageUrl,
            rarity: cardData.rarity,
            packId: packId,
            isDroppable: cardData.dropInfo.isDroppable,
            dropLimit: cardData.dropInfo.dropLimit === 'infinity' ? 0 : (cardData.dropInfo.dropLimit || 100),
            year: cardData.dropInfo.year || 2024,
            isHidden: cardData.isHidden || false
          }
        });

        console.log(`Импортирована карта: ${cardData.name} (ID: ${cardData.id})`);
        importedCount++;

      } catch (error) {
        console.error(`Ошибка при импорте карты ${cardData.id}:`, 
          error instanceof Error ? error.message : 'Unknown error');
        errorCount++;
      }
    }

    console.log(`Импорт завершен! Добавлено: ${importedCount}, Пропущено: ${skippedCount}, Ошибок: ${errorCount}`);
    
  } catch (error) {
    console.error('Ошибка импорта:', error instanceof Error ? error.message : 'Unknown error');
  } finally {
    await prisma.$disconnect();
  }
}

// Запуск с обработкой ошибок
importCards().catch((error) => {
  console.error('Unhandled error in import:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
});