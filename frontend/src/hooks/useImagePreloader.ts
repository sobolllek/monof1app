import { useEffect, useCallback } from 'react';

interface PreloadOptions {
  priority?: boolean;
  maxConcurrent?: number;
}

export const useImagePreloader = () => {
  const preloadImages = useCallback((
    urls: string[], 
    options: PreloadOptions = {}
  ): Promise<void[]> => {
    const { priority = false, maxConcurrent = 6 } = options;
    
    const loadImage = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
        
        if (priority) {
          img.fetchPriority = 'high';
        }
      });
    };

    // Ограничиваем количество одновременных загрузок
    const batches: string[][] = [];
    for (let i = 0; i < urls.length; i += maxConcurrent) {
      batches.push(urls.slice(i, i + maxConcurrent));
    }

    const promises = batches.reduce(async (prevBatch, currentBatch) => {
      await prevBatch;
      return Promise.allSettled(currentBatch.map(loadImage));
    }, Promise.resolve([] as any));

    return promises as Promise<void[]>;
  }, []);

  const preloadCriticalImages = useCallback((urls: string[]) => {
    return preloadImages(urls, { priority: true, maxConcurrent: 3 });
  }, [preloadImages]);

  const preloadBackgroundImages = useCallback((urls: string[]) => {
    return preloadImages(urls, { priority: false, maxConcurrent: 2 });
  }, [preloadImages]);

  return {
    preloadImages,
    preloadCriticalImages,
    preloadBackgroundImages,
  };
};