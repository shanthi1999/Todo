import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_SYNCHRONIZE,
  // DATABASE_LOGGING,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_USERNAME,
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
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      entities: [__dirname + '/../../common/entities/*.entity{.ts,.js}'],
      synchronize: DATABASE_SYNCHRONIZE,
      // logging: DATABASE_LOGGING,
      migrations: ['dist/database/migrations/*{.ts,.js}'],
      migrationsRun: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
