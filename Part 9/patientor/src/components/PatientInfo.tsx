import React from "react";
import { Patient } from "../types";

const PatientInfo: React.FC<{patient: Patient | null | undefined}> = ({patient}) => {
  if(patient) {
    console.log(patient)
    return (
      <div>
        <h1>
          {patient.name} {patient.gender === "male" ? <i className="male icon" /> : <i className="female icon"/>}
        </h1>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>

        <h2>entries</h2>
        {patient.entries.map((entry, i) => {
          console.log(entry)
          return (
            <div key={i}>
              <p key={i}>{entry.date} <i>{entry.description}</i></p>
              <ul>
                {entry.diagnosisCodes?.map((diagnosisCode, i) => <li key={i}>{diagnosisCode}</li>)}
              </ul>
            </div>
            
          )
        })}
      </div>
    )
  } else {
    return null;
  }
};

export default PatientInfo;
