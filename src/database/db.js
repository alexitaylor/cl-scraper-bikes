export const databaseConfigs = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: '',
    password: '',
    database: 'cl_scraper'
};
export const PG_CONFIG = {
    host: 'localhost',
    port: 5432,
    database: 'cl_scraper',
    user: '',
    password: '',
};
// geoListCalifornia.forEach((urlOrigin) => {
//   scrapeCraigslist(urlOrigin)
// });
// create a new client instance
// const pool = new Pool({
//   host: '127.0.0.1',
//   port: 5432,
//   database: 'cl_scraper',
//   user: '',
//   password: '',
// });
// connect to PostgreSQL database
// dbClient
//   .connect()
//   .then(() => console.log('connected to database'))
//   .catch(err => console.error('connection error', err.stack));
// const fetchPostingPage = {
//   // give the query a unique name
//   name: 'fetch-posting-page',
//   text: 'SELECT * FROM bike_postings WHERE page_url = $1',
//   values: ['url']
// };
//
// ;(async () => {
//   const { rows } = await pool.query(fetchPostingPage);
//   console.log('rows', rows);
//
//   console.log('calling end');
//   await pool.end();
//   console.log('pool has drained');
// })().catch(err =>
//   setImmediate(() => {
//     throw err
//   })
// )
//
// const query = {
//   // give the query a unique name
//   name: 'fetch-all-postings',
//   text: 'SELECT * FROM bike_postings'
// };
//
// ;(async () => {
//   const { rows } = await pool.query(query);
//   console.log('rows', rows);
//
//   console.log('calling end');
//   await pool.end();
//   console.log('pool has drained');
// })().catch(err =>
//   setImmediate(() => {
//     throw err
//   })
// )
// dbClient
//   .query(query)
//   .then(result => console.log(result))
//   .catch(e => console.error(e.stack))
//   .then(() => dbClient.end());
//# sourceMappingURL=db.js.map