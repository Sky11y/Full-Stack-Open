import { useState } from 'react'

const Header = ({title}) => {
	return (
		<div>
			<h1>{title}</h1>
		</div>
	)
}

const StatisticLine = ({text, value}) => {
	return (
		<div>
			{text} {value} {text === 'positive' ? '%' : ''}
		</div>
	)
}

const Statistics = ({statistics}) => {
	if (statistics.total === 0) {
		return (<div>No feedback given</div>)
	}
	const average = (statistics.good - statistics.bad) / statistics.total
	const positive = statistics.good / statistics.total * 100
	return (
		<div>
			<StatisticLine text='good' value={statistics.good} />
			<StatisticLine text='neutral' value={statistics.neutral} />
			<StatisticLine text='bad' value={statistics.bad} />
			<StatisticLine text='total' value={statistics.total} />
			<StatisticLine text='average' value={average} />
			<StatisticLine text='positive' value={positive} />
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

	const allStats = {
		good: good,
		neutral: neutral,
		bad: bad,
		total: total
	}

	return (
		<div>
			<Header title='give feedback' />
			<Button onClick={handleGood} text='good' />
			<Button onClick={handleNeutral} text='neutral' />
			<Button onClick={handleBad} text='bad' />
			<Header title='statistics' />
			<Statistics statistics={allStats} />
		</div>
	)
} 

export default App
