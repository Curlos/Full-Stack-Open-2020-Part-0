import React from "react";
import { UnionOrIntersectionType } from "typescript";
import {CoursePart} from "../utils/types"
import Part from './Part';


interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
return <p>{courseParts.map((coursePart, i) => 
    <Part coursePart={coursePart} key={i}/>
  )}</p>
}

export default Content;