const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let prevDataLength = 0;

rl.on('line', (line) => {
    let data = line.split('');
    let hasData = data.includes('*');
    if (hasData) {
        // if there is data on the line, the data should be sorted to the right hand side, offset with the lenght of the data on the previous line, if applicable
        // let currentDataLength = data.search('*');
        let lineSortedArray = data.sort().reverse();
        
        // pushing dots to the end of the array
        for (let i = 0; i < prevDataLength; i++) {
            lineSortedArray.push('.'); // pushing a dot to the end
            lineSortedArray.shift(); // removing a dot from the beginning
        }
        
        let count = 0;
        for (let char of lineSortedArray) {
            if (char === '*') count++;
        }
        
        prevDataLength += count;
        
        //prevDataLength = line.search(/\*/); 
        // search is the wrong approach, my bad
        //should be using reduce or something
        
        console.log(lineSortedArray.join(''));
    } else {
        // if the line has no data to begin with, just print the line
        console.log(line)
        if (line === '') prevDataLength = 0; // resetting prevDataLength if the line is blank
    }
});