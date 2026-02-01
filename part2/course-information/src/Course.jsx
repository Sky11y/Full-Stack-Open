const Header = ({name}) => {
	return (
		<div>
			<h1>{name}</h1>
		</div>
	) 
}

const Part = ({name, exercises}) => {
	return (
		<div>
			<p>{name} {exercises}</p>
		</div>
	)
}

const Content = ({parts}) => {
	return (
		<div>
			{parts.map(part =>
				<Part key={part.id} name={part.name} exercises={part.exercises} />
			)}
		</div>
	)
}

const Total = ({parts}) => {
	const total = parts.reduce((total, part) => {
		return total + part.exercises
	}, 0)

	return (
		<div><strong>total of {total} exercises</strong></div>
	)
}

const Course = ({course}) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default Course
