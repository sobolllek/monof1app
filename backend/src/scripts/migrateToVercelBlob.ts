import { prisma } from '../src/db/client';
import { cardsData } from '../src/data/cardsData';
import fs from 'fs';
import path from 'path';
import { BlobService } from '../src/services/blobService';
import dotenv from 'dotenv';

dotenv.config({ path: '/Users/admin/Documents/mono/monof1app/backend/.env' });

async function migrateToVercelBlob() {
  try {
    console.log('Начинаем миграцию изображений на Vercel Blob...');

    let migratedCount = 0;
    let errorCount = 0;

    for (const card of cardsData) {
      try {
        const localImagePath = path.join(__dirname, '../../frontend/public', card.image);
        const fileName = `cards/${card.id}-${card.name.toLowerCase().replace(/\s+/g, '-')}.png`;
        let imageUrl;

        if (fs.existsSync(localImagePath)) {
          const blob = await BlobService.uploadImage(localImagePath, fileName, {
            access: 'public',
            addRandomSuffix: false,
          });
          imageUrl = blob.url;
        } else {
          console.warn(`Image not found: ${localImagePath}, using placeholder`);
          imageUrl = 'https://egocl7rxzcuxyjyi.public.blob.vercel-storage.com/placeholder.png'; // Замените на ваш placeholder, если нужно
        }

        await prisma.card.update({
          where: { id: parseInt(card.id) },
          data: { imageUrl },
        });

        console.log(`Мигрирована карта ${card.id}: ${imageUrl}`);
        migratedCount++;

        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Ошибка миграции карты ${card.id}:`, error);
        errorCount++;
      }
    }

    console.log(`Миграция завершена! Успешно: ${migratedCount}, Ошибок: ${errorCount}`);
  } catch (error) {
    console.error('Общая ошибка миграции:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateToVercelBlob().catch(console.error);