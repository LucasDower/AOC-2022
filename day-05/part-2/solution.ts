import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__filename, '../input.txt'), 'utf8')
const lines = file.split('\n');

let lineNo = 0;
const crates = new Array<Array<string>>();

while (true) {
    const line = lines[lineNo];
    if (line === '') {
        break;
    }

    for (let colNo = 1; colNo < line.length; colNo += 4) {
        const crateLabel = line[colNo];
        const crateColumn = (colNo - 1) / 4;

        if (crateLabel !== ' ' && Number.isNaN(parseInt(crateLabel))) {
            if (crates[crateColumn] === undefined) {
                crates[crateColumn] = [crateLabel];
            } else {
                crates[crateColumn].unshift(crateLabel);
            }
        }
    }

    ++lineNo;
}

for (lineNo += 1; lineNo < lines.length; ++lineNo) {
    const parts = lines[lineNo].split(' ');
    const numToMove = parseInt(parts[1]);
    const colFrom = parseInt(parts[3]) - 1;
    const colTo = parseInt(parts[5]) - 1;

    const fromCrate = crates[colFrom];
    const substack = fromCrate.slice(fromCrate.length - numToMove, fromCrate.length);

    fromCrate.splice(fromCrate.length - numToMove, numToMove);
    crates[colTo].push(...substack);
}

console.log(crates.map(crate => crate[crate.length - 1]).join(''));