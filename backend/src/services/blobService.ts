import { put, del } from '@vercel/blob';
import fs from 'fs';
import axios from 'axios';

export class BlobService {
  static async uploadImage(
    filePath: string, 
    fileName: string, 
    options?: {
      access?: 'public';
      addRandomSuffix?: boolean;
    }
  ) {
    try {
      // Читаем файл
      const fileBuffer = fs.readFileSync(filePath);
      
      // Создаем Blob из Buffer
      const blob = new Blob([fileBuffer], { type: 'image/png' });
      
      // Загружаем в Vercel Blob
      const result = await put(fileName, blob, {
        access: 'public',
        addRandomSuffix: true,
        ...options
      });

      return result;
    } catch (error) {
      console.error('Blob upload error:', error);
      throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async uploadImageFromUrl(
    imageUrl: string, 
    fileName: string, 
    options?: {
      access?: 'public';
      addRandomSuffix?: boolean;
    }
  ) {
    try {
      // Скачиваем изображение по URL
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const arrayBuffer = response.data;
      
      // Создаем Blob из ArrayBuffer
      const blob = new Blob([arrayBuffer], { type: 'image/png' });
      
      // Загружаем в Vercel Blob
      const result = await put(fileName, blob, {
        access: 'public',
        addRandomSuffix: true,
        ...options
      });

      return result;
    } catch (error) {
      console.error('Blob upload from URL error:', error);
      throw new Error(`Failed to upload image from URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async uploadImageFromBuffer(
    buffer: Buffer,
    fileName: string,
    options?: {
      access?: 'public';
      addRandomSuffix?: boolean;
    }
  ) {
    try {
      // Конвертируем Buffer в Uint8Array для создания Blob
      const uint8Array = new Uint8Array(buffer);
      const blob = new Blob([uint8Array], { type: 'image/png' });

      const result = await put(fileName, blob, {
        access: 'public',
        addRandomSuffix: true,
        ...options
      });

      return result;
    } catch (error) {
      console.error('Blob upload from buffer error:', error);
      throw new Error(`Failed to upload image from buffer: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async deleteImage(url: string) {
    try {
      await del(url);
      return true;
    } catch (error) {
      console.error('Blob delete error:', error);
      return false;
    }
  }

  static getOptimizedUrl(blobUrl: string, width?: number, height?: number) {
    try {
      const url = new URL(blobUrl);
      
      if (width && height) {
        url.searchParams.set('w', width.toString());
        url.searchParams.set('h', height.toString());
        url.searchParams.set('fit', 'cover');
      } else if (width) {
        url.searchParams.set('w', width.toString());
      } else if (height) {
        url.searchParams.set('h', height.toString());
      }

      return url.toString();
    } catch (error) {
      console.error('Error optimizing URL:', error);
      return blobUrl;
    }
  }
}