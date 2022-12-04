import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__filename, '../input.txt'), 'utf8')
const lines = file.split('\n');

let count = 0;

lines.forEach((line) => {
    const sections = line.replace(/-/g, ',').split(',').map(x => parseInt(x));
    const bStartsBeforeAEnds = sections[2] <= sections[1];
    const aStartsBeforeBEnds = sections[0] <= sections[3];
    if (bStartsBeforeAEnds && aStartsBeforeBEnds) {
        ++count;
    }
});

console.log(count);