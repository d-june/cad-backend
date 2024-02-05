import {  IsInt, IsNumber, IsString } from "class-validator";

export class ProductDto {
    @IsString()
    id: string;
    @IsString()
    title: string;
    
    images: string[];
    @IsString()
    description: string;
    @IsNumber()
    volume: number;
    @IsNumber()
    price: number;
    aromas: string;
    @IsString()
    group: string;
    top: boolean
}

