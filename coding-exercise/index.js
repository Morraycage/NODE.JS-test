var fs = require('fs')

const path = "test-data-10-exp-5.list"

const uniqueFull = {};
const uniqueFirstName= {};
const uniqueLastName = {};
const topUniqueFull = [];

function displayOutput() {

    // #1  First version, it was inneficient we were looping twice (about 200ms on the sample)
    // persons.forEach(element => {
    //     uniqueFull[element.Firstname + element.Lastname] += 1;
    //     uniqueFirstName[element.Firstname] += 1
    //     uniqueLastName[element.Lastname] += 1
    // });
    console.log("There are "+Object.getOwnPropertyNames(uniqueFull).length+" unique full names.");
    console.log("There are "+Object.getOwnPropertyNames(uniqueFirstName).length+" unique first names.");
    console.log("There are "+Object.getOwnPropertyNames(uniqueLastName).length+" unique last names.");

    console.log("The ten most common first names are:");
    printMostCommon(uniqueFirstName, 10);
    console.log("The ten most common last names are:");
    printMostCommon(uniqueLastName, 10);

    console.log("The new 25 unique names are:");

     // we could swap the lastname and firstname in the output, it is, after all a new combination
     // John Doe become Doe John
    topUniqueFull.forEach(item => {
        console.log(item.firstname + ', ' + item.lastname);
    });
}

function printMostCommon(arr, size) {
    const duplicate_flag = "";
    Object.values(arr).sort((a,b) => b-a).slice(0,size).forEach(val => {
        const p = Object.keys(arr).find(key => arr[key] === val && 
            duplicate_flag !== arr[key]);
        console.log(p.trim() + ' ('+arr[p]+')');
        arr[p] = duplicate_flag;
    });
}

function start() {
    var start = new Date();
    fs.readFile(path, (err, data) => {
        if (err)
            return 1;
        const lines = data.toString().split('\n');
        for (const line of lines) {
            if (line.includes('--')) {
                const person = line.split(' --')[0].split(',');
                if (!uniqueFull[person] && !uniqueFirstName[person[1]] &&  uniqueLastName[person[0]]
                    && topUniqueFull.length < 25) {
                    topUniqueFull.push({firstname: person[1], lastname: person[0]});
                }
                uniqueFull[person] = (uniqueFull[person])?  uniqueFull[person] + 1 : 1;
                uniqueFirstName[person[1]] = (uniqueFirstName[person[1]])? uniqueFirstName[person[1]]+ 1 : 1;
                uniqueLastName[person[0]] = (uniqueLastName[person[0]])? uniqueLastName[person[0]]+ 1 : 1;
            }
        }
        displayOutput();
        var end = new Date() - start;
        console.info("time taken : %dms", end);
    });
}

start();