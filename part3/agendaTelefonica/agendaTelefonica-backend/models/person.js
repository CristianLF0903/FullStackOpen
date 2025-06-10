require('dotenv').config()
const mongoose = require("mongoose");
const colors = require("colors");
const url = process.env.MONGODB_URI;

if (!url) {
  console.error('MONGODB_URI is not defined in the environment variables'.red);
  process.exit(1);
}

mongoose.set('strictQuery',false)

console.log('connecting to', url.cyan)
mongoose.connect(url).then(() => {
  console.log('connected to MongoDB'.green);
}).catch((error) => {
  console.error('error connecting to MongoDB:', error.message.red);});


const personSchema = new mongoose.Schema({
  name: String,
  Number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.number = returnedObject.Number
    delete returnedObject.Number
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Persons', personSchema)