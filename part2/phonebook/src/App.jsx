import { useState, useEffect } from 'react'
import contactService from './services/contacts'
import Contact from './components/Contact'
import Notification from './components/Notification'

const MSG_TIME = 3000

const Filter = ({filterValue, func}) => {
	return (	
		<form>
			<div>
				filter contacts: <input value={filterValue} onChange={func} />
			</div>
		</form>
	)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
	const [filterValue, setFilterValue] = useState('')
	const [userMessage, setUserMessage] = useState(null)
	const [userMessageType, setUserMessageType] = useState('')

	useEffect(() => {
		contactService
			.getAll()
			.then(initialContacts => {
				setPersons(initialContacts)
			})
	}, [])

	const addName = (event) => {
		event.preventDefault()
		if (!newName) {
			window.alert('Name field cannot be empty!')
		}
		else if (persons.some(p => p.number === newNumber)) {
			window.alert(`Phonenumber ${newNumber} is already in use`)
		}
		else if (persons.some(p => p.name === newName)) {
			if (window.confirm(`'${newName}' is already in the phonebook. Replace the old number with a new one?`)) {
				const updatedPerson = persons.find(p => p.name === newName)
				const name = updatedPerson.name
				updatedPerson.number = newNumber

				contactService
					.updateContact(updatedPerson.id, updatedPerson)
					.then(updatedContact => {
						setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
						setNewName('')
						setNewNumber('')
						setUserMessage(`Successfully updated '${name}'`)
						setUserMessageType('notice')
					})
					.catch(err => {
						setPersons(persons.filter(p => p.name !== name))
						setUserMessage(`Information of '${name}' has already been removed from the server`)
						setUserMessageType('error')
					})
					setTimeout(() => {
						setUserMessage(null)
						setUserMessageType(null)
					}, MSG_TIME)
			}
		}
		else {
			const newPerson = {
				name: newName,
				number: newNumber,
			}

			contactService
				.create(newPerson)
				.then(newContact => {
					setPersons(persons.concat(newContact))
					setNewName('')
					setNewNumber('')
					setUserMessage(`Successfully added '${newContact.name}'`)
					setUserMessageType('notice')
					setTimeout(() => {
						setUserMessage(null)
						setUserMessageType(null)
					}, MSG_TIME)
				})
				.catch(error => {
					console.log(error.response.data)
				})
		}
	}

	const deleteName = (person) => {
		const id = person.id
		const name = person.name
		if (window.confirm(`Are you sure you want to delete '${name}'`)) {
			contactService
				.deleteContact(id)
				.then(rmContact => {
						setPersons(persons.filter(p => p.id !== id ? p: null))
						setUserMessage(`Successfully deleted '${name}'`)
						setUserMessageType('notice')
				})
				.catch(err => {
					console.log('error catch block')
					setPersons(persons.filter(p => p.id !== id))
					setUserMessage(`Information of '${name}' has already been removed from the server`)
					setUserMessageType('error')
				})
				setTimeout(() => {
					setUserMessage(null)
					setUserMessageType(null)
				}, MSG_TIME)
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
			<Notification message={userMessage} type={userMessageType} />
			<Filter filterValue={filterValue} func={filterContacts} />
			<h2>Add a new contact</h2>
			<Contact.Form newName={newName} addName={addName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
			<Contact.Contacts persons={personsToShow} delFunc={deleteName} />
    </div>
  )
}

export default App
