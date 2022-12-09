import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__filename, '../input.txt'), 'utf8');
const lines = file.split('\n');

const head = { x: 0, y: 0 };
const tail = { x: 0, y: 0 };

const visited = new Set<string>();
visited.add(`${tail.x},${tail.y}`);

for (const line of lines) {
    const parts = line.split(' ');
    const dir = parts[0] as 'L' | 'R' | 'U' | 'D';
    const steps = parseInt(parts[1]);

    for (let i = 0; i < steps; ++i) {
        switch (dir) {
            case 'L':
                --head.x;
                break;
            case 'R':
                ++head.x;
                break;
            case 'U':
                ++head.y;
                break;
            case 'D':
                --head.y;
                break;
        }

        const xDist = Math.abs(head.x - tail.x);
        const yDist = Math.abs(head.y - tail.y);
        const manDist = xDist + yDist;

        const moveX = xDist >= 2 || manDist >= 3;
        const moveY = yDist >= 2 || manDist >= 3;

        if (moveX) {
            tail.x += head.x > tail.x ? 1 : -1;
        }
        if (moveY) {
            tail.y += head.y > tail.y ? 1 : -1;
        }

        visited.add(`${tail.x},${tail.y}`);
    }
}

console.log(visited.size);