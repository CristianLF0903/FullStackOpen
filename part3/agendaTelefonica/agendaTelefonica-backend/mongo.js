const mongoose = require("mongoose");
const colors = require("colors");

if (process.argv.length<3) {
  console.log('give password as argument'.red)
  process.exit(1)
}

// CyF8LVHuKHUr0MZ6

const password = process.argv[2]

const url =
  `mongodb+srv://clondonof:${password}@cluster0.6dhpwjp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  Number: String
})

const Person = mongoose.model('Persons', personSchema)

const person = process.argv.slice(3)

if (process.argv.length === 5) {
  console.log('Adding new person to phonebook...'.green)
  const newPerson = new Person({
    name: person[0],
    Number: person[1]
  })

  Person.find({ name: newPerson.name }).then(result => {
    if (result.length > 0) {
      console.log(`${newPerson.name}`.yellow + ' is already in the phonebook'.red)
      mongoose.connection.close()
      return
    }

    newPerson.save().then(result => {
      console.log(
      'added '.green +
      `${newPerson.name}`.cyan +
      ' number '.green +
      `${newPerson.Number}`.magenta +
      ' to phonebook'.green
      )
      mongoose.connection.close()
    })
    
  })

} else {
  Person.find({}).then(result => {
    console.log('Phonebook:'.blue.bold)
    if (result.length === 0) {
      console.log('No persons in the phonebook'.yellow)
    } else {
      // Calcular el ancho máximo de los nombres para alinear
      const maxNameLength = Math.max(...result.map(person => person.name.length), 10)
      const maxNumberLength = Math.max(...result.map(person => person.Number.length), 6)
      // Encabezado
      console.log(
      'Name'.padEnd(maxNameLength).green +
      ' | ' +
      'Number'.padEnd(maxNumberLength).green
      )
      console.log('-'.repeat(maxNameLength + maxNumberLength + 3))
      // Imprimir cada persona
      result.forEach(person => {
      console.log(
        person.name.padEnd(maxNameLength).cyan +
        ' | ' +
        person.Number.padEnd(maxNumberLength).magenta
      )
      })
      console.log('-'.repeat(maxNameLength + maxNumberLength + 3))
      console.log(`${result.length} persons in the phonebook`.bold)
    }
    mongoose.connection.close()
  })
}