import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__filename, '../input.txt'), 'utf8');

let fileLines = file.split('\n');
fileLines.push('');

let currentMaxSum = 0;
let currentSum = 0;
fileLines.forEach((valueStr) => {
    if (valueStr === '') {
        currentMaxSum = Math.max(currentSum, currentMaxSum);
        currentSum = 0;
    } else {
        currentSum += parseInt(valueStr);
    }
});
console.log(currentMaxSum);