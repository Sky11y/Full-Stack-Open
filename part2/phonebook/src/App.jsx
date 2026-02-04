import { useState } from 'react'

const Content = ({person, number}) => {
	return (
		<div>{person} {number}</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([
		{ name: 'Pecca', number: '123', id: 1 },
		{ name: 'Pircco', number: '456', id: 2  },
		{ name: 'Ronsu', number: '567', id: 3  },
	]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
	const [filterValue, setFilterValue] = useState('')

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
				id: String(persons.length + 1),
			}
			setPersons(persons.concat(newPerson))
			setNewName('')
			setNewNumber('')
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
			<form>
				<div>
					filter contacts: <input value={filterValue} onChange={filterContacts} />
				</div>
			</form>
			<h2>Add a new contact</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
			<div>
				{personsToShow.map(person =>
					<Content key={person.id} person={person.name} number={person.number} />)}
			</div>
    </div>
  )
}

export default App
