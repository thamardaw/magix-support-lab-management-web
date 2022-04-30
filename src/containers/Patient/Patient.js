import { Navigate, Route, Routes } from "react-router-dom";
import { PatientDetails, PatientForm, PatientTable } from ".";

const Patient = () => {
  return (
    <Routes>
      <Route path="" element={<PatientTable />} exact />
      <Route path="form">
        <Route index element={<PatientForm />} />
        <Route path=":id" element={<PatientForm />} />
      </Route>
      <Route path="details/:id" element={<PatientDetails />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};

export default Patient;
