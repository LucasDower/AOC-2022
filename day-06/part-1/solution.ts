import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__filename, '../input.txt'), 'utf8')

let i = 0;
for (; i < file.length - 4; ++i) {
    const seq = file.substring(i, i + 4)
    const allUnique = (new Set(seq.split(''))).size === 4;
    if (allUnique) {
        break;
    }
}

console.log(i + 4);