import {
  DATABASE_HOST,
  DATABASE_PORT,
  // DATABASE_USERNAME,
  // DATABASE_PASSWORD,
  // DATABASE_NAME,
  DATABASE_SYNCHRONIZE,
  DATABASE_LOGGING,
} from '../../common/constants/database.constants';

import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class PostgresService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      username: 'postgres',
      password: 'root',
      database: 'todo',
      entities: [__dirname + '/../../common/entities/*.entity{.ts,.js}'],
      synchronize: DATABASE_SYNCHRONIZE,
      logging: DATABASE_LOGGING,
      migrations: ['dist/database/migrations/*{.ts,.js}'],
      migrationsRun: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
