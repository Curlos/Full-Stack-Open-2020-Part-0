import React from "react";
import {CoursePart} from "../utils/types";

interface PartProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = ({ coursePart }) => {
  switch (coursePart.name) {
    case "Fundamentals":
      // TypeScript knows that we can use name. exerciseCount and description
      return (
        <p>
          <b>Name: </b>{coursePart.name} 
          <b> Description: </b>{coursePart.description}
          <b> Exercise Count: </b>{coursePart.exerciseCount}
        </p>
      )
    case "Using props to pass data":
      // TypeScript knows that we can use name, exerciseCount and groupProjectCount
      return (
        <p>
          <b>Name: </b>{coursePart.name} <b>Group Project Count: </b>{coursePart.groupProjectCount}
          <b> Exercise Count: </b>{coursePart.exerciseCount}
        </p>
      )
    case "Deeper type usage":
      // TypeScript knows that we can use name, exerciseCount, description and exerciseSubmissionLink
      return (
        <p>
          <b>Name: </b>{coursePart.name} <b>Description: </b>{coursePart.description} <b>Exercise Submission Link: </b><a href={coursePart.exerciseSubmissionLink}>{coursePart.exerciseSubmissionLink}</a> 
          <b> Exercise Count: </b>{coursePart.exerciseCount}
        </p>
      )
    case "Course Part Four":
      // TypeScript knows that we can use name, exerciseCount, description and exerciseSubmissionLink
      return (
        <p>
          <b>Name: </b>{coursePart.name} <b>Description: </b>{coursePart.description} <b>Exercise Count: </b>{coursePart.exerciseCount}
        </p>
      )
    default:
      return assertNever(coursePart);
  }
}

export default Part;