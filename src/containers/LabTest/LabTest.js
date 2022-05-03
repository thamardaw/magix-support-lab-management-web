import { Navigate, Route, Routes } from "react-router-dom";
import { LabTestDetails, LabTestForm, LabTestTable } from ".";

const LabTest = () => {
  return (
    <Routes>
      <Route path="" element={<LabTestTable />} exact />
      <Route path="form">
        <Route index element={<LabTestForm />} />
        <Route path=":id" element={<LabTestForm />} />
      </Route>
      <Route path="details/:id" element={<LabTestDetails />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};

export default LabTest;
