import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__filename, '../input.txt'), 'utf8')
const lines = file.split('\n');

let score = 0;
for (const game of lines) {
    const opponentMove = game[0] as 'A' | 'B' | 'C';
    const myMove = game[2] as 'X' | 'Y' | 'Z';

    switch (myMove) {
        case 'X':
            score += 1; // Chose rock
            if (opponentMove === 'C') {
                score += 6; // Won against scissors
            } else if (opponentMove === 'A') {
                score += 3 // Draw with rock
            }
            break;
        case 'Y':
            score += 2; // Chose paper
            if (opponentMove === 'A') {
                score += 6; // Won against rock
            } else if (opponentMove === 'B') {
                score += 3 // Draw with paper
            }
            break;
        case 'Z':
            score += 3; // Chose scissors
            if (opponentMove === 'B') {
                score += 6; // Won against paper
            } else if (opponentMove === 'C') {
                score += 3 // Draw with scissors
            }
            break;
    }
}
console.log(score);