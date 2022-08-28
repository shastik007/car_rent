import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { DbModule } from 'src/db/db.module';
import {CarRepository} from "./repositories/car.repository";

@Module({
  imports: [DbModule],
  controllers: [CarController],
  providers: [CarService,CarRepository],
})
export class CarModule {}
