const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numOfLines = 1;
let n;
let m;
let ruler;

let people = {};

let temp = -1; // setting this to zero in case there's just one claimant who's not actually related to the ruler
let willInherit;

//TESTING

rl.on('line', (line) => {
    if (numOfLines === 1) {
        const numbers = line.split(' ');
        n = parseInt(numbers[0]);
        m = parseInt(numbers[1]);
    } else if (numOfLines === 2) {
        ruler = line;
        people[ruler] = {
            name: ruler,
            royalBlood: 1
        }
    } else if (numOfLines <= n + 2) {
        //if we're looking at the family relation lines, do this
        let lineArray = line.split(' ')
        let child = lineArray[0];
        let parent1 = lineArray[1];
        let parent2 = lineArray[2];
        
        let royalBlood = 0;
        
        if (people[parent1]) royalBlood += people[parent1].royalBlood / 2;
        if (people[parent2]) royalBlood += people[parent2].royalBlood / 2;
        
        //if parent1 does not yet exist in the object, we should create a file for them
        if (!people[parent1]) {
            people[parent1] = {
                name: parent1,
                parent1: 'unknown',
                parent2: 'unknown',
                royalBlood: 0,
                claimant: false
            }
        }
        
        //if parent2 does not yet exist in the object, we should create a file for them
        if (!people[parent2]) {
            people[parent2] = {
                name: parent2,
                parent1: 'unknown',
                parent2: 'unknown',
                royalBlood: 0,
                claimant: false
            }
        }
        
        //saving the child's data to an object so that we can come back to it if we receive additional information
        //one extra check is needed to see if the child already has a file
        if (people[child]) { //if the child already exists in the data, they just get updated with their parent data
            people[child].parent1 = parent1.toString(),
            people[child].parent2 = parent2.toString(),
            people[child].royalBlood = royalBlood
        } else { // if they don't exist in the data, we create a new object
            people[child] = {
                name: child.toString(),
                parent1: parent1.toString(),
                parent2: parent2.toString(),
                royalBlood: royalBlood,
                claimant: false
            };
        }
        
    } else if (numOfLines <= m + 2 + n) {
        //if we're looking at the claimants, do this
        //find whoever has the highest amount of royal blood AND is also a claimant to the throne
        let claimant = line.toString();
        
        if (!people[claimant]) {
            people[claimant] = {
                name: claimant.toString(),
                claimant: true,
                royalBlood: 0 // if we don't know anything about the claimant's parents, we assume they have no royal blood
                //however, we should actually check if we know anything... 
            }
        }
        people[claimant].claimant = true;
        
        if (people[claimant].royalBlood > temp) {
            temp = people[claimant].royalBlood;
            willInherit = claimant;
        }
        
        if (numOfLines === m + 2 + n) {
            //if we're on the last line
            console.log(willInherit);
            return 0;
        }
    }
    
    numOfLines++;
});