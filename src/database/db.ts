import {ConnectionOptions} from 'typeorm';
import {BikePostingsEntity} from '../bikePostings.entity';

export const databaseConfigs: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: '',
  password: '',
  database: 'cl_scraper',
  synchronize: true,
  dropSchema: false,
  logging: true,
  entities: [BikePostingsEntity]
};
