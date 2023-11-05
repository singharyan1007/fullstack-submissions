const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log("Give password in argument");
  process.exit();
}

const password = process.argv[2];

const url = `mongodb+srv://Aryan:${password}@nodeandexpressprojects.qp8yo.mongodb.net/phoneBook?retryWrites=true&w=majority`
mongoose.set('strictQuery');
mongoose.connect(url);


const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv[3] && process.argv[4]) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number
  })
  person.save().then(() => {
    console.log("Saved to database");
    mongoose.connection.close();
  })
}
Person.find({}).then(persons => {
  console.log("PhoneBook database");
  persons.forEach(person => {
    console.log(person.name, person.number)
  });
  mongoose.connection.close();
})





