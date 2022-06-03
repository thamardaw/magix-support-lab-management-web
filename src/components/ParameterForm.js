import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
// import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
// import { alpha } from "@mui/material/styles";
import { useRecoilState, useResetRecoilState } from "recoil";
import parameterFormAtom from "../recoil/parameterForm";
import { useEffect, useRef, useState } from "react";
import { useAxios } from "../hooks";
import { LoadingButton } from "@mui/lab";

// const StyledBox = styled(Box)(({ theme }) => ({
//   "&::-webkit-scrollbar": {
//     width: "4px",
//   },
//   "&::-webkit-scrollbar-track": {
//     backgroundColor: alpha(theme.palette.primary.light, 0.15),
//     borderRadius: "10px",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: alpha(theme.palette.primary.light, 0.25),
//   },
// }));

const ParameterForm = ({ height, data, refreshData, id }) => {
  const api = useAxios({ autoSnackbar: true });
  const apiNoSnackbar = useAxios({ autoSnackbar: false });
  const initialMountRef = useRef(true);
  const [details, setDetails] = useRecoilState(parameterFormAtom);
  const resetParameterFrom = useResetRecoilState(parameterFormAtom);
  const [labTest, setLabTest] = useState({ show_in_report_form: false });
  const [isLoading, setIsLoading] = useState(false);
  const [range, setRange] = useState({
    lower_limit: "",
    upper_limit: "",
    low_remark: "",
    normal_remark: "",
    high_remark: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleRangeChange = (e) => {
    setRange({ ...range, [e.target.name]: e.target.value });
  };

  const addRange = async () => {
    if (details.id) {
      await api.post(`/api/parameters/ranges/${details.id}`, { ...range });
      refreshData();
    } else {
      setDetails({
        ...details,
        parameter_ranges: [{ ...range }, ...details.parameter_ranges],
      });
    }
    setRange({
      lower_limit: "",
      upper_limit: "",
      low_remark: "",
      normal_remark: "",
      high_remark: "",
    });
  };

  const removeRange = async (index) => {
    const newRanges = [...details.parameter_ranges];
    if (newRanges[index].id) {
      await api.delete(`/api/parameters/ranges/${newRanges[index].id}`);
      refreshData();
    } else {
      newRanges.splice(index, 1);
      setDetails({ ...details, parameter_ranges: newRanges });
    }
  };

  const processResultDefaultText = (v) => {
    return v ? (typeof v === "object" ? v : v.split(",")) : [];
  };

  const createNewParameter = async () => {
    setIsLoading(true);
    const res = await api.post(`/api/parameters/`, {
      ...details,
      result_default_text: processResultDefaultText(
        details?.result_default_text
      ),
      lab_test_id: id,
    });
    if (res.status === 200) {
      refreshData();
      resetParameterFrom();
    }
    setIsLoading(false);
  };

  const updateParameter = async () => {
    setIsLoading(true);
    const res = await api.put(`/api/parameters/${details.id}/`, {
      ...details,
      result_default_text: processResultDefaultText(
        details?.result_default_text
      ),
    });
    if (res.status === 200) {
      refreshData();
      resetParameterFrom();
    }
    setIsLoading(false);
  };

  const getLabTestData = async () => {
    const res = await api.get(`/api/lab_tests/${id}`);
    if (res.status === 200) {
      setLabTest(res.data);
    }
    return;
  };

  const updateLabTest = async (e) => {
    const res = await apiNoSnackbar.put(`/api/lab_tests/${id}/`, {
      ...labTest,
      show_in_report_form: e.target.checked,
    });
    if (res.status === 200) {
      getLabTestData();
    }
  };

  useEffect(() => {
    getLabTestData();
    return () => resetParameterFrom();
    // eslint-disable-next-line
  }, [id, resetParameterFrom]);

  useEffect(() => {
    if (initialMountRef.current && data.length !== 0) {
      initialMountRef.current = false;
      return;
    }
    if (data.length > 1) {
      if (labTest?.show_in_report_form === true) return;
      updateLabTest({ target: { checked: true } });
    } else {
      if (labTest?.show_in_report_form === false) return;
      updateLabTest({ target: { checked: false } });
    }
    getLabTestData();
    // eslint-disable-next-line
  }, [id, data]);

  return (
    <>
      <Box sx={{ height: height, overflowY: "scroll" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "10px",
          }}
        >
          <Typography variant="p">Show In Report Form</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={labTest?.show_in_report_form}
              onChange={updateLabTest}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="p">Parameter Name</Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              name="name"
              size="small"
              margin="dense"
              onChange={handleChange}
              value={details?.name || ""}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="p">Unit</Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              name="unit"
              size="small"
              margin="dense"
              onChange={handleChange}
              value={details?.unit || ""}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="p">Result Type</Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              select
              fullWidth
              value={details?.result_type || ""}
              name="result_type"
              size="small"
              margin="dense"
              onChange={handleChange}
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="number">Number</MenuItem>
            </TextField>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="p">Result Default Text</Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              name="result_default_text"
              size="small"
              margin="dense"
              onChange={handleChange}
              value={details?.result_default_text || ""}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="p">Range</Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              name="lower_limit"
              placeholder="Lower Limit"
              size="small"
              margin="dense"
              sx={{ width: "45%" }}
              value={range.lower_limit || ""}
              onChange={handleRangeChange}
            />
            <TextField
              name="upper_limit"
              placeholder="Upper Limit"
              size="small"
              margin="dense"
              sx={{ width: "45%" }}
              value={range.upper_limit || ""}
              onChange={handleRangeChange}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="p">Remark</Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              name="low_remark"
              placeholder="Low"
              size="small"
              margin="dense"
              sx={{ width: "30%" }}
              value={range.low_remark || ""}
              onChange={handleRangeChange}
            />
            <TextField
              name="normal_remark"
              placeholder="Normal"
              size="small"
              margin="dense"
              sx={{ width: "30%" }}
              value={range.normal_remark || ""}
              onChange={handleRangeChange}
            />
            <TextField
              name="high_remark"
              placeholder="High"
              size="small"
              margin="dense"
              sx={{ width: "30%" }}
              value={range.high_remark || ""}
              onChange={handleRangeChange}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "10px 0px",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{ width: "45%", textTransform: "none" }}
            onClick={addRange}
          >
            Add Range
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "10px 0px",
            height: "150px",
            overflowY: "scroll",
            border: "1px solid #ccc",
          }}
        >
          <List sx={{ width: "100%" }}>
            {details?.parameter_ranges?.map((range, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeRange(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${range.lower_limit}-${range.upper_limit}`}
                  secondary={`${range.low_remark}, ${range.normal_remark}, ${range.high_remark}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "10px 0px",
          justifyContent: "space-between",
        }}
      >
        <LoadingButton
          variant="contained"
          loading={isLoading}
          fullWidth
          onClick={details?.id ? updateParameter : createNewParameter}
        >
          Save
        </LoadingButton>
      </Box>
    </>
  );
};

export default ParameterForm;
