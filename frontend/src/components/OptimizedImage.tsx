import { useState, useRef, useEffect, memo } from 'react';
import { getOptimalImageUrl, getOptimalImageSize } from '../utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallbackIcon?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
  quality?: number;
}

// Кэш для изображений
const imageCache = new Map<string, HTMLImageElement>();
const loadingImages = new Set<string>();

const OptimizedImage = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fallbackIcon,
  onLoad,
  onError,
  style,
  quality = 80,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Функция для добавления параметров сжатия к URL Vercel Blob
  const addCompressionParams = (url: string, targetWidth?: number, targetHeight?: number): string => {
    if (url.includes('vercel-storage.com')) {
      const urlObj = new URL(url);
      urlObj.searchParams.set('q', quality.toString());
      
      if (targetWidth) {
        urlObj.searchParams.set('w', targetWidth.toString());
      }
      if (targetHeight) {
        urlObj.searchParams.set('h', targetHeight.toString());
      }
      
      urlObj.searchParams.set('fit', 'cover');
      return urlObj.toString();
    }
    
    return url;
  };

  // Intersection Observer для ленивой загрузки
  useEffect(() => {
    if (priority) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  // Прелоадинг изображения с оптимизацией
  useEffect(() => {
    if (!isInView || !src) return;

    const loadOptimizedImage = async () => {
      try {
        // Получаем оптимальный URL
        let optimalSrc = await getOptimalImageUrl(src);
        
        // Добавляем параметры сжатия для Vercel Blob
        optimalSrc = addCompressionParams(optimalSrc, width, height);
        
        setOptimizedSrc(optimalSrc);
        
        // Проверяем кэш
        if (imageCache.has(optimalSrc)) {
          setIsLoaded(true);
          onLoad?.();
          return;
        }

        // Избегаем дублирования загрузки
        if (loadingImages.has(optimalSrc)) return;

        loadingImages.add(optimalSrc);

        const img = new Image();
        
        // Устанавливаем оптимальные размеры если указаны
        if (width && height) {
          const optimalSize = getOptimalImageSize(width, height);
          img.width = optimalSize.width;
          img.height = optimalSize.height;
        }

        img.onload = () => {
          imageCache.set(optimalSrc, img);
          loadingImages.delete(optimalSrc);
          setIsLoaded(true);
          onLoad?.();
        };
        
        img.onerror = async () => { // ← ДОБАВЛЕНО async ЗДЕСЬ!
          loadingImages.delete(optimalSrc);
          
          // Если оптимизированное изображение не загрузилось, пробуем оригинал без параметров сжатия
          if (optimalSrc !== src) {
            const originalOptimalSrc = await getOptimalImageUrl(src);
            setOptimizedSrc(originalOptimalSrc);
            const originalImg = new Image();
            originalImg.onload = () => {
              imageCache.set(originalOptimalSrc, originalImg);
              setIsLoaded(true);
              onLoad?.();
            };
            originalImg.onerror = () => {
              setHasError(true);
              onError?.();
            };
            originalImg.src = originalOptimalSrc;
          } else {
            setHasError(true);
            onError?.();
          }
        };

        // Начинаем загрузку оптимизированного изображения
        img.src = optimalSrc;
      } catch (error) {
        // В случае ошибки загружаем оригинал
        const img = new Image();
        img.onload = () => {
          imageCache.set(src, img);
          setIsLoaded(true);
          onLoad?.();
        };
        img.onerror = () => {
          setHasError(true);
          onError?.();
        };
        img.src = src;
      }
    };

    loadOptimizedImage();
  }, [isInView, src, onLoad, onError, width, height, quality]);

  // Скелетон загрузки
  const skeleton = (
    <div 
      className={`bg-gray-800 animate-pulse flex items-center justify-center ${className}`}
      style={{ width, height, ...style }}
    >
      <div className="w-8 h-8 bg-gray-700 rounded opacity-50" />
    </div>
  );

  // Fallback при ошибке
  const errorFallback = (
    <div 
      className={`bg-gray-900 flex items-center justify-center ${className}`}
      style={{ width, height, ...style }}
    >
      {fallbackIcon || (
        <div className="text-4xl text-gray-600">🖼️</div>
      )}
    </div>
  );

  if (hasError) {
    return errorFallback;
  }

  if (!isInView) {
    return (
      <div 
        ref={imgRef}
        className={`bg-gray-800 ${className}`}
        style={{ width, height, ...style }}
      />
    );
  }

  return (
    <>
      {!isLoaded && skeleton}
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{
          ...style,
          display: isLoaded ? 'block' : 'none',
        }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        onError={() => {
          setHasError(true);
          onError?.();
        }}
      />
    </>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;