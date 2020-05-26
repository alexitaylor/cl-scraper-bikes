import chalk from 'chalk';
import { Connection, createConnection, getRepository } from 'typeorm';
import {databaseConfigs} from './db';

export class SeedData {
  connection: Connection;
  log = console.log;

  constructor() {}

  async createConnection() {
    try {
      this.log(chalk.green('🏃‍CONNECTING TO DATABASE...'));
      this.connection =  await createConnection({ ...databaseConfigs });
    }
    catch (error) {
      this.handleError(error, 'Unable to connect to database');
    }
  }

  /**
   * Seed data
   */
  async run() {

    try {
      // Connect to database
      await this.createConnection();

      // Reset database to start with new, fresh data
      await this.resetDatabase();

      // Seed data with mock / fake data
      await this.seedData();

      process.exit(0);
    }
    catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Populate database with mock data
   */
  async seedData() {
    try {
      this.log(chalk.green(`🌱 SEEDING DATABASE...`));

      this.log(chalk.green(`✅ SEEDED DATABASE`));
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Retrieve entities metadata
   */
  async getEntities() {
    const entities: any[] = [];
    try {
      (await (await this.connection).entityMetadatas).forEach(
        entity => entities.push({name: entity.name, tableName: entity.tableName})
      );
      return entities;
    } catch(error) {
      this.handleError(error, 'Unable to retrieve database metadata');
    }
  };

  /**
   * Cleans all the entities
   * Removes all data from database
   */
  async cleanAll(entities: any) {
    try {
      for (const entity of entities) {
        const repository = await this.connection.getRepository(entity.name);
        await repository.query(`TRUNCATE TABLE "public"."${entity.tableName}" CASCADE;`);
      }
    } catch (error) {
      this.handleError(error, 'Unable to clean database');
    }
  };

  /**
   * Reset the database, truncate all tables (remove all data)
   */
  async resetDatabase() {
    const entities = await this.getEntities();
    await this.cleanAll(entities);
    //await loadAll(entities);
  };

  private handleError(error: Error, message?: string): void {
    this.log(chalk.bgRed(`🛑 ERROR: ${!!message ? message : 'Unable to seed database'}`));
    throw new Error(`🛑  ${error}`);
    process.exit(1);
  }
}
