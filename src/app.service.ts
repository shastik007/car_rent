import { Injectable,Inject } from '@nestjs/common';
import { PG_CONNECTION } from "./utils/constants";


@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private conn:any) {
  }
 async getHello(){
    return await this.conn.query("SELECT * FROM car")
  }
}
