import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostgresService } from './postgres.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: PostgresService,
    }),
  ],
  providers: [PostgresService],
  exports: [PostgresService],
})
export class PostgresModule {}
