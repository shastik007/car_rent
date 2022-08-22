import { PG_CONNECTION } from './../utils/constants';
import { Injectable, Inject } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}
  async create(createCarDto: CreateCarDto) {
    return await this.conn.query(
      `INSERT INTO car(name,license_plate) VALUES ($1,$2)
      RETURNING * `,
      [createCarDto.name, createCarDto.license_plate],
    );
  }

  async findAll() {
    return await this.conn.query(`SELECT name , license_plate FROM car`);
  }

  async findOne(id: number) {
    return await this.conn.query(`SELECT * FROM car WHERE id = $1`, [id]);
  }
}
