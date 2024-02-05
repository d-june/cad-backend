import { Controller, Get, Post, Body, BadRequestException, UseInterceptors, ParseUUIDPipe } from '@nestjs/common';
import { ProductDto } from './dto';
import { ProductsService } from './products.service';
import { Observable, map, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import {Delete, Param, Query, Request, Res, UploadedFile} from '@nestjs/common/decorators/http'
import { Product } from '@prisma/client';
import { CurrentUser, Public } from '@common/decorators';
import { join } from 'path/posix';
import { JwtPayload } from '@auth/interfaces';

export const storage = {
    storage: diskStorage({
        destination: './uploads/productsImages',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })

}

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService) {}

    @Public()
    @Get('send')
    sendMail(@Query() query): void {
        return this.productsService.sendMail(query);
    }

    @Public()
    @Post('new')
    async createProduct( @Body() dto: ProductDto){

        const product = await this.productsService.save(dto)
        if(!product) {
            throw new BadRequestException(`Не получается создать товар с данными ${JSON.stringify(dto)}`)
        }
        return product
    }

 
    @Public()
    @Get()
    async findAllProducts(@Query('currentPrice') currentPrice: string, @Query('aromas') aromas: string, @Query('volumes') volumes: string, @Query('colors') colors: string, @Query('forms') forms: string, @Query('orderBy') orderBy: string, @Query('currentPage') currentPage: string, @Query('take') take: string) {
        const products = await this.productsService.findAll(currentPrice, aromas, volumes, colors, forms, orderBy, currentPage, take)
        return products
    }

    @Public()
    @Get('top')
    async findTopProducts() {
        const products = await this.productsService.findTopProducts()
        return products
    }

    @Public()
    @Get(':slug')
    async findOneProduct(@Param('slug') slug: string) {
        const product = await this.productsService.findOne(slug)
        return product
    }

    @Public()
    @Post('upload/:productId')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(@UploadedFile() file, @Param('productId') id: string) {
        const productId: string = id;
        return this.productsService.addImage(productId, file.filename)
    }


    @Post('update')
    updateBody(@Body() dto: ProductDto) {
        return this.productsService.updateBody(dto)
    }

    @Public()
    @Post('update-available/:id')
    updateAvailableCount(@Param('id') id: string, @Body() data: number) {
        return this.productsService.updateAvailableCount(id, data)
    }



    @Public()
    @Get('product-image/:imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/productsImages/' + imagename)));
    }



    @Delete(':id')
    deleteProduct(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: JwtPayload) {
        return this.productsService.delete(id, user)
    }

    @Delete('images/:ProductId/:filename')
    deleteImage(@Param('ProductId') productId: string, @Param('filename') filename: string) {
        return this.productsService.deleteImage(productId, filename)
    }
}
