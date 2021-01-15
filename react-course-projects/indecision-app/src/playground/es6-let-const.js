var nameVar = 'John';
console.log('nameVar', nameVar);

let nameLet = 'John';
nameLet = 'Pyeatt';
console.log('nameLet', nameLet);

const nameConst = 'John';
console.log('nameConst', nameConst);

// scoping
function getPetName() {
    var petName = 'Thorin and Clifford';
    return petName;
}
console.log(getPetName());

var fullName = 'John Pyeatt';
if (fullName) {
    var firstName = fullName.split(' ')[0];
    const lastName = fullName.split(' ')[1];
    console.log('FirstName', firstName);
    console.log('LastName', lastName);
}

// but I can also access firstName here. var is not block scoped.