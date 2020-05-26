import {extractPotentialLeads, getUrlGeoLocation} from '../utils';

describe('utils: extractPotentialLeads', () => {
  test.each([
    ['bike for sale', false],
    ['Vintage Gary fisher mountain bike', false],
    ['Santa Cruz Hightower', true],
    ['sale High Tower', true],
    ['Trek 930, 21-speed mountain bike.', false],
    ['mountain bike', true],
    ['bike for sale | MTB', true],
    ['Large TREK Pro Caliber 9.9 SL 29 Carbon XC XTR Pro Race MTB~5\'11""-6\'2"', false],
    ['sale bike ELECTRIC 2019', false]
  ])('should extract leads that match keywords and doesnt include non-keywords', (title, expected) => {
    // Act
    const result = extractPotentialLeads(title);

    // Assert
    expect(result).toBe(expected);
  });
});

describe('utils: getUrlGeoLocation', () => {
  test.each([
    ['https://bend.craigslist.org', 'bend'],
    ['https://eastoregon.craigslist.org', 'eastoregon'],
    ['https://oregoncoast.craigslist.org', 'oregoncoast'],
    ['https://reno.craigslist.org', 'reno'],
    ['https://mendocino.craigslist.org', 'mendocino'],
    ['https://losangeles.craigslist.org', 'losangeles']
  ])('should get the geo location name from craigslist url', (url, expected) => {
    // Act
    const result = getUrlGeoLocation(url);

    // Assert
    expect(result).toEqual(expected);
  });
});
