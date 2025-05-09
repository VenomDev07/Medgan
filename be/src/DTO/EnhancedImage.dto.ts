import { IsNumber, IsString,  } from "class-validator";

export class EnhanceImageDto{
    @IsString()
    name : string

    @IsNumber()
    userId:number
}