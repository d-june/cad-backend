import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [MailerModule.forRoot({
    transport: {
        host: 'smtp.gmail.com',
        auth: {
            user: 'cadhome.shop@gmail.com',
            pass: 'mtvn tqhe mkbw efsa'
        }
    }
})],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}

