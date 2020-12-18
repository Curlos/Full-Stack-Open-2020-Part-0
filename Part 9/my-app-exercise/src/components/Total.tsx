import React from "react";

interface ArrayProps {
  name: string,
  exerciseCount: number
}

interface TotalProps {
  courseParts: Array<ArrayProps>;
}


const Total: React.FC<TotalProps> = ({courseParts}) => {
  return <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
}

export default Total;