import { PG_CONNECTION } from './../utils/constants';
import { Injectable, Inject } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { RentRepository } from "./repositories/rent.repository";
import { AvilableCheckDto } from "./dto/avilableCheck.dto";


@Injectable()
export class RentService {
  constructor(private readonly rentRepository:RentRepository) {}
  async create(createRentDto: CreateRentDto) {
    const { rows } = await this.isAvialabelCar({
      start_date:createRentDto.start_date,
      end_date:createRentDto.end_date,
      car_id:createRentDto.car_id
    })
    if (rows.length === 0){
      return await this.rentRepository.create(createRentDto)
    }
    return 'this period is not avialabel!'
  }

  async findAll() {
    return await this.rentRepository.findAll();
  }

  async findOne(id: number) {
    return await this.rentRepository.findOne(id);
  }

  update(id: number, updateRentDto: UpdateRentDto) {
    return `This action updates a #${id} rent`;
  }

  async isAvialabelCar(checkDto:AvilableCheckDto){
    return await this.rentRepository.isAvialabelCar(checkDto)
  }
}
