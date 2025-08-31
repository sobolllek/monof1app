import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { prisma } from '../src/db/client';
import bot from './bot/bot';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

// API Routes
app.get('/cards', async (req: express.Request, res: express.Response) => {
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

app.get('/cards/:id', async (req: express.Request, res: express.Response) => {
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

app.get('/cards-stats', async (req: express.Request, res: express.Response) => {
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

// Telegram webhook route
app.post('/webhook', async (req: express.Request, res: express.Response) => {
  try {
    // Ваша логика webhook здесь
    console.log('Webhook received:', req.body);
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Запуск бота
console.log('=== STARTING BOT ===');
console.log('TELEGRAM_BOT_TOKEN exists:', !!process.env.TELEGRAM_BOT_TOKEN);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

bot.launch()
  .then(() => {
    console.log('Bot started successfully!');
  })
  .catch((error) => {
    console.error('Failed to start bot:', error);
  });

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export for Vercel
export default app;
