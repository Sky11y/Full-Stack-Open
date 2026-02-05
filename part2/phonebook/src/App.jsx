import { useState, useEffect } from 'react'
import axios from 'axios'

const Content = ({person, number}) => {
	return (
		<div>{person} {number}</div>
	)
}

const Filter = ({filterValue, func}) => {
	return (	
			<form>
				<div>
					filter contacts: <input value={filterValue} onChange={func} />
				</div>
			</form>
	)
}

const PersonForm = (props) => {
	return (
      <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
				<div>
					number: <input value={props.newNumber} onChange={props.handleNumberChange} />
				</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
	)
}

const Persons = ({persons}) => {
	return (
			<div>
				{persons.map(person =>
					<Content key={person.id} person={person.name} number={person.number} />)}
			</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
	const [filterValue, setFilterValue] = useState('')

	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
			})
	}, [])

	const addName = (event) => {
		event.preventDefault()
		if (!newName) {
			window.alert('Name field cannot be empty!')
		}	else if (persons.some(person => person.name === newName)) {
			window.alert(`${newName} is already in the phonebook`)
		} else if (persons.some(person => person.number === newNumber)) {
			window.alert(`Phonenumber ${newNumber} is already in use`)
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
			}

			axios
				.post('http://localhost:3001/persons', newPerson)
				.then(response => {
					setPersons(persons.concat(response.data))
					setNewName('')
					setNewNumber('')
				})
		}
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const filterContacts = (event) => {
		setFilterValue(event.target.value)
	}

	const personsToShow = !filterValue ?
		persons :
		persons.filter(person => 
			person.name.toLowerCase().includes(filterValue.toLowerCase())
		)

  return (
    <div>
      <h2>Phonebook</h2>
			<Filter filterValue={filterValue} func={filterContacts} />
			<h2>Add a new contact</h2>
			<PersonForm newName={newName} addName={addName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
			<Persons persons={personsToShow} />
    </div>
  )
}

export default App
