import fs, { Dir } from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__filename, '../input.txt'), 'utf8');
const lines = file.split('\n');

type File = { type: 'file', name: string, size: number };
type Directory = { type: 'dir', name: string, contents: Array<File | Directory>, parent?: Directory };

const rootDirectory: Directory = { type: 'dir', name: '/', contents: [] };
let workingDirectory = rootDirectory;

for (const line of lines) {
    const parts = line.split(' ');

    const isCommand = parts[0] === '$';
    if (isCommand) {
        switch (parts[1]) {
            case 'cd':
                if (parts[2] === '/') {
                    workingDirectory = rootDirectory;
                }
                else if (parts[2] === '..') {
                    if (workingDirectory.parent === undefined) {
                        throw 'bad: no parent';
                    }
                    workingDirectory = workingDirectory.parent;
                } else {
                    const dirIndex = workingDirectory.contents.findIndex((item) => { return item.type === 'dir' && item.name === parts[2] });
                    if (dirIndex === -1) {
                        throw `Cannot find '${parts[2]}' in ${workingDirectory.name}: ${workingDirectory.contents}`;
                    }
                    workingDirectory = workingDirectory.contents[dirIndex] as Directory; // Will be a Directory
                }
                break;
            case 'ls':
                break;
        }
    } else {
        // Should be receiving data from previous 'ls' call
        if (parts[0] === 'dir') {
            workingDirectory.contents.push({ type: 'dir', name: parts[1], contents: [], parent: workingDirectory });
        } else {
            // Add new file to the current directory
            workingDirectory.contents.push({ type: 'file', name: parts[1], size: parseInt(parts[0]) });
        }
    }
}


const directorySizes = new Map<string, number>();

function getDirectoryPath(dir: Directory): string {
    if (dir.parent === undefined) {
        return '~';
    } else {
        return getDirectoryPath(dir.parent) + '/' + dir.name;
    }
}

function getDirectorySize(dir: Directory): number {
    let size = 0;
    dir.contents.forEach((item) => {
        if (item.type === 'dir') {
            size += getDirectorySize(item);
        } else {
            size += item.size;
        }
    });

    directorySizes.set(getDirectoryPath(dir), size);
    return size;
};

getDirectorySize(rootDirectory);

const usedSpace = directorySizes.get('~')!;
const unusedSpace = 70000000 - usedSpace;
const spaceNeeded = 30000000 - unusedSpace;
console.log('Used', usedSpace);
console.log('Unused', unusedSpace);
console.log('Space needed', spaceNeeded);

for (const k of Array.from(directorySizes.entries()).sort((a, b) => a[1] - b[1])) {
    if (k[1] >= spaceNeeded) {
        console.log(k);
        break;
    }
}