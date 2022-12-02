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
            score += 0; // Need to lose;
            switch (opponentMove) {
                case 'A':
                    score += 3; // Need to choose scissors
                    break;
                case 'B':
                    score += 1; // Need to choose rock
                    break;
                case 'C':
                    score += 2; // Need to choose paper
                    break;
            }
            break;
        case 'Y':
            score += 3; // Need to draw;
            switch (opponentMove) {
                case 'A':
                    score += 1; // Need to choose rock
                    break;
                case 'B':
                    score += 2; // Need to choose paper
                    break;
                case 'C':
                    score += 3; // Need to choose scissors
                    break;
            }
            break;
        case 'Z':
            score += 6; // Need to win;
            switch (opponentMove) {
                case 'A':
                    score += 2; // Need to choose paper
                    break;
                case 'B':
                    score += 3; // Need to choose scissors
                    break;
                case 'C':
                    score += 1; // Need to choose rock
                    break;
            }
            break;
    }
}
console.log(score);