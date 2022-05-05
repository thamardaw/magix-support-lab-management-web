import styled from "@emotion/styled";
import {
  Box,
  Divider,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton, ParameterForm } from "../../components";

const StyledTableCell = styled(TableCell)(({ theme, maxwidth }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#EBEBEB",
  },
  wordWrap: "break-word",
  maxWidth: maxwidth,
}));

const LabTestForm = () => {
  const { id } = useParams();
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
        <Typography variant="h5">{id ? "Edit" : "New"}</Typography>
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
            <ParameterForm />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "65%" },
              padding: "0px 10px",
            }}
          >
            <TableContainer
              sx={{
                height: 560,

                border: "1px solid #ccc",
              }}
            >
              <Table
                aria-label="simple table"
                size="small"
                stickyHeader
                sx={{ minWidth: 380 }}
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell maxwidth="15px">
                      Parameter Name
                    </StyledTableCell>
                    <StyledTableCell maxwidth="15px">Unit</StyledTableCell>
                    <StyledTableCell maxwidth="20px">Ranges</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <StyledTableCell maxwidth="15px">
                      parameter_name
                    </StyledTableCell>
                    <StyledTableCell maxwidth="15px">unit</StyledTableCell>
                    <StyledTableCell maxwidth="20px">ranges</StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LabTestForm;
