var person = {
    name: "megha",
    age: "22"
}
var defaultPerson={
    name: "anonymous",
    age: "0"
};
function welcomePerson(person = defaultPerson)
{
    console.log(`Hello ${person.name}! You are ${person.age}`);
};
welcomePerson();
welcomePerson(person);