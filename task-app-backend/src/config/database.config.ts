import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Database configuration factory for TypeORM
 * @returns TypeORM module options for PostgreSQL
 */
export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'task_app',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});
