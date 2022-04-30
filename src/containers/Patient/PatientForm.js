import { useParams } from "react-router-dom";

const PatientForm = () => {
  const { id } = useParams();
  return <h1>Patient Form {id}</h1>;
};

export default PatientForm;
