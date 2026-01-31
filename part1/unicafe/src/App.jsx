import { useState } from 'react'

const Header = ({title}) => {
	return (
		<div>
			<h1>{title}</h1>
		</div>
	)
}

const Statistics = (props) => {
	const text = props.text
	const value = props.value
	return (
		<div>
			{text} {value} {text === 'positive' ? '%' : ''}
		</div>
	)
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [total, setTotal] = useState(0)

	const handleGood = () => {
		const updatedGood = good + 1
		setGood(updatedGood)	
		setTotal(updatedGood + neutral + bad)
	}
	const handleNeutral = () => {
		const updatedNeutral = neutral + 1
		setNeutral(updatedNeutral)	
		setTotal(good + updatedNeutral + bad)
	}
	const handleBad = () => {
		const updatedBad = bad + 1
		setBad(updatedBad)	
		setTotal(good + neutral + updatedBad)
	}

	let average = (good - bad) / total
	let positive = good / total * 100
	return (
		<div>
			<Header title='give feedback' />
			<Button onClick={handleGood} text='good' />
			<Button onClick={handleNeutral} text='neutral' />
			<Button onClick={handleBad} text='bad' />
			<Header title='statistics' />
			<Statistics text='good' value={good} />
			<Statistics text='neutral' value={neutral} />
			<Statistics text='bad' value={bad} />
			<Statistics text='all' value={total} />
			<Statistics text='average' value={average} />
			<Statistics text='positive' value={positive} />
		</div>
	)
} 

export default App
