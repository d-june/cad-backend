import { Body, Controller, Put, Get, Param, Delete, BadRequestException } from '@nestjs/common';
import { AromasService } from './aromas.service';
import { UseInterceptors, Post, UploadedFile } from '@nestjs/common/decorators';
import {  Public } from '@common/decorators';

import { AromaDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { storage } from 'src/products/products.controller';



@Controller('aromas')
export class AromasController {
    constructor(private readonly aromasService: AromasService) {}

    @Public()
    @Post('new')
    async createProduct( @Body() dto: AromaDto){

        const aroma = await this.aromasService.createAroma(dto)
        if(!aroma) {
            throw new BadRequestException(`Не получается создать аромат с данными ${JSON.stringify(dto)}`)
        }
        return aroma
    }

    @Public()
    @Get()
    async findAllAromas() {
        const aromas = await this.aromasService.findAll()
        return aromas
    }

    @Public()
    @Get(':name')
    async findAromaByName(@Param('name') name: string) {
        const aromas = await this.aromasService.findOne(name)
        return aromas
    }

    @Public()
    @Post('update')
    updateAroma(@Body() dto: AromaDto) {
        return this.aromasService.updateAroma(dto)
    }

    @Public()
    @Post('upload/:aromaId')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(@UploadedFile() file, @Param('aromaId') id: number) {
        const aromaId: number = id;
        return this.aromasService.addImage(Number(aromaId), file.filename)
    }

 

    @Public()
    @Delete(':id')
    deleteAroma(@Param('id') id: string) {
        return this.aromasService.deleteAromaById(id)
    }


}
