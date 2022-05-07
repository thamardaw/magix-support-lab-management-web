import {
  Box,
  Divider,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  BackButton,
  ParameterForm,
  ParameterFormTable,
} from "../../components";

const LabTestForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    category: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          paddingLeft: "12px",
        }}
        variant="dense"
        disableGutters={true}
      >
        <BackButton backFunction={() => navigate(-1)} />
        <Typography variant="h5">
          {location.state?.mode === "new" ? "New" : "Edit"}
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ flexDirection: "column", padding: "10px" }}>
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
            value={details?.category || ""}
            name="category"
            onChange={handleChange}
          >
            <MenuItem value="1">Test Category</MenuItem>
          </TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "14px 0px",
          }}
        >
          <Typography variant="p" fontWeight="bold">
            Parameter
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "35%" },
            }}
          >
            <ParameterForm height={540} />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "65%" },
              padding: "0px 10px",
            }}
          >
            <ParameterFormTable
              // height={location.state?.mode === "new" ? 557 : 511}
              height={540}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LabTestForm;
