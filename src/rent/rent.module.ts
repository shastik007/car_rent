import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { DbModule } from 'src/db/db.module';
@Module({
  imports: [DbModule],
  controllers: [RentController],
  providers: [RentService],
})
export class RentModule {}
