import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import isAfter from 'date-fns/isAfter';
import ora from 'ora';
import chalk from 'chalk';
import {extractPotentialLeads, writeToFile} from './utils';
import {IPotentialLeads} from './models';
import {createConnection, getConnection} from 'typeorm';
import {geoListCalifornia} from './meta-data';
import {databaseConfigs} from './database/db';
import {BikePostingsEntity} from './bikePostings.entity';
import 'reflect-metadata';

async function scrapeCraigslist(urlOrigin: string) {
  console.log(chalk.green('🚀 Start scraping....'));
  const browser = await puppeteer.launch({ headless: false });
  // const urlOrigin = 'https://sfbay.craigslist.org';
  const pathName = '/d/bicycles/search/bia';
  const startDate = new Date('04/04/2020');

  const spinner = ora({
    text: `${chalk.blue('Scraping in progress...')}`,
    spinner: 'shark'
  });

  try {
    // Start browser
    const page = await browser.newPage();
    await page.goto(`${urlOrigin}${pathName}`);

    let content = await page.content();

    let $ = await cheerio.load(content);
    let paginatorButtonGroup = $('.paginator');
    // @ts-ignore
    let isLastPage: boolean = paginatorButtonGroup.attr('class').includes('lastpage');

    async function nextPage() {
      const nextPagePathName = $(paginatorButtonGroup).find('a[class~=next]').attr('href');
      await page.goto(`${urlOrigin}${nextPagePathName}`);
      content = await page.content();
      $ = await cheerio.load(content);
      paginatorButtonGroup = $('.paginator');
      // @ts-ignore
      isLastPage = paginatorButtonGroup.attr('class').includes('lastpage');
    }

    const potentialLeads: IPotentialLeads[] = [];

    while(!isLastPage) {
      spinner.start();
      $('.rows .result-row').each((idx, el$) => {
        const listingPage = $(el$).find('a').attr('href') as string;
        const listingTitle = $(el$).find('.result-info').find('a[class~=result-title]').text().trim();
        const dateTime: string = $(el$).find('time').attr('datetime') as string;

        if (isAfter(new Date(dateTime), startDate) && extractPotentialLeads(listingTitle)) {
          potentialLeads.push({
            listingTitle,
            listingPage,
            dateTime,
          });
        }
      });

      await nextPage();
    }

    // await navigatePages();

    spinner.stop();

    writeToFile(potentialLeads);

  } catch (e) {
    console.error(`❌ Error. Scraping failed`, e);
  } finally {
    if (browser !== null) {
      browser.close();
    }
    console.log(chalk.green('✅ Scraping finished!'));
  }
}

// class BikePostingsService {
//   constructor() {
//     await createConnection()
//   }
//
//   async findUniquePosting(pageUrl: string) {
//     await getConnection()
//       .createQueryBuilder()
//       .select('bikePostings')
//       .from(BikePostingsEntity, 'bikePostings')
//       .where('bikePostings.pageUrl = :pageUrl', { pageUrl });
//   }
// }

(async function main () {
  // createConnection method will automatically read connection options
  // from your ormconfig file or environment variables
  await createConnection();
  const user = await getConnection()
    .createQueryBuilder()
    .select('bikePostings')
    .from(BikePostingsEntity, 'bikePostings')
    .getCount();

  console.log(user);
  process.exit(0);
})();
