import { Pool } from 'pg';
import { Module } from '@nestjs/common';
import { PG_CONNECTION } from '../utils/constants';
import * as pg from 'pg';
const { Pool } = pg;

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'backend',
    password: 'root',
    port: 5432,
  }),
};

@Module({
  imports: [],
  exports: [dbProvider],
  providers: [dbProvider],
})
export class DbModule {}
