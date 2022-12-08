import fs, { Dir } from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__filename, '../input.txt'), 'utf8');
const lines = file.split('\n');

const rows = lines.length;
const cols = lines[0].length;

let highestScore = 0;

for (let row = 1; row < rows - 1; ++row) {
    for (let col = 1; col < cols - 1; ++col) {
        const treeHeight = parseInt(lines[row][col]);
        let right = 0;
        for (let x = col + 1; x < cols; ++x) {
            ++right;
            if (parseInt(lines[row][x]) >= treeHeight) {
                break;
            }
        }

        let left = 0;
        for (let x = col - 1; x >= 0; --x) {
            ++left;
            if (parseInt(lines[row][x]) >= treeHeight) {
                break;
            }
        }

        let up = 0;
        for (let y = row - 1; y >= 0; --y) {
            ++up;
            if (parseInt(lines[y][col]) >= treeHeight) {
                break;
            }
        }

        let down = 0;
        for (let y = row + 1; y < rows; ++y) {
            ++down;
            if (parseInt(lines[y][col]) >= treeHeight) {
                break;
            }
        }

        const score = up * down * left * right;
        highestScore = Math.max(score, highestScore);
    }
}

console.log(highestScore);