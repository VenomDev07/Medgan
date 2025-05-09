import { Injectable } from '@nestjs/common';
import {cloudinary} from './cloudinary,config' 

@Injectable()
export class CloudinaryService {
    async uploadFile(filePath: string): Promise<any> {
        try {
          const result = await cloudinary.uploader.upload(filePath, {
            folder: 'my-media', // Optional: Specify folder name in Cloudinary
            resource_type: 'auto', // Automatically detect the file type (image, video, audio, etc.)
          });
          return result; // Contains details like URL, ID, etc.
        } catch (error) {
          throw new Error(`File upload failed: ${error.message}`);
        }
    }
}
