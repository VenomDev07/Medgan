import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './DTO/create-user.dto';
import { v2 as cloudinary } from 'cloudinary';


@Injectable()
export class AppService {

  constructor(private prisma:PrismaService){}

  getHello(): string {
    return 'Hello World!';
  }

  async login(data: CreateUserDto) {
    try {
      const { email, password } = data;
      const userData = await this.prisma.user.findUnique({
        where: { email },
      });
    
      if (!userData) {
        throw new UnauthorizedException("User Not Found");
      }  
      const validUser = await bcrypt.compare(password, userData.password);
      
      
      if (!validUser) {
        throw new UnauthorizedException("Incorrect Password");
      }else{
        return {userData,loggedIn : validUser};
      }
    } catch (error) {
      return error
    }
    
  }

  async create_User(data:CreateUserDto){
    try {
      const {name, email, password} = data;
      let hasedpass = await bcrypt.hash(password,10)

      const duplicateEmail = await this.prisma.user.findMany({
        where:{
          email: email
        }
      })
      console.log("duplicateEmail :",duplicateEmail);
      
      if(duplicateEmail.length == 0){
        const res = await this.prisma.user.create({data : {
          name,
          email,
          password: hasedpass
        }})
        return {res,signedIn:true};
      }else{
        return({EmailExists:'Email Already Exists'})
      }
      


    } catch (error) { 
      console.error(error);
    }
  }

  async uploadImage(data: {userId: string ,name: string},file:any){
    try {
      const { userId,name } = data;
      const imageFile = file.buffer
      const user = await this.prisma.user.findMany({
        where: { id: parseInt(userId) }
      });
      if(!user){
        throw new UnauthorizedException('User not found');
      }else{
        const imageUpload = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );
          
          // Convert ArrayBuffer to Buffer before ending the stream
          const buffer = Buffer.isBuffer(imageFile.buffer) ? imageFile.buffer : Buffer.from(imageFile.buffer);
          uploadStream.end(buffer);
        });
        

           // Create image record
            const savedImage = await this.prisma.enhancedImage.create({
              data: {
                name,
                url: (imageUpload as any).secure_url,
                userId: parseInt(userId)
              }});
            
            return savedImage
      } 
    } catch (error) {
      console.error(error)
    }
  }

  async fetchEnhancedImg(data:any){
    try {
      const { userId } = data
      const user = await this.prisma.user.findMany({
        where: { id: parseInt(userId) }
      });
      if(!user){
        throw new UnauthorizedException('User not found');
      }
      else{
        const res = this.prisma.enhancedImage.findMany({
          where: {
            userId:parseInt(userId)
          }
        })
        if(res){
          console.log(res);
          return res
        }
      }
    } catch (error) {
      console.error(error)
    }  
  }
}
