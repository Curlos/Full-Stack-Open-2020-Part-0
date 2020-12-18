import React, {useState} from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, useRouteMatch,
  useHistory, } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInfo from "./components/PatientInfo"

const App: React.FC = () => {
  const [data, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  console.log(data.patients)

  const match: any = useRouteMatch('/patients/:id')
  console.log('match: ', match);
  const patient = match 
    ? Object.values(data.patients).find(patient => patient.id === (match.params.id))
    : null

  return (
    <div className="App">
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={() => <PatientInfo patient={patient} />} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
    </div>
  );
};

export default App;
