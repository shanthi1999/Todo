import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), PostgresModule, TodoModule, AuthModule],
})
export class AppModule {}
