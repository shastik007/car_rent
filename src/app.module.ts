import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { CarModule } from './car/car.module';
import { RentModule } from './rent/rent.module';




@Module({
  imports: [DbModule, CarModule, RentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
