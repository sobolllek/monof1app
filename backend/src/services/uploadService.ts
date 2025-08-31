import { BlobService } from './blobService';

export class UploadService {
  static async uploadCardImage(
    imagePath: string, 
    cardId: number, 
    cardName: string
  ) {
    try {
      const fileName = `cards/${cardId}-${cardName.toLowerCase().replace(/\s+/g, '-')}.png`;
      
      const blob = await BlobService.uploadImage(imagePath, fileName, {
        access: 'public',
        addRandomSuffix: false // Для карт лучше без случайного суффикса
      });

      return {
        url: blob.url,
        downloadUrl: blob.downloadUrl,
        pathname: blob.pathname
      };
    } catch (error) {
      console.error('Card image upload error:', error);
      throw error;
    }
  }

  static getOptimizedImageUrl(blobUrl: string, width?: number, height?: number) {
    return BlobService.getOptimizedUrl(blobUrl, width, height);
  }
}