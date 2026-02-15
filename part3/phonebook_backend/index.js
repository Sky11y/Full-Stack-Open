const express = require('express')
const morgan = require('morgan')
const app = express()


let persons = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456"
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523"
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345"
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122"
	},
]

morgan.token('body', req => {
	return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const person = persons.find(p => p.id === id)

	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.get('/info', (request, response) => {
	const time = new Date().toString()
	const text = `<p>Phonebook has info for ${persons.length} people</p><p>${time}</p>`
	response.send(text)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const person = persons.find(p => p.id === id)

	if (!person) {
		return response.status(404).end()
	}

	persons = persons.filter(p => p.id !== id)
	response.status(204).end()
})

const generateId = () => {
	let newId
	if (persons.length < 1) {
		return Math.ceil(Math.random() * 10000)
	}
	while (1) {
		newId = Math.ceil(Math.random() * 10000)
		if (!persons.find(p => p.id === newId)) {
			return String(newId)
		}
	}
}

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name) {
		return response.status(400).json({
			error: 'name is empty'
		})
	}

	if (!body.number) {
		return response.status(400).json({
			error: 'number is empty'
		})
	}

	if (persons.find(p => p.name === body.name)) {
		return response.status(400).json({
			error: 'name must be unique'
		})
	}

	const newPerson = {
		name: body.name,
		number: body.number,
		id: generateId()
	}

	persons = persons.concat(newPerson)
	response.json(newPerson)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
