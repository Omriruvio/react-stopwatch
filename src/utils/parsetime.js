import parseToNumbersAndWords from './parseToNumbersAndWords.js';

// get array of ['-timeType-', '-value-', '-timeType-', '-value-', ...] -> return total time in seconds
// handle Number space hour / hr / h / hours / hrs / minute / minutes / min / m / mins / seconds / second / secs / s /sec ->
// in case of invalid input return false

export default function parseTime(str) {
  const timeTypes = {
    3600: ['hours', 'hour', 'h', 'hr', 'hrs'],
    60: ['minute', 'minutes', 'min', 'm', 'mins'],
    1: ['seconds', 'second', 'sec', 'secs', 's'],
  };
  return parseToNumbersAndWords(str)
    .then((arr) => {
      // returns PROMISE of array of ['1', 'hr', '20', 'mins', '30', 's'] - timeType strings vary
      if (arr.length === 1 && Number.isNaN(Number(arr[0]))) {
        throw new Error('First value must be a number.');
      } else if (arr.length === 1) {
        return arr[0];
      }
      const cache = [];
      let totalSeconds = 0;
      arr.forEach((x) => {
        let typeWasFound = false;
        if (!Number.isNaN(parseInt(x, 10))) {
          // if item is a number push to cache
          cache.push(x);
          typeWasFound = true;
        } else {
          // if item is a word, get the convertion, multiply by last element of cache and add to total
          for (const [duration, timeType] of Object.entries(timeTypes)) {
            if (timeType.includes(x)) {
              totalSeconds += Number(duration * cache[0]);
              cache.pop();
              typeWasFound = true;
            }
          }
        }
        if (!typeWasFound) {
          cache.pop();
          console.log('Warning: incorrect input detected.');
        }
      });
      return totalSeconds;
    })
    .catch((err) => {
      console.log(err);
      return new Error(`
          Invalid input...
          Valid input structure:
          1. '1hr20min'
          2. '1 hour 20 min 30seconds'
          3. '25h0m0s'
          4. '1hr20mins 30s'
        `);
    });
}

// tests:
// parseTime('').then((value) => console.log(value, false));
// parseTime('  ').then((value) => console.log(value, false));
// parseTime('1hr20min').then((value) => console.log(value, 4800));
// parseTime('1hr20mins 30s').then((value) => console.log(value, 4830));
// parseTime('1h20m90s').then((value) => console.log(value, 4890));
// parseTime('0h2m40s').then((value) => console.log(value, 160));
// parseTime('0h0m0s').then((value) => console.log(value, false));
// parseTime('25h0m0s').then((value) => console.log(value));
// parseTime('1h').then((value) => console.log(value));
// parseTime('1 hour 20 min 30seconds').then((value) => console.log(value));
// parseTime('minhr5')
//   .then((val) => console.log(val))
//   .catch((err) => console.log('Invalid input... -> ', err));
