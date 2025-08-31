import express from 'express';
import cors from 'cors';
import { prisma } from '../db/client';

const app = express();
app.use(cors({
  origin: true, // или конкретный домен фронтенда
  credentials: true,
}));
app.use(express.json());

app.get('/cards', async (req, res) => {
  try {
    const { category, rarity, team, page = 1, limit = 50 } = req.query;
    
    const where: any = { isHidden: false };
    
    if (category && category !== 'all') where.type = category;
    if (rarity && rarity !== 'all') where.rarity = rarity;
    if (team && team !== 'all') where.team = team;

    const cards = await prisma.card.findMany({
      where,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      include: {
        pack: {
          select: {
            name: true,
            price: true
          }
        }
      },
      orderBy: { id: 'asc' }
    });

    // Логируем данные
    console.log('Cards from DB:', cards.map(c => ({ id: c.id, imageUrl: c.imageUrl })));

    const total = await prisma.card.count({ where });

    res.json({
      cards,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Получение карты по ID
app.get('/cards/:id', async (req, res) => {
  try {
    const card = await prisma.card.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        pack: {
          select: {
            name: true,
            price: true
          }
        }
      }
    });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json(card);
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Получение статистики по картам
app.get('/cards-stats', async (req, res) => {
  try {
    const totalCards = await prisma.card.count({ where: { isHidden: false } });
    const byRarity = await prisma.card.groupBy({
      by: ['rarity'],
      where: { isHidden: false },
      _count: true
    });
    const byType = await prisma.card.groupBy({
      by: ['type'],
      where: { isHidden: false },
      _count: true
    });
    const byTeam = await prisma.card.groupBy({
      by: ['team'],
      where: { isHidden: false, team: { not: null } },
      _count: true
    });

    res.json({
      total: totalCards,
      byRarity,
      byType,
      byTeam
    });
  } catch (error) {
    console.error('Error fetching card stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default app;