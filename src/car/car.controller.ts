import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Get('/raiting/:car_number/:start_date')
  getCarRaiting(@Param('car_number') car_id:string,@Param('start_date')start_date:string){
    return this.carService.getCarRaiting(car_id,start_date)
  }

}
