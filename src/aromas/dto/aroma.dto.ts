import {  IsString } from "class-validator";

export class AromaDto {
    @IsString()
    name: string;
    @IsString()
    descriprion: string;
    @IsString()
    top: string;
    @IsString()
    middle: string;
    @IsString()
    base: string;
}

