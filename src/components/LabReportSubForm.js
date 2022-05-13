import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../hooks";
import AddIcon from "@mui/icons-material/Add";

const LabReportSubForm = ({ id }) => {
  const navigate = useNavigate();
  const api = useAxios({ autoSnackbar: true });
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);

  const [details, setDetails] = useState({
    patient_id: null,
    doctor_name: "",
    sample_id: "",
    sample_type: "",
    patient_type: "",
    test_date: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const getPatients = async () => {
    const res = await api.get("/api/patients/");
    if (res.status === 200) {
      setPatients(res.data);
      if (id) getData();
    }
    return;
  };

  const getData = async () => {
    const res = await api.get(`/api/lab_reports/${id}`);
    if (res.status === 200) {
      setCurrentPatient(res?.data?.patient);
      setDetails(res.data);
    } else {
      navigate(-1);
    }
    return;
  };

  const createNewLabTest = async () => {
    if (currentPatient) {
      const res = await api.post("/api/lab_reports/", {
        ...details,
        patient_id: currentPatient.id,
      });
      if (res.status === 200) {
        navigate(`${res.data.id}`, { replace: true, state: { mode: "new" } });
      }
    }
    return;
  };

  const updateLabTest = async () => {
    if (currentPatient) {
      await api.put(`/api/lab_reports/${id}/`, {
        ...details,
        patient_id: currentPatient.id,
      });
    }
    return;
  };

  useEffect(() => {
    getPatients();
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "30%" }}>
          <Typography variant="p">Patient</Typography>
        </Box>
        <Box
          sx={{
            width: "70%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Autocomplete
            value={currentPatient}
            options={patients}
            getOptionLabel={(option) => `${option.name}, ${option.id}`}
            renderOption={(props, option) => {
              return (
                <Box {...props} key={option.id}>
                  {option.name}, {option.id}
                </Box>
              );
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            style={{ width: "90%" }}
            onChange={(event, newValue) => {
              setCurrentPatient(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                fullWidth
                size="small"
                margin="normal"
              />
            )}
          />
          <IconButton
            size="small"
            color="primary"
            sx={{ marginTop: "5px" }}
            onClick={() => navigate("/dashboard/patient/form")}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "30%" }}>
          <Typography variant="p">Doctor Name</Typography>
        </Box>
        <TextField
          size="small"
          sx={{ width: "70%" }}
          margin="dense"
          value={details?.doctor_name || ""}
          name="doctor_name"
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
          <Typography variant="p">Sample ID</Typography>
        </Box>
        <TextField
          size="small"
          sx={{ width: "70%" }}
          margin="dense"
          value={details?.sample_id || ""}
          name="sample_id"
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
          <Typography variant="p">Sample Type</Typography>
        </Box>
        <TextField
          size="small"
          sx={{ width: "70%" }}
          margin="dense"
          value={details?.sample_type || ""}
          name="sample_type"
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
          <Typography variant="p">Patient Type</Typography>
        </Box>
        <TextField
          size="small"
          sx={{ width: "70%" }}
          margin="dense"
          value={details?.patient_type || ""}
          name="patient_type"
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
          <Typography variant="p">Test Date</Typography>
        </Box>
        <TextField
          size="small"
          sx={{ width: "70%" }}
          margin="dense"
          placeholder="YYYY-MM-DD"
          value={details?.test_date || ""}
          name="test_date"
          onChange={handleChange}
        />
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
          // loading={isLoading}
          size="small"
          sx={{ marginRight: "5px" }}
          onClick={id ? updateLabTest : createNewLabTest}
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default LabReportSubForm;
