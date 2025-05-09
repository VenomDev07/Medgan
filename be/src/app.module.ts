import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,PrismaService,CloudinaryService],
  exports:[PrismaService]
})
export class AppModule {}
