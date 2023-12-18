import { Module } from '@nestjs/common';
import { AromasService } from './aromas.service';
import { AromasController } from './aromas.controller';

@Module({
  providers: [AromasService],
  exports: [AromasService],
  controllers: [AromasController],
})
export class AromasModule {}
