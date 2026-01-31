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

	const handleGood = () => {
		setGood(good + 1)	
	}
	const handleNeutral = () => {
		setNeutral(neutral + 1)	
	}
	const handleBad = () => {
		setBad(bad + 1)	
	}

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


		</div>
	)
} 

export default App
