const Header = (props) => {
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	) 
}

const Part = (props) => {
	return (
		<div>
			<p>name: {props.name} | exercise count: {props.count}</p>
		</div>
	)
}
const Content = (props) => {
	return (
		<div>
			<Part name={props.part1.name} count={props.part1.exercises}/>
			<Part name={props.part2.name} count={props.part2.exercises}/>
			<Part name={props.part3.name} count={props.part3.exercises}/>
		</div>
	)
}

const Total = (props) => {
	return (
		<div>
			<p>Total number of exercises {props.total}</p>
		</div>
	)
}

const App = () => {
	const course = 'Half Stack application development'
	const part1 = {
		name: 'Fundamentals of React',
		exercises: 10
	}
	const part2 = {
		name: 'Using props to pass data',
		exercises: 7
	}
	const part3 = {
		name: 'State of a component',
		exercises: 14
	}

	return (
		<div>
			<Header course={course} />
			<Content part1={part1} part2={part2} part3={part3}/>
			<Total total={part1.exercises + part2.exercises + part3.exercises} />
		</div>
	)
}

export default App
