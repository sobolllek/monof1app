// Утилиты для оптимизации изображений

// Проверяем поддержку WebP
let webpSupported: boolean | null = null;

export const checkWebPSupport = (): Promise<boolean> => {
  if (webpSupported !== null) {
    return Promise.resolve(webpSupported);
  }

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      webpSupported = false;
      resolve(false);
      return;
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 1, 1);
    
    canvas.toBlob((blob) => {
      webpSupported = blob?.type === 'image/webp';
      resolve(webpSupported || false);
    }, 'image/webp');
  });
};

// Получаем оптимальный формат изображения
export const getOptimalImageUrl = async (originalUrl: string): Promise<string> => {
  // Если изображение уже в формате WebP, возвращаем как есть
  if (originalUrl.includes('.webp')) {
    return originalUrl;
  }

  const supportsWebP = await checkWebPSupport();
  
  if (supportsWebP) {
    // Пытаемся заменить расширение на .webp
    const webpUrl = originalUrl.replace(/\.(jpg|jpeg|png)$/, '.webp');
    
    // Проверяем, существует ли WebP версия
    try {
      const response = await fetch(webpUrl, { method: 'HEAD' });
      if (response.ok) {
        return webpUrl;
      }
    } catch {
      // Игнорируем ошибки и возвращаем оригинал
    }
  }

  return originalUrl;
};

// Создаем responsive srcSet для изображений
export const createSrcSet = (baseUrl: string, sizes: number[] = [320, 640, 1024, 1280]): string => {
  return sizes
    .map(size => {
      const url = baseUrl.replace(/(\.[^.]+)$/, `_${size}w$1`);
      return `${url} ${size}w`;
    })
    .join(', ');
};

// Получаем оптимальный размер изображения для экрана
export const getOptimalImageSize = (maxWidth: number, maxHeight: number): { width: number; height: number } => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const scaleFactor = Math.min(devicePixelRatio, 2); // Ограничиваем максимальным масштабом 2x

  return {
    width: Math.ceil(maxWidth * scaleFactor),
    height: Math.ceil(maxHeight * scaleFactor),
  };
};

// Кэш для проверки существования изображений
const imageExistsCache = new Map<string, boolean>();

export const checkImageExists = async (url: string): Promise<boolean> => {
  if (imageExistsCache.has(url)) {
    return imageExistsCache.get(url)!;
  }

  try {
    const response = await fetch(url, { method: 'HEAD' });
    const exists = response.ok;
    imageExistsCache.set(url, exists);
    return exists;
  } catch {
    imageExistsCache.set(url, false);
    return false;
  }
};

// Compress изображение на клиенте (для загружаемых пользователем изображений)
export const compressImage = (
  file: File, 
  maxWidth: number = 1024, 
  maxHeight: number = 1024, 
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    img.onload = () => {
      // Вычисляем новые размеры с сохранением пропорций
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // Рисуем изображение с новыми размерами
      ctx.drawImage(img, 0, 0, width, height);

      // Конвертируем в blob с сжатием
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};