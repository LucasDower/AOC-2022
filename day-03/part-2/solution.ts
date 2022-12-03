import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__filename, '../input.txt'), 'utf8')
const lines = file.split('\n');

let priorityScore = 0;

for (let i = 0; i < lines.length; i += 3) {
    const items = new Map<string, number>();

    for (let j = 0; j < 3; ++j) {
        const bag = lines[i + j];

        for (const item of Array.from(new Set(bag))) {
            const numThisItem = items.get(item);
            if (numThisItem === undefined) {
                items.set(item, 1);
            } else {
                items.set(item, numThisItem + 1);
            }
        }

    }

    const badge = Array.from(items).sort((a, b) => b[1] - a[1])[0][0];

    const charCode = badge.charCodeAt(0);
    const score = charCode - (charCode < 97 ? 38 : 96);
    priorityScore += score;
}

console.log(priorityScore);