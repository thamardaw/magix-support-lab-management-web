import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../hooks";

const LabTestSubForm = ({ id }) => {
  const navigate = useNavigate();
  const api = useAxios({ autoSnackbar: true });
  const [testCategories, setTestCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [details, setDetails] = useState({
    name: "",
    test_category_id: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const getCategories = async () => {
    const res = await api.get("/api/test_categories/");
    if (res.status === 200) {
      setTestCategories(res.data);
      if (id) getData();
    }
    return;
  };

  const getData = async () => {
    const res = await api.get(`/api/lab_tests/${id}`);
    if (res.status === 200) {
      setDetails(res.data);
    } else {
      navigate(-1);
    }
    return;
  };

  const createNewLabTest = async () => {
    setIsLoading(true);
    const res = await api.post("/api/lab_tests/", {
      ...details,
      test_category_name: testCategories.find(
        (tc) => tc.id === details.test_category_id
      ).name,
    });
    if (res.status === 200) {
      navigate(`${res.data.id}`, { replace: true, state: { mode: "new" } });
    }
    setIsLoading(false);
    return;
  };

  const updateLabTest = async () => {
    setIsLoading(true);
    await api.put(`/api/lab_tests/${id}/`, {
      ...details,
      test_category_name: testCategories.find(
        (tc) => tc.id === details.test_category_id
      ).name,
    });
    setIsLoading(false);
    return;
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "30%" }}>
          <Typography variant="p">Name</Typography>
        </Box>
        <TextField
          size="small"
          sx={{ width: "70%" }}
          margin="dense"
          value={details?.name || ""}
          name="name"
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "30%" }}>
          <Typography variant="p">Category</Typography>
        </Box>
        <TextField
          select
          fullWidth
          label="Category"
          size="small"
          sx={{ width: "70%" }}
          margin="dense"
          value={details?.test_category_id || ""}
          name="test_category_id"
          onChange={handleChange}
        >
          {testCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
        <LoadingButton
          variant="contained"
          loading={isLoading}
          size="small"
          sx={{ marginRight: "5px" }}
          onClick={id ? updateLabTest : createNewLabTest}
        >
          Save
        </LoadingButton>
      </Box>
    </>
  );
};

export default LabTestSubForm;
