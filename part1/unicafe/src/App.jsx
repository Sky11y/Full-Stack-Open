import { useState } from 'react'

const Header = ({title}) => {
	return (
		<div>
			<h1>{title}</h1>
		</div>
	)
}

const Statistic = ({ text, value }) => {
	return (
		<div>
			{text} {value}
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
			<Statistic text='good' value={good} />
			<Statistic text='neutral' value={neutral} />
			<Statistic text='bad' value={bad} />
			<Statistic text='all' value={total} />
			<Statistic text='average' value={average} />
			<div>positive {positive}%</div>
		</div>
	)
} 

export default App
