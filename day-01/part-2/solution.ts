import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__filename, '../input.txt'), 'utf8');

let fileLines = file.split('\n');
fileLines.push('');

let currentMaxSums = [0, 0, 0];
let currentSum = 0;
fileLines.forEach((valueStr) => {
    if (valueStr === '') {
        currentMaxSums.push(currentSum);
        currentMaxSums = currentMaxSums.sort((a, b) => a - b);
        currentMaxSums.shift();
        currentSum = 0;
    } else {
        currentSum += parseInt(valueStr);
    }
});

console.log(currentMaxSums[0] + currentMaxSums[1] + currentMaxSums[2]);