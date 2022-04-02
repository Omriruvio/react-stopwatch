// takes a string such as '1hr20min' or '1 hour 20 min 30seconds'
// returns an array with separate time types and values:

// below solution is not optimal, would be better to:
//  join the string into a single piece and parse by slicing between numbers
export default function parseToNumbersAndWords(str) {
  return new Promise((resolve, reject) => {
    const result = [];
    str = str.split(' ');
    while (str.length > 0) {
      if (!Number.isNaN(Number(str[0]))) {
        //if array item is integer shift and push
        result.push(str.shift());
      } else if (!Number.isNaN(Number(str[0][0]))) {
        // if first character is integer remove it and push then get the word, remove it and push
        let num = parseInt(str[0], 10);
        let length = String(num).length;
        let slice = str[0].slice(0, length);
        str[0] = str[0].slice(length);
        result.push(slice);

        // result.push(str.shift()); // unneccesary?

        // number is removed now remove the word
        const firstDigit = str[0].match(/\d/);
        const firstDigitIndex = str[0].indexOf(firstDigit);
        if (firstDigitIndex === -1) {
          result.push(str.shift());
          continue;
        }

        let stringSlice = str[0].slice(0, firstDigitIndex);
        str[0] = str[0].slice(firstDigitIndex);
        result.push(stringSlice);
      } else {
        // if the array item starts with a word, get the word, remove and push it
        const firstDigit = str[0].match(/\d/); // Gives the first digit in the string
        const firstDigitIndex = str[0].indexOf(firstDigit);
        if (firstDigitIndex === -1) {
          result.push(str.shift());
          continue;
        }
        if (Array.isArray(str)) {
          result.push(str[0].splice(0, firstDigitIndex - 1));
        } else {
          result.push(
            str
              .split('')
              .splice(0, firstDigitIndex - 1)
              .join('')
          );
        }
      }
    }
    resolve(result);
  });
}

// tests:
// parseToNumbersAndWords('1hr20min').then(value => console.log(value)); // ['1', 'hr', '20', 'min']
// parseToNumbersAndWords('1 hour 20 min 30seconds').then(value => console.log(value)); // ['1', 'hour', '20', 'min', '30', 'seconds']
// parseToNumbersAndWords('1hr20min').then(value => console.log(value)); // ['1', 'hr', '20', 'min']
// parseToNumbersAndWords('1hr20mins 30s').then(value => console.log(value)); // ['1', 'hr', '20', 'mins', '30', 's']
// parseToNumbersAndWords('1h20m90s').then(value => console.log(value)); // ['1', 'h', '20', 'm', '90', 's']
// parseToNumbersAndWords('0h2m40s').then(value => console.log(value)); // ['0', 'h', '2', 'm', '40', 's']
// parseToNumbersAndWords('0h0m0s').then(value => console.log(value)); // ['0', 'h', '0', 'm', '0', 's']
// parseToNumbersAndWords('25h0m0s').then(value => console.log(value)); // ['25', 'h', '0', 'm', '0', 's']
// parseToNumbersAndWords('1h').then(value => console.log(value)); // ['1', 'h']
// parseToNumbersAndWords('1 hour 20 min 30seconds').then(value => console.log(value)); // ['1', 'hour', '20', 'min', '30', 'seconds']
// parseToNumbersAndWords('1hr20min').then(value => console.log(value))
// parseToNumbersAndWords('min5').then(value => console.log(value)).catch(err => console.log('Invalid input'))
