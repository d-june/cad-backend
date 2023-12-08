import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [MailerModule.forRoot({
    transport: {
        host: 'smtp.gmail.com',
        auth: {
            user: 'katrin.dudina.kat@gmail.com',
            pass: 'gzex nsax uutn iddx'
        }
    }
})],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}

