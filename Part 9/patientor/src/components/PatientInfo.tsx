import React from "react";
import { Patient } from "../types";

const PatientInfo: React.FC<{patient: Patient | null | undefined}> = ({patient}) => {
  if(patient) {
    console.log(patient)
    if(patient.gender === "male") {
      return (
        <div>
          <h1>{patient.name} <i className="male icon"></i></h1>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </div>
      )
    } else if (patient.gender === "female") {
      return (
        <div>
          <h1>{patient.name} <i className="female icon"></i></h1>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </div>
      )
    } else {
      return (
        <div>
          <h1>{patient.name}</h1>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </div>
      )
    }
  } else {
    return null;
  }
};

export default PatientInfo;
