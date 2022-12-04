import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__filename, '../input.txt'), 'utf8')
const lines = file.split('\n');

let count = 0;

lines.forEach((line) => {
    const sections = line.replace(/-/g, ',').split(',').map(x => parseInt(x));
    const aContainsB = sections[0] <= sections[2] && sections[1] >= sections[3];
    const bContainsA = sections[2] <= sections[0] && sections[3] >= sections[1];
    if (aContainsB || bContainsA) {
        ++count;
    }
});

console.log(count);