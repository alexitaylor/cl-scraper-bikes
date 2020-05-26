import chalk from 'chalk';
import path from 'path';
import format from 'date-fns/format';
import Papa from 'papaparse';
import fs from 'fs';
import { KEYWORDS, NONKEYWORDS } from './meta-data';
export const extractPotentialLeads = (title) => {
    return KEYWORDS.reduce((flag, keyword) => flag || (title.toLowerCase().includes(keyword.toLowerCase())), false) &&
        !NONKEYWORDS.reduce((flag, nowKeyword) => flag || (title.toLowerCase().includes(nowKeyword.toLowerCase())), false);
};
export const writeToFile = (data) => {
    try {
        console.log(chalk.green('🖋 Writing data to CSV file....'));
        const dataDir = path.resolve(__dirname, '..', 'data/');
        const fileName = `data_${format(new Date(), 'yyyy-MM-dd_HH:mm:ss.SSS')}.csv`;
        const csvData = Papa.unparse(data);
        fs.writeFileSync(`${dataDir}/${fileName}`, csvData);
    }
    catch (e) {
        console.error('❌ Error. Failed to write data to file.');
    }
};
export const getUrlGeoLocation = (url) => url.split('https://')[1].split('.')[0];
//# sourceMappingURL=utils.js.map