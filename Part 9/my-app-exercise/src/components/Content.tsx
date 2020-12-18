import React from "react";

interface ArrayProps {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  courseParts: Array<ArrayProps>;
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
return <p>{courseParts.map((coursePart, i) => 
  <p key={i}>{coursePart.name} {coursePart.exerciseCount}</p>
)}</p>
}

export default Content;