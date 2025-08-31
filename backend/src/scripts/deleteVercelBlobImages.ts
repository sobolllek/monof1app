import { del } from '@vercel/blob';
import dotenv from 'dotenv';

dotenv.config({ path: '/Users/admin/Documents/mono/monof1app/backend/.env' });

async function deleteVercelBlobImages() {
  try {
    console.log('Using BLOB_READ_WRITE_TOKEN:', process.env.BLOB_READ_WRITE_TOKEN);
    await del('cards/');
    console.log('All images in cards/ deleted from Vercel Blob');
  } catch (error) {
    console.error('Error deleting images:', error);
  }
}

deleteVercelBlobImages();