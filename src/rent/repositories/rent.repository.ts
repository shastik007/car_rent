import { CreateRentDto } from './../dto/create-rent.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './../../utils/constants';
import { UpdateRentDto } from '../dto/update-rent.dto';
import { AvilableCheckDto } from '../dto/avilableCheck.dto';
import { sumAllDayPrice } from '../../utils/helpers';
import * as moment from 'moment';

@Injectable()
export class RentRepository {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}
  async create(createRentDto: CreateRentDto) {
    try {
      const { car_id, start_date, end_date } = createRentDto;
      const { rows } = await this.conn.query(
        `SELECT * FROM car WHERE id = $1`,
        [car_id],
      );
      const start_moment = moment(start_date, 'YYYY-MM-DD');
      const end_moment = moment(end_date, 'YYYY-MM-DD');
      const diference = moment.duration(start_moment.diff(end_moment)).asDays();
      const cost = sumAllDayPrice(rows[0].price, diference);
      return await this.conn.query(
        'INSERT INTO rent(start_date,end_date,car_id,cost) VALUES ($1,$2,$3,$4)   RETURNING *',
        [start_moment, end_moment, car_id, cost],
      );
    } catch (e) {
      return JSON.stringify(e);
    }
  }

  async findAll() {
    const response = await this.conn.query('SELECT * FROM rent');
    return response.rows;
  }

  async findOne(id: number) {
    const answer = await this.conn.query(
      `SELECT * FROM rent WHERE car_id = $1`,
      [id],
    );
   return answer.rows
  }

  update(id: number, updateRentDto: UpdateRentDto) {
    return `This action updates a #${id} rent`;
  }

  async isAvialabelCar(dto: AvilableCheckDto) {
    const { start_date, end_date, car_id } = dto;
    const start_moment = moment(start_date, 'YYYY-MM-DD')
      .subtract(3, 'days')
      .format('YYYY-MM-DD');
    const end_moment = moment(end_date, 'YYYY-MM-DD')
      .add(3, 'days')
      .format('YYYY-MM-DD');
    return await this.conn.query(
      `SELECT * FROM "rent" WHERE $1 < end_date AND $2 > start_date AND car_id = $3`,
      [start_moment, end_moment, car_id],
    );
  }
}
