require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
	
const app = express()

let persons = []

morgan.token('body', req => {
	return JSON.stringify(req.body)
})

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.get('/info', (request, response) => {
	const time = new Date().toString()
	const text = `<p>Phonebook has info for ${persons.length} persons</p><p>${time}</p>`
	response.send(text)
})

app.delete('/api/persons/:id', (request, response) => {
	Note.findByIdAndDelete(request.params.id)
		.then(result => {
			response.status(204).end()
		})
})

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name) {
		return response.status(400).json({error: 'name is empty'})
	}

	if (!body.number) {
		return response.status(400).json({error: 'number is empty'})
	}

	const person = new Person({
		name: body.name,
		number: body.number
	})

	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
