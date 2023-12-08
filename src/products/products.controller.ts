import { Controller, Get, Post, Body, BadRequestException, UseInterceptors, ParseUUIDPipe } from '@nestjs/common';
import { ProductDto } from './dto';
import { ProductsService } from './products.service';
import { Observable, map, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import {Delete, Param, Query, Request, Res, UploadedFile} from '@nestjs/common/decorators/http'
import { Aroma, Product } from '@prisma/client';
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
    async findAllProducts() {
        const products = await this.productsService.findAll()
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

    @Post('aroma/create/:productId')
    async createAroma(@Param('productId') productId: string,  @Body() aroma: Aroma){
        return this.productsService.createAromaByProductId(productId, aroma)
    }

    @Post('aroma/update/:id')
    updateAroma(@Param('id') id: string, @Body() aroma: Aroma) {
        return this.productsService.updateAromaById(id, aroma)
    }

    @Delete('aroma/:id')
    deleteAroma(@Param('id') id: string) {
        return this.productsService.deleteAromaById(id)
    }

    @Public()
    @Get('product-image/:imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/productsImages/' + imagename)));
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: JwtPayload) {
        return this.productsService.delete(id, user)
    }

    @Delete('images/:ProductId/:filename')
    deleteImage(@Param('ProductId') productId: string, @Param('filename') filename: string) {
        return this.productsService.deleteImage(productId, filename)
    }
}
