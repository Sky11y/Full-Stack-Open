const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.error('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function(v) {
        return v.length >= 3
      },
      message: props => `${props.value} is less than 3 characters long!`
    },
    required: true
  },
  number: {
    type: String,
    validate: [
      {
        validator: function(v) {
          return v.length >= 8
        },
        message: props => `${props.value} is too short. Minimum length is 8.`
      },
      {
        validator: function(v) {
          return /\d{2,3}-\d{6,8}/.test(v)
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    ],
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
