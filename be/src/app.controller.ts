import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './DTO/create-user.dto';
import axios from 'axios';
import * as FormData from 'form-data';
import * as contentDisposition from 'content-disposition';
import * as mime from 'mime-types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  @UseInterceptors(AnyFilesInterceptor()) 
  login(@Body() data:CreateUserDto ){
    return this.appService.login(data);
  }

  @Post('signIn')
  @UseInterceptors(AnyFilesInterceptor()) 
  create_User(@Body() data:CreateUserDto ){
    return this.appService.create_User(data);
  }

  @Post('enhance/upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  async uploadImage( @Body() data: any, @UploadedFiles() files: { image: Express.Multer.File[] },) {
    let image = files.image[0];
    image['originalname'] = 'image.png'
    // Create form data to send to FastAPI
    const form = new FormData();
    form.append('image_file', image.buffer, {
      filename: image.originalname,
      contentType: image.mimetype,
    });

    try {
      const response = await axios.post('http://localhost:8000/generate', form, {
        headers: form.getHeaders(),
        responseType: 'arraybuffer',
      });

      const buffer = Buffer.from(response.data);

      // Parse filename from FastAPI response
      const disposition = response.headers['content-disposition'];
      const parsed = contentDisposition.parse(disposition);
      const originalname = parsed.parameters.filename || 'enhanced.png';

      // Get mime type based on filename extension
      const extension = originalname.split('.').pop();
      const guessedMime = mime.lookup(extension) || 'application/octet-stream';

      // Construct a fake file object
      const enhancedFile: Express.Multer.File = {
        buffer,
        originalname,
        mimetype: guessedMime,
        fieldname: 'image',
        size: buffer.length,
        encoding: '7bit',
        stream: null as any,
        destination: '',
        filename: '',
        path: '',
      };

      return await this.appService.uploadImage(data, enhancedFile);
    } catch (error) {
      console.error('Upload to FastAPI failed:', error.message);
      throw error;
    }
  }

  @Post('fetchEnhancedImg')
  @UseInterceptors(AnyFilesInterceptor()) 
  async fetchEnhancedImg(@Body() data:any ){
    return await this.appService.fetchEnhancedImg(data)
  }
}
