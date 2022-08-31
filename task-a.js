const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let firstLine = true;

rl.on('line', (x) => {
    if (!firstLine) { // IGNORING FIRST LINE
        let oddOrEven = 'odd';
        if (x % 2 === 0) {
            oddOrEven = 'even'
        }
        console.log(`${x} is ${oddOrEven}`);
    }
    firstLine = false;
});