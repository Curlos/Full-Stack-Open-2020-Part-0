import React from "react";
import { Patient, Diagnosis } from "../types";

const PatientInfo: React.FC<{patient: Patient | null | undefined, diagnoses: { [code: string]: Diagnosis }}> = ({patient, diagnoses}) => {
  

  if(patient) {
    return (
      <div>
        <h1>
          {patient.name} {patient.gender === "male" ? <i className="male icon" /> : <i className="female icon"/>}
        </h1>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>

        <h2>entries</h2>
        {patient.entries.map((entry, i) => {
          return (
            <div key={i}>
              <p key={i}>{entry.date} <i>{entry.description}</i></p>
              <ul>
                {entry.diagnosisCodes?.map((diagnosisCode, i) => {
                  const diagnosis = Object.values(diagnoses).find(diagnosis => diagnosis.code === diagnosisCode);
                  let diagnosisName = '';

                  if(diagnosis) {
                    diagnosisName = diagnosis.name;
                  }
                  
                  return (
                    <li key={i}>{diagnosisCode} {diagnosisName}</li>
                  )
                })}
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
