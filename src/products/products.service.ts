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



        async save(product: Partial<Product>) {
      
          const savedProduct = await this.prismaService.product.create({
            data: {
                title: product.title,
                slug: product.slug,
                description: product.description,
                form: product.form,
                volume: product.volume,
                price: product.price,
                color: product.color,
                weight: product.weight,
                height: product.height,
                width: product.width,
                depth: product.depth,
                burningTime: product.burningTime,
                aroma: product.aroma,
                available: product.available,
                generalGroup: product.generalGroup,
                specifiedGroup: product.specifiedGroup,
                top: product.top,
                rating: 0,
            }
          })

            return savedProduct
        }
        
       async findAll(currentPrice, aromas, volumes, colors, forms, orderBy, currentPage = '1', take = '10'){

        if(currentPrice || aromas || volumes || colors || forms) {
 
          const [count, products] = await this.prismaService.$transaction([
            this.prismaService.product.count({where: {
              price: currentPrice && {
                gte: Number(currentPrice.split(',')[0]),
                lte: Number(currentPrice.split(',')[1])
              },
              aroma: aromas && {
                in: aromas.split(',')
              },
              volume: volumes && {
                in: volumes.split(',').map(volume => {
                  return Number(volume)
                })
               
              },
              color: colors && {
                in: colors.split(',')
              },
              form: forms && {
                in: forms.split(',')
              }
              
            },}),
            this.prismaService.product.findMany({
      
            where: {
              price: currentPrice && {
                gte: Number(currentPrice.split(',')[0]),
                lte: Number(currentPrice.split(',')[1])
              },
              aroma: aromas && {
                in: aromas.split(',')
              },
              volume: volumes && {
                in: volumes.split(',').map(volume => {
                  return Number(volume)
                })
               
              },
              color: colors && {
                in: colors.split(',')
              },
              form: forms && {
                in: forms.split(',')
              }
              
            },
            orderBy: orderBy && {
              price: orderBy
            },
            
            skip: Number(currentPage) * Number(take) - Number(take),
            take: Number(take),
          }),
        ])
          return {
            totalCount: count,
            data: products
          };
        } else {
          const [count, products] = await this.prismaService.$transaction([
            this.prismaService.product.count(),
            this.prismaService.product.findMany({
              orderBy: orderBy && {
                price: orderBy
              },
              skip: Number(currentPage) * Number(take) - Number(take),
              take: Number(take),
            
            }),
          ])
          return {
            totalCount: count,
            data: products
          };
        }
        }

        async findTopProducts(){

        const topProducts = this.prismaService.product.findMany({
          where: {
            top: true
          }
        })
        
        return topProducts
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
              return product
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

        async updateBody(product: Partial<Product>) {
          return from(this.prismaService.product.update({
            where: {
              id: product.id,
            },
            data: {
              title: product.title,
              slug: product.slug,
              description: product.description,
              form: product.form,
              volume: product.volume,
              price: product.price,
              color: product.color,
              weight: product.weight,
              height: product.height,
              width: product.width,
              depth: product.depth,
              aroma: product.aroma,
              available: product.available,
              burningTime: product.burningTime,
              generalGroup: product.generalGroup,
              specifiedGroup: product.specifiedGroup,
              top: product.top
            },
          }))
        }


        async updateAvailableCount (id, data) {
          return this.prismaService.product.update(
            {where: {id: id}, data: {
              available: data.available,
     
          }})
        }


        async delete(id: string, user: JwtPayload){
          if(!user.roles.includes(Role.ADMIN)){
              throw new ForbiddenException()
          }

          return this.prismaService.product.delete({where: {id}, select: {id: true}})
      }
      
}
