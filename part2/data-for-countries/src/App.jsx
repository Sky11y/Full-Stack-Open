import { useState, useEffect } from 'react'
import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries'

const Content = ({ country }) => {
	return (
		<div>{country}</div>
	)
}

const Filter = ({value, countries}) => {
	if (value === '') {
		return
	}

	const filteredCountries = countries.filter(c => {
		return c.name.common.toLowerCase().includes(value.toLowerCase())
	})

	if (filteredCountries.length > 10) {
		return (
			<div>Too many matches, specify another filter</div>
		)
	}
	else if (filteredCountries.length > 1) {
		return (
			<div>
				{filteredCountries.map((c, idx) => <Content key={idx} country={c.name.common} />)}
			</div>
		)
	} else if (filteredCountries.length == 1) {
		const country = filteredCountries[0]
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
	} else {
		return (
			<div>No countries found</div>
		)
	}
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [filterValue, setNewFilterValue] = useState('')

	useEffect(() => {
		axios
			.get(`${baseURL}/api/all`)
			.then(response => {
				const allCountries = response.data.map(country => country)
				setCountries(allCountries)
			})
	}, [])

	const empty = () => {}

	const handleFilterValueChange = (event) => {
		setNewFilterValue(event.target.value)
	}

//	if (newValue !== '') {
//
//		const filteredCountries = countries.filter(c => c.toLowerCase().contains(newValue.toLowerCase()))
//		console.log(filteredCountries)
//	}

	return (
		<div>
			<form>
				<div>
					find countries <input value={filterValue} onChange={handleFilterValueChange} />
				</div>
			</form>
			<Filter value={filterValue} countries={countries} />
		</div>
	)
}

export default App
