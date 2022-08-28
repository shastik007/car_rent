import {Inject, Injectable} from "@nestjs/common";
import {PG_CONNECTION} from "../../utils/constants";
import {CreateCarDto} from "../dto/create-car.dto";
import * as moment from "moment";

@Injectable()
export class CarRepository {
    constructor(@Inject(PG_CONNECTION) private conn: any) {}
    async create(createCarDto: CreateCarDto) {
        return await this.conn.query(
            `INSERT INTO car(name,license_plate,price) VALUES ($1,$2,$3)
      RETURNING * `,
            [createCarDto.name, createCarDto.license_plate,createCarDto.price],
        );
    }
    async findAll() {
        return await this.conn.query(`SELECT name , license_plate, price FROM car`);
    }

    async findOne(id: number) {
        return await this.conn.query(`SELECT * FROM car WHERE id = $1`, [id]);
    }

    async getCarRaiting(car_id:string,start_date:string){
        const { rows:car_rents } = await this.conn.query(`SELECT * FROM rent WHERE car_id = $1 `,[car_id])
        const start_moment = moment(new Date(start_date))
        const day_in_month = start_moment.daysInMonth()
        let total_days = 0
        const current_month = start_moment.month() + 1
        for (const carRent of car_rents) {
            const start_rent = moment(carRent.start_date)
            const end_rent = moment(carRent.end_date)
            if (current_month == start_rent.month() + 1 && end_rent.month() + 1 > current_month){
                const days_in_date = Number(start_rent.format('YYYY-MM-DD').split('-')[2])
                total_days += day_in_month - days_in_date
            }
            if (current_month == start_rent.month() + 1 && end_rent.month() + 1 == current_month){
                const diff = start_rent.diff(end_rent,'days')
                total_days += Math.abs(diff) > 0 ? Math.abs(diff) : 1
            }
        }
        return (total_days * 100) / day_in_month + '%'
    }
}
