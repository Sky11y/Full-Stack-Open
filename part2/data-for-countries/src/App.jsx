import { useState, useEffect } from 'react'
import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries'

const Filter = ({ countries, result, handleClick }) => {
	if (countries.length === 0) {
		return (
			<div>No countries found</div>
		)
	}
	else if (countries.length > 10) {
		return (
			<div>Too many matches, specify another filter</div>
		)
	}
	else if (countries.length > 1) {
		return (
			<div>
				{countries.map(c => <Content key={c.id} country={c} handleClick={handleClick} />)}
			</div>
		)
	}
	else if (countries.length === 1) {
		const country = countries[0]
		return (
			<div>
				<RenderResult country={country} />
			</div>
		)
	} 
}

const Content = ({country, handleClick}) => {
	return (
		<li>
			{country.name.common}
			<button onClick={() => handleClick(country.id)}>Show</button> 
		</li>
	)	
}

const RenderResult = ({country}) => {
	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>Capital {country.capital}</div>
			<div>Area {country.area}</div>
			<h2>Languages</h2>
			<ul>
				{Object.entries(country.languages).map(([key,value]) => (
					<li key={key}>{value}</li>))}
			</ul>
			<img src={country.flags.png} />
		</div>
	)
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [filterValue, setNewFilterValue] = useState('')
	const [result, setResult] = useState(0)

	useEffect(() => {
		axios
			.get(`${baseURL}/api/all`)
			.then(response => {
				const allCountries = response.data.map((country, idx) => {
					country.id = idx
					return country
				})
				setCountries(allCountries)
			})
	}, [])

	const handleFilterValueChange = (event) => {
		setNewFilterValue(event.target.value)

		setResult(0)
	}

	const filteredCountries = filterValue === '' ? [] : countries.filter(c => {
		return c.name.common.toLowerCase().includes(filterValue.toLowerCase())
	})

	return (
		<div>
			<form>
				<div>
					find countries <input value={filterValue} onChange={handleFilterValueChange} />
				</div>
			</form>
			<div>
				{result ? (
					<RenderResult country={countries.find(c => c.id === result)} />
				) : (
					<Filter countries={filteredCountries} showResult={result} handleClick={setResult} />
				)}
			</div>
		</div>
	)
}

export default App
