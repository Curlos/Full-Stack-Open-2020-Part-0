import React from "react";
import { Patient, Diagnosis, Entry } from "../types";
import { Card, Icon, Image, Container } from 'semantic-ui-react'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch(entry.type) {
    case "Hospital":
      return (
        <Card>
          <Card.Content>
            <Card.Header>{entry.date} <Icon name='hospital' size='big'/></Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              {entry.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='heart' />
            </a>
          </Card.Content>
        </Card>
      )
    case "OccupationalHealthcare":
      return (
        <Card>
          <Card.Content>
            <Card.Header>{entry.date} <Icon name='user md' size='big'/></Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              {entry.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='heart' />
            </a>
          </Card.Content>
        </Card>
      )
    case "HealthCheck":
      return (
        <Card>
          <Card.Content>
            <Card.Header>{entry.date} <Icon name='stethoscope' size='big'/></Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              {entry.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='heart' />
            </a>
          </Card.Content>
        </Card>
      )
    default:
      return assertNever(entry);
  }
}

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
              <EntryDetails entry={entry} />
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
