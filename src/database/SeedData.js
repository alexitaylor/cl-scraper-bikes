import { __awaiter } from "tslib";
import * as chalk from 'chalk';
import { createConnection } from 'typeorm';
import { databaseConfigs } from './db';
export class SeedData {
    constructor() {
        this.log = console.log;
    }
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.log(chalk.green('🏃‍CONNECTING TO DATABASE...'));
                this.connection = yield createConnection(Object.assign({}, databaseConfigs));
            }
            catch (error) {
                this.handleError(error, 'Unable to connect to database');
            }
        });
    }
    /**
     * Seed data
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Connect to database
                yield this.createConnection();
                // Reset database to start with new, fresh data
                yield this.resetDatabase();
                // Seed data with mock / fake data
                yield this.seedData();
                process.exit(0);
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    /**
     * Populate database with mock data
     */
    seedData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.log(chalk.green(`🌱 SEEDING DATABASE...`));
                this.log(chalk.green(`✅ SEEDED DATABASE`));
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    /**
     * Retrieve entities metadata
     */
    getEntities() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = [];
            try {
                (yield (yield this.connection).entityMetadatas).forEach(entity => entities.push({ name: entity.name, tableName: entity.tableName }));
                return entities;
            }
            catch (error) {
                this.handleError(error, 'Unable to retrieve database metadata');
            }
        });
    }
    ;
    /**
     * Cleans all the entities
     * Removes all data from database
     */
    cleanAll(entities) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const entity of entities) {
                    const repository = yield this.connection.getRepository(entity.name);
                    yield repository.query(`TRUNCATE TABLE "public"."${entity.tableName}" CASCADE;`);
                }
            }
            catch (error) {
                this.handleError(error, 'Unable to clean database');
            }
        });
    }
    ;
    /**
     * Reset the database, truncate all tables (remove all data)
     */
    resetDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.getEntities();
            yield this.cleanAll(entities);
            //await loadAll(entities);
        });
    }
    ;
    handleError(error, message) {
        this.log(chalk.bgRed(`🛑 ERROR: ${!!message ? message : 'Unable to seed database'}`));
        throw new Error(`🛑  ${error}`);
        process.exit(1);
    }
}
//# sourceMappingURL=SeedData.js.map