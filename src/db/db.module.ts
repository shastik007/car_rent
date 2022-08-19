import { Module } from '@nestjs/common';
import {PG_CONNECTION} from "../utils/constants";
import { Pool } from 'pg';


const dbProvider = {
    provide: PG_CONNECTION,
    useValue: new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'root',
        port: 5432,
    }),
};



@Module({
    imports:[],
    exports:[dbProvider],
    providers:[dbProvider]
})
export class DbModule {}
