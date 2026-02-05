const Content = ({person, number, func}) => {
	return (
		<div>
			{person} {number}
			<button onClick={func}>delete</button>
		</div>
	)
}

const Form = (props) => {
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

const Contacts = ({persons, delFunc}) => {
	return (
			<div>
				{persons.map(p =>
					<Content
						key={p.id}
						person={p.name}
						number={p.number}
						func={() => delFunc(p)}
					/>
				)}
			</div>
	)
}

export default { Form, Contacts }
