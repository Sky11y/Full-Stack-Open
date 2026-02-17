const mongoose = require('mongoose')

const argc = process.argv.length

if (argc < 3) {
	console.log('usage: node mongo.js <password> [name] [number]')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Sky11y:${password}@cluster0.ig8ly9g.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family : 4 })

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

if (argc > 3) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	})

	person.save().then(result => {
		console.log('contact saved!')
		mongoose.connection.close()
	})
} else {
	Person.find({}).then(result => {
		result.forEach(p => {
			console.log(p)
		})
		mongoose.connection.close()
	})
}
