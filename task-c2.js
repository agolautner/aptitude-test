const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numOfLines = 1;
let n;
let m;
let ruler;

let families = [];
let claimants = [];

//function to calculate the royal blood in a person
const calculateRoyalBlood = (person) => {
    //if we don't have their name on file, we can assume they have 0 royal blood
    if (!person || person === undefined || person === null) {
        return 0;
    }
    
    //if they are the ruler, they have 100% (or in this case, 1)
    if (person === ruler) return 1;
    
    //looping over the families
    for (let f of families) {
        if (f.child === person) { // if the person is the child in this family
            //we check if their parents have royal blood with the same function
            //eventually we will hit a wall where we don't know the parent, and we can work from there
            return (calculateRoyalBlood(f.parent1) + calculateRoyalBlood(f.parent2)) / 2;
        }
    }
    
    //if the person is not in any family, we can assume they have 0 royal blood in them
    return 0;
}

//function to find the heir
let findHeir = () => {
    let royalBloodTemp = -1; // setting it to -1 in case there's only one claimant with 0 relation to ruler
    let willInherit; // this will store the final result
    for (let c of claimants) {
        let royalBlood = calculateRoyalBlood(c); //storing the royal blood value of the candidate here
        if (royalBlood > royalBloodTemp) { //if the value is higher than the temp value
            royalBloodTemp = royalBlood; //set this as the temp
            willInherit = c; //set the person as the heir
        }
    }
    return willInherit; // return the heir
}

//NEW APPROACH // THIRD TIME'S THE CHARM

rl.on('line', (line) => {
    if (numOfLines === 1) {
        const numbers = line.split(' ');
        n = parseInt(numbers[0]);
        m = parseInt(numbers[1]);
        
    } else if (numOfLines === 2) {
        //finding the name of the ruler
        ruler = line;
        
    } else if (numOfLines <= n + 2) {
        //if we're looking at the family relation lines, do this
        let lineArray = line.split(' ');
        let child = lineArray[0];
        let parent1 = lineArray[1];
        let parent2 = lineArray[2];
        
        //pushing the object to the families list
        families.push({
            child,
            parent1,
            parent2
        })
        
    } else if (numOfLines <= m + 2 + n) {
        //if we're looking at the claimants, do this
        let claimant = line;
        
        //pushing the claimant to the claimants list
        claimants.push(claimant);
        
        if (numOfLines === m + 2 + n) {
            //if we're on the last line
            
            //logging the heir
            console.log(findHeir());
            
        }
    }
    numOfLines++;
});