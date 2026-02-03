import { useState } from 'react'

const Content = ({person}) => {
	return (
		<div>{person}</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
			id: 1,
		}
  ]) 
  const [newName, setNewName] = useState('')

	const addName = (event) => {
		event.preventDefault()
		const newPerson = {
			name: newName,
			id: String(persons.length + 1),
		}
		setPersons(persons.concat(newPerson))
		setNewName('')
	}

	const handleFormChange = (event) => {
		console.log("handleFormChange", event) 
		setNewName(event.target.value)
	}
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
						value={newName}
						onChange={handleFormChange} />
        </div>
				<div>
					debug: {newName}	
				</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
			<div>
				{persons.map(person => <Content key={person.id} person={person.name} />)}
			</div>
    </div>
  )

}

export default App
