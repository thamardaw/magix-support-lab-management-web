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
import labReportSubFormAtom from "../recoil/labReportSubForm";
import { useRecoilState, useResetRecoilState } from "recoil";
import { MobileDatePicker } from "@mui/x-date-pickers";

const LabReportSubForm = ({ id }) => {
  const navigate = useNavigate();
  const api = useAxios({ autoSnackbar: true });
  const [patients, setPatients] = useState([]);
  const [details, setDetails] = useRecoilState(labReportSubFormAtom);
  const resetLabReportSubForm = useResetRecoilState(labReportSubFormAtom);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const onDatePicked = (e) => {
    const date_obj = new Date(e);
    const v = `${date_obj.getFullYear()}-${
      date_obj.getMonth() + 1
    }-${date_obj.getDate()}`;
    setDetails({ ...details, test_date: v });
  };

  const getPatients = async () => {
    resetLabReportSubForm();
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
      setDetails({ ...res.data, currentPatient: res?.data?.patient });
    } else {
      navigate(-1);
    }
    return;
  };

  useEffect(() => {
    getPatients();
    return () => resetLabReportSubForm();
    // eslint-disable-next-line
  }, [id]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Patient</Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Autocomplete
            value={details?.currentPatient}
            options={patients}
            getOptionLabel={(option) => `${option.name}, ${option?.patient_id}`}
            renderOption={(props, option) => {
              return (
                <Box {...props} key={option.id}>
                  {option.name}, {option?.patient_id}
                </Box>
              );
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            style={{ width: "90%" }}
            onChange={(event, newValue) => {
              setDetails({ ...details, currentPatient: newValue });
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
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Doctor Name</Typography>

        <TextField
          size="small"
          fullWidth
          margin="dense"
          value={details?.doctor_name || ""}
          name="doctor_name"
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Sample ID</Typography>
        <TextField
          size="small"
          fullWidth
          margin="dense"
          value={details?.sample_id || ""}
          name="sample_id"
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Sample Type</Typography>
        <TextField
          size="small"
          fullWidth
          margin="dense"
          value={details?.sample_type || ""}
          name="sample_type"
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Patient Type</Typography>
        <TextField
          size="small"
          fullWidth
          margin="dense"
          value={details?.patient_type || ""}
          name="patient_type"
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Test Date</Typography>
        <MobileDatePicker
          inputFormat="yyyy-MM-dd"
          value={details?.test_date}
          onChange={onDatePicked}
          renderInput={(params) => (
            <TextField {...params} size="small" fullWidth margin="dense" />
          )}
        />
        {/* <TextField
          size="small"
          fullWidth
          margin="dense"
          placeholder="YYYY-MM-DD"
          value={details?.test_date || ""}
          name="test_date"
          onChange={handleChange}
        /> */}
      </Box>
      {/* <LoadingButton
          variant="contained"
          // loading={isLoading}
          size="small"
          sx={{ marginRight: "5px" }}
          onClick={id ? updateLabTest : createNewLabTest}
        >
          Save
        </LoadingButton> */}
    </Box>
  );
};

export default LabReportSubForm;
