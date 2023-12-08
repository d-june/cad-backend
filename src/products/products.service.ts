import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import {  Product, Role } from '@prisma/client';
import { Observable, from, switchMap } from 'rxjs';
import { JwtPayload } from '@auth/interfaces';
import { MailerService } from '@nestjs-modules/mailer/dist';


@Injectable()
export class ProductsService {

    constructor(private readonly prismaService: PrismaService, private readonly mailerService: MailerService){}

        sendMail(query): void {
          this.mailerService.sendMail({
            to: 'cadhome.shop@gmail.com',
            from: 'cadhome.shop@gmail.com',
            subject: 'Новый заказ',
            text: 'welcome',
            html: `<div>Имя покупателя <b>${query.name}</b>.</div> <div>Телефон: <b>${query.phone}</b>.</div> <div>Email: <b>${query.email}</b>.</div> <div>Способ получения: <b>${query.delivery}</b>.</div>${query.delivery === 'доставка' ? `<div>Адрес: <b>${query.address}</b>.</div>` : ''} <div>Состав заказа: ${query.text}</div> <div>Сумма заказа: <b>${query.totalPrice} руб.</b></div>`
          })
        }


        // product: Partial<Product>
        async save(product: any) {
      
          const savedProduct = await this.prismaService.product.create({
            data: {
                title: product.title,
                slug: product.slug,
                description: product.description,
                volume: product.volume,
                price: product.price,
                color: product.color,
                weight: product.weight,
                height: product.height,
                width: product.width,
                depth: product.depth,
                burningTime: product.burningTime,
                aromas: {
                  create: product.aromas
                }
                ,
                generalGroup: product.generalGroup,
                specifiedGroup: product.specifiedGroup,
                top: product.top
            }
          })
          const aromas = await this.prismaService.aroma.findMany({where: {productId: savedProduct.id}})
            return {...savedProduct, aromas: aromas};
        }
        
       async findAll(){
        let products = await this.prismaService.product.findMany()

        const productsWidthAroma = await Promise.all(products.map( async (product: any) => {
          const res = await this.prismaService.aroma.findMany({where: {productId: product.id}})
          return {...product, aromas: res}
        }))

        return productsWidthAroma
        

            return this.prismaService.product.findMany({
                skip: 0,
                take: 20,
              })
        }


        async findOne(slug: string){
              const product = await  this.prismaService.product.findFirst({
                  where: {
                      OR: [{slug: slug}]
                  }
              })
              if(!product) {
                  return null
              }
              const aromas = await this.prismaService.aroma.findMany({where: {productId: product.id}})
              return {...product, aromas: aromas};
          }
  

      
  

        async addImage(id: string, filename: string) {
          
          const product = await this.prismaService.product.findFirst({
            where: {
                OR: [{id: id}]
            }
        })
          return from(this.prismaService.product.update({
            where: {
              id: id,
            },
            data: {
             images: [...product.images, filename]
            },
          }))
        }

        async deleteImage(id: string,  filename: string) {
          
          const product = await this.prismaService.product.findFirst({
            where: {
                OR: [{id: id}]
            }
        })
          return from(this.prismaService.product.update({
            where: {
              id: id,
            },
            data: {
             images: product.images.filter(image => image !== filename)
            },
          }))
        }

        // product: Partial<Product>
        async updateBody(product: any) {
          return from(this.prismaService.product.update({
            where: {
              id: product.id,
            },
            data: {
              title: product.title,
              slug: product.slug,
              description: product.description,
              volume: product.volume,
              price: product.price,
              color: product.color,
              weight: product.weight,
              height: product.height,
              width: product.width,
              depth: product.depth,
              burningTime: product.burningTime,
              generalGroup: product.generalGroup,
              specifiedGroup: product.specifiedGroup,
              top: product.top
            },
          }))
        }

        async deleteAromaById (id:string) {
          return this.prismaService.aroma.delete({where: {id: Number(id)}})
        }

        async updateAromaById (id, aroma) {
          return this.prismaService.aroma.update({where: {id: Number(id)}, data: {
            name: aroma.name,
            count: aroma.count
          }})
        }

        async createAromaByProductId (productId, aroma) {
          return this.prismaService.aroma.create({
            data: {
                name: aroma.name,
                count: aroma.count,
                productId: productId
            }
          })
        }


        async delete(id: string, user: JwtPayload){
          if(!user.roles.includes(Role.ADMIN)){
              throw new ForbiddenException()
          }

          return this.prismaService.product.delete({where: {id}, select: {id: true}})
      }
      
}
