import { __awaiter } from "tslib";
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import isAfter from 'date-fns/isAfter';
import ora from 'ora';
import chalk from 'chalk';
import { extractPotentialLeads, writeToFile } from './utils';
import { createConnection } from 'typeorm';
function scrapeCraigslist(urlOrigin) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.green('🚀 Start scraping....'));
        const browser = yield puppeteer.launch({ headless: false });
        // const urlOrigin = 'https://sfbay.craigslist.org';
        const pathName = '/d/bicycles/search/bia';
        const startDate = new Date('04/04/2020');
        const spinner = ora({
            text: `${chalk.blue('Scraping in progress...')}`,
            spinner: 'shark'
        });
        try {
            // Start browser
            const page = yield browser.newPage();
            yield page.goto(`${urlOrigin}${pathName}`);
            let content = yield page.content();
            let $ = yield cheerio.load(content);
            let paginatorButtonGroup = $('.paginator');
            // @ts-ignore
            let isLastPage = paginatorButtonGroup.attr('class').includes('lastpage');
            function nextPage() {
                return __awaiter(this, void 0, void 0, function* () {
                    const nextPagePathName = $(paginatorButtonGroup).find('a[class~=next]').attr('href');
                    yield page.goto(`${urlOrigin}${nextPagePathName}`);
                    content = yield page.content();
                    $ = yield cheerio.load(content);
                    paginatorButtonGroup = $('.paginator');
                    // @ts-ignore
                    isLastPage = paginatorButtonGroup.attr('class').includes('lastpage');
                });
            }
            const potentialLeads = [];
            while (!isLastPage) {
                spinner.start();
                $('.rows .result-row').each((idx, el$) => {
                    const listingPage = $(el$).find('a').attr('href');
                    const listingTitle = $(el$).find('.result-info').find('a[class~=result-title]').text().trim();
                    const dateTime = $(el$).find('time').attr('datetime');
                    if (isAfter(new Date(dateTime), startDate) && extractPotentialLeads(listingTitle)) {
                        potentialLeads.push({
                            listingTitle,
                            listingPage,
                            dateTime,
                        });
                    }
                });
                yield nextPage();
            }
            // await navigatePages();
            spinner.stop();
            writeToFile(potentialLeads);
        }
        catch (e) {
            console.error(`❌ Error. Scraping failed`, e);
        }
        finally {
            if (browser !== null) {
                browser.close();
            }
            console.log(chalk.green('✅ Scraping finished!'));
        }
    });
}
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // createConnection method will automatically read connection options
        // from your ormconfig file or environment variables
        const connection = yield createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: '',
            password: '',
            database: 'cl_scraper'
        });
    });
})();
//# sourceMappingURL=index.js.map