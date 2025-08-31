import { Request, Response, NextFunction } from 'express';

export const cacheHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Для статических ресурсов (изображения)
  if (req.path.includes('/images/') || req.path.includes('/media/')) {
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 часа
    res.setHeader('CDN-Cache-Control', 'public, max-age=31536000'); // Год для CDN
  }
  
  // Для API данных
  else if (req.path.includes('/api/')) {
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 час
    res.setHeader('Vary', 'Accept-Encoding'); // Учитывать сжатие
  }

  next();
};