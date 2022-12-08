import fs, { Dir } from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__filename, '../input.txt'), 'utf8');
const lines = file.split('\n');

const rows = lines.length;
const cols = lines[0].length;

const visibleTrees = new Set<string>();

for (let row = 0; row < rows; ++row) {
    let height = -1;
    // Left to right
    for (let col = 0; col < cols; ++col) {
        const treeHeight = parseInt(lines[row][col]);
        if (treeHeight > height) {
            visibleTrees.add(`${row},${col}`);
            height = treeHeight;
        }
    }

    // Right to left
    height = -1;
    for (let col = cols - 1; col >= 0; --col) {
        const treeHeight = parseInt(lines[row][col]);
        if (treeHeight > height) {
            visibleTrees.add(`${row},${col}`);
            height = treeHeight;
        }
    }
}

for (let col = 0; col < cols; ++col) {
    let height = -1;
    // Top to bottom
    for (let row = 0; row < rows; ++row) {
        const treeHeight = parseInt(lines[row][col]);
        if (treeHeight > height) {
            visibleTrees.add(`${row},${col}`);
            height = treeHeight;
        }
    }

    // Right to left
    height = -1;
    for (let row = rows - 1; row >= 0; --row) {
        const treeHeight = parseInt(lines[row][col]);
        if (treeHeight > height) {
            visibleTrees.add(`${row},${col}`);
            height = treeHeight;
        }
    }
}

console.log(visibleTrees.size);