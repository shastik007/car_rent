import { PG_CONNECTION } from './../utils/constants';
import { Injectable, Inject } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}
  async create(createCarDto: CreateCarDto) {
    return this.conn.query(
      `INSTERT INTO car(car_name,car_number) VALUES ($1,$2)
      }) RETURNING * `,
      [createCarDto.car_name, createCarDto.car_number],
    );
  }

  findAll() {
    return `This action returns all car`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }
}
