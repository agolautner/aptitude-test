const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numOfLines = 1;
let n;
let m;
let ruler;

let people = []; //array of objects
let peopleNames = []; //array of names for easier searching
let royalKids = [];
let completePeople = [];

let temp = -1; // setting this to zero in case there's just one claimant who's not actually related to the ruler
let willInherit;

const isRoyalChild = (person) => {
    //we look for person in in the array
    let isRoyal = false;
    for (let p of people) {
        //if we can find a person of the same name, and one of their parents is the ruler
        if (p.name === person.name && (p.parent1 === ruler || p.parent2 === ruler)) {
            isRoyal = true;
        }
    }
    return isRoyal;
} 


//NEW APPROACH

rl.on('line', (line) => {
    if (numOfLines === 1) {
        const numbers = line.split(' ');
        n = parseInt(numbers[0]);
        m = parseInt(numbers[1]);
    } else if (numOfLines === 2) {
        ruler = line;
        people.push({
            name: ruler,
            parent1: 'royalParent1',
            parent2: 'royalParent2',
            royalBlood: 1,
            complete: true
        });
        peopleNames.push(ruler);
        completePeople.push(ruler);
        
    } else if (numOfLines <= n + 2) {
        //if we're looking at the family relation lines, do this
        let lineArray = line.split(' ')
        let child = lineArray[0];
        let parent1 = lineArray[1];
        let parent2 = lineArray[2];
        
        people.push({
            name: child,
            parent1: parent1,
            parent2: parent2,
            royalBlood: 0,
            complete: false,
            claimant: false
        })
        
        peopleNames.push(child);
        
    } else if (numOfLines <= m + 2 + n) {
        //if we're looking at the claimants, do this
        
        let claimant = line.toString();
        for (let p of people) { //looking through the list of people
            if (p.name === claimant) { //if the person's name matches the current claimant
                p.claimant = true //set the property claimant to true
            }
        }
        
        if (numOfLines === m + 2 + n) {
            //if we're on the last line
            //we start by finding the rulers children
            
            for (let p of people) {
                if (isRoyalChild(p)) {
                    royalKids.push(p); //we store the royal kids in an array
                }
            }
            
            
            // need to find the royal kids whose other parent has no data
            // we loop over the royalKids array
            for (let kid of royalKids) {
                if (!peopleNames.includes(kid.parent1) || !peopleNames.includes(kid.parent2)) {
                    // if we don't have data on one parent
                    // we already know the other one is the ruler
                    // we give this kid a .5 and mark them as complete
                    for (let p of people) {
                        if (p.name === kid.name) {
                            p.complete = true;
                            completePeople.push(p.name);
                            p.royalBlood = 0.5;
                        }
                    }
                    
                    //we also push the parent to the people list as complete with 0
                    if (peopleNames.includes(kid.parent1)) { //if it's the first parent that is missing
                        people.push({ //push the second one
                            name: kid.parent2,
                            royalBlood: 0,
                            complete: true
                        });
                        peopleNames.push(kid.parent2);
                        completePeople.push(kid.parent2);
                    } else {
                        people.push({
                            name: kid.parent1, //push the first one
                            royalBlood: 0,
                            complete: true
                        });
                        peopleNames.push(kid.parent1);
                        completePeople.push(kid.parent1);
                    }
                    
                }
            }
        
        
            //now we go over the people and look for those who have parents that are both complete
            for (let person of people) { //original loop over people
                if (!person.complete){ // of course we only do this is the person themselves is incomplete
                        //for each person, we need to check if their parent is marked as complete
                    let parent1 = person.parent1;
                    let parent2 = person.parent2;
                        
                    //now we look for the parents
                    //we have a list with the names of all people marked complete
                    if (completePeople.includes(parent1) && completePeople.includes(parent2)) {
                        //in this case, the person's royal blood percentage can be marked as complete
                        //but first we calculate the percentage
                        //we find the parents in the people list
                        for (let parent of people) { // looping over the list again
                            if (parent.name === parent1 || parent.name === parent2) { //if the person matches one of the parents
                                person.royalBlood += ((parent.royalBlood) / 2) // we add their percentage
                            }
                        }
                    person.complete = true;
                    completePeople.push(person.name);
                    }
                }
            }
            console.log(people);
            console.log(completePeople);
        }
    }
    
    numOfLines++;
});