import {BikePostingsEntity} from './src/bikePostings.entity';

module.exports = {
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
