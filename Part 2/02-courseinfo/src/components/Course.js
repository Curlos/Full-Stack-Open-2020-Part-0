import React from 'react'


const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const parts = [...course.parts];
    const exercises = parts.map(part => part.exercises);

    const total = exercises.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    })

    return (
        <p>
            <b>Number of exercises {total}</b>
        </p>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part => <Part part={part} key={part.id} />)}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course