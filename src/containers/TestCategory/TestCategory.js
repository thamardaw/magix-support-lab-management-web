import { Navigate, Route, Routes } from "react-router-dom";
import { TestCategoryDetails, TestCategoryForm, TestCategoryTable } from ".";

const TestCategory = () => {
  return (
    <Routes>
      <Route path="" element={<TestCategoryTable />} exact />
      <Route path="form">
        <Route index element={<TestCategoryForm />} />
        <Route path=":id" element={<TestCategoryForm />} />
      </Route>
      <Route path="details/:id" element={<TestCategoryDetails />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};

export default TestCategory;
