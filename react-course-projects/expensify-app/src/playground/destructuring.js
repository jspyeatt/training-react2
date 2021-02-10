console.log('HERE');
const person = {
    name: 'John',
    age: 58,
    location: {
        city: 'Madison',
        temp: -4
    }
}

// destructure and set default for name if the property doesn't exist in person.
const { name = 'anonymous', age } = person;
console.log(`${name} is ${age}.`);

// destructure nested and rename a variable
const {city, temp: temperature} = person.location;
if (city && temperature) {
    console.log(`It's ${temperature} in ${city}`);
}

const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
};

const {name: publisherName = 'Self-Publish'} = book.publisher;
console.log(publisherName);

const address = ["123 Main Street", "Madison", "Wisconsin", '53719'];
// the array has 4 elements, but we are only interested in the second and third.
// so we lead with an empty comma, the leave the zip off entirely.
// I can also set the default state to AK. It will use this if there is no third item.
let [ ,cty, state = 'AK'] = address; 
console.log(`You are in ${cty}, ${state}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, , medium] = item;
console.log(`A medium ${itemName} costs ${medium}`);