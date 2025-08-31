import { VercelRequest, VercelResponse } from '@vercel/node';
import app from './index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return app(req as any, res as any);
}