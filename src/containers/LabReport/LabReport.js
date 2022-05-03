import { Navigate, Route, Routes } from "react-router-dom";
import { LabReportDetails, LabReportForm, LabReportTable } from ".";

const LabReport = () => {
  return (
    <Routes>
      <Route path="" element={<LabReportTable />} exact />
      <Route path="form">
        <Route index element={<LabReportForm />} />
        <Route path=":id" element={<LabReportForm />} />
      </Route>
      <Route path="details/:id" element={<LabReportDetails />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};

export default LabReport;
