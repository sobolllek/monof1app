import NodeCache from 'node-cache';

class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ 
      stdTTL: 86400, // 24 часа по умолчанию
      checkperiod: 600 // Проверка каждые 10 минут
    });
  }

  set(key: string, value: any, ttl?: number): boolean {
    return ttl ? this.cache.set(key, value, ttl) : this.cache.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  del(key: string): number {
    return this.cache.del(key);
  }

  // Специальные методы для изображений
  setImage(imageId: string, imageBuffer: Buffer, ttl: number = 86400): boolean {
    return this.set(`image_${imageId}`, imageBuffer, ttl);
  }

  getImage(imageId: string): Buffer | undefined {
    return this.get<Buffer>(`image_${imageId}`);
  }

  // Для данных карточек
  setCardsData(key: string, data: any, ttl: number = 3600): boolean {
    return this.set(`cards_${key}`, data, ttl);
  }

  getCardsData<T>(key: string): T | undefined {
    return this.get<T>(`cards_${key}`);
  }
}

export const cacheService = new CacheService();
