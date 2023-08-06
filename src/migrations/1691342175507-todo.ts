import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialTodo1628096000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      // Create database if not exists
      await queryRunner.query('CREATE DATABASE IF NOT EXISTS tododb;');

      // Use the created database
      await queryRunner.query('USE tododb;');

      // Create todo table if not exists
      await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS todo (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW()
      );
    `);
    } catch (err) {
      console.log(err);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the todo table
    await queryRunner.query('DROP TABLE IF EXISTS todo;');

    // Drop the database (if desired)
    await queryRunner.query('DROP DATABASE IF EXISTS tododb;');
  }
}
