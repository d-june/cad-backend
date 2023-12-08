import {  IsNumber, IsString } from "class-validator";

export class ProductDto {
    @IsString()
    id: string;
    @IsString()
    title: string;
    
    images: string[];
    @IsString()
    description: string;
    @IsString()
    volume: string;
    @IsString()
    price: string;
    aromas: Array<{
        id: string, name: string, count: string, productId: string
    }>;
    @IsString()
    group: string;
    top: boolean
}

