import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { DbModule } from 'src/db/db.module';
import {RentRepository} from "./repositories/rent.repository";
@Module({
  imports: [DbModule],
  controllers: [RentController],
  providers: [RentService,RentRepository],
})
export class RentModule {}
