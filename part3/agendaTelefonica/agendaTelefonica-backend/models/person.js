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
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  Number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d+/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
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

const validatePhoneNumber = (number) => {
  const phoneRegex = /^\d{2,3}-\d+$/;
  return phoneRegex.test(number) && number.length >= 8;
}

personSchema.path('Number').validate(function(value) {
  return validatePhoneNumber(value);
}
, 'Invalid phone number format. It should be in the format "XX-XXXXXXX" or "XXX-XXXXXXX".');


personSchema.path("name").validate(async (value) => {
    const count = await mongoose.models.Persons.countDocuments({ name: value });
    return count === 0 && value.length >= 3;
}
, 'Name must be at least 3 characters long and unique.');

module.exports = mongoose.model('Persons', personSchema)