import multer from 'multer';

export const multerConfig = {
  storage: multer.memoryStorage(), // Use memory storage
};