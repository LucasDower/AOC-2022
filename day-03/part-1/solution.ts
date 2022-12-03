import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__filename, '../input.txt'), 'utf8')
const lines = file.split('\n');

let priorityScore = 0;

for (const line of lines) {
    const left = line.substring(0, line.length / 2);
    const right = line.substring(line.length / 2, line.length);

    const leftSet = new Set(left.split(''));
    const rightSet = new Set(right.split(''));

    leftSet.forEach((item) => {
        if (rightSet.has(item)) {
            const charCode = item.charCodeAt(0);
            const score = charCode - (charCode < 97 ? 38 : 96);
            priorityScore += score;
        }
    })
}

console.log(priorityScore);