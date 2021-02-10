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