import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import {  Product, Role } from '@prisma/client';
import { Observable, from, switchMap } from 'rxjs';
import { JwtPayload } from '@auth/interfaces';
import { MailerService } from '@nestjs-modules/mailer/dist';


@Injectable()
export class AromasService {

    constructor(private readonly prismaService: PrismaService){}

    
        async createAroma(aroma: any) {
      
          const savedAroma = await this.prismaService.aromas.create({
            data: {
                name: aroma.name.toLowerCase().trim(),
                description: aroma.description,
                top: aroma.top,
                middle: aroma.middle,
                base: aroma.base,
                image: ''
            }
          })

            return savedAroma;
        }
        
       async findAll(){
        let aromas = await this.prismaService.aromas.findMany()
        return aromas
        }


        async findOne(name: string){
              const aroma = await  this.prismaService.aromas.findFirst({
                  where: {
                      OR: [{name: name}]
                  }
              })
              if(!aroma) {
                  return null
              }

              return aroma;
          }
  
          async addImage(id: number, filename: string) {
            return from(this.prismaService.aromas.update({
              where: {
                id: id,
              },
              data: {
               image: filename
              },
            }))
          }


        async updateAroma(aroma: any) {
          return from(this.prismaService.aromas.update({
            where: {
              id: aroma.id,
            },
            data: {
              name: aroma.name.toLowerCase().trim(),
                description: aroma.description,
                top: aroma.top,
                middle: aroma.middle,
                base: aroma.base
            },
          }))
        }

        async deleteAromaById (id:string) {
          return this.prismaService.aromas.delete({where: {id: Number(id)}})
        }    

}
