import { PG_CONNECTION } from './../utils/constants';
import { Injectable, Inject } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { CarRepository } from "./repositories/car.repository";

@Injectable()
export class CarService {
  constructor(private readonly carRepository:CarRepository) {}
  async create(createCarDto: CreateCarDto) {
    return await this.carRepository.create(createCarDto)
  }
  async findAll() {
    const {rows} = await this.carRepository.findAll()
    return rows
  }

  async findOne(id: number) {
    const { rows } = await this.carRepository.findOne(id)
    return rows[0]
  }

  async getCarRaiting(car_id:string,start_date:string){
    console.log(car_id)
    return await this.carRepository.getCarRaiting(car_id,start_date)
  }
}
