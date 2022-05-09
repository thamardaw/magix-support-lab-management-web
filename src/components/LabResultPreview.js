import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import DetailsRow from "./DetailsRow";
import labResultFormAtom from "../recoil/labResultForm";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";

const LabResultPreview = ({ height, isPreview = true, data }) => {
  // const [isEditMode, setIsEditMode] = useState(false);
  const { labReport, labResult } = data;
  const [testList, setTestList] = useState([]);
  const [labResultForm, setLabResultForm] = useRecoilState(labResultFormAtom);
  const resetLabResultForm = useResetRecoilState(labResultFormAtom);

  const handleClick = (newSelected) => {
    if (isSelected(newSelected)) {
      resetLabResultForm();
    } else {
      setLabResultForm(newSelected);
    }
  };

  const isSelected = (row) => {
    return JSON.stringify(row) === JSON.stringify(labResultForm);
  };

  useEffect(() => {
    const tl = [...new Set(labResult.map((lr) => lr.test_name))];
    setTestList(tl);
  }, [labResult]);

  return (
    <>
      {isPreview && (
        <Box display="flex" alignItems="center">
          <Typography variant="h6">
            {/* {isEditMode ? "Edit" : "Preview"} */}
            Preview
          </Typography>
          {/* <IconButton
            color="primary"
            aria-label="edit"
            size="small"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? (
              <SaveIcon fontSize="small" />
            ) : (
              <EditIcon fontSize="small" />
            )}
          </IconButton> */}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "10px",
          height: { xs: !height || "600px", md: height },
          overflowY: isPreview && "auto",
          border: isPreview && "1px solid #ccc",
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            {/* {isEditMode ? (
              <TextField label="Patient Name" size="small" />
            ) : ( */}
            <DetailsRow
              name="Patient Name"
              value={labReport?.patient?.name}
              padding="0px"
            />
            {/* )} */}
          </Grid>
          <Grid item xs={12} md={6}>
            {/* {isEditMode ? (
              <TextField label="Date" size="small" placeholder="YYYY-MM-DD" />
            ) : ( */}
            <DetailsRow
              name="Date"
              value={labReport?.test_date}
              padding="0px"
            />
            {/* )} */}
          </Grid>
          <Grid item xs={12} md={6}>
            {/* {isEditMode ? (
              <TextField
                label="Patient Sex"
                size="small"
                placeholder="YYYY-MM-DD"
              />
            ) : ( */}
            <DetailsRow
              name="Patient Sex"
              value={labReport?.patient?.gender}
              padding="0px"
            />
            {/* )} */}
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsRow
              name="Sample ID"
              value={labReport?.sample_id}
              padding="0px"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsRow
              name="Patient Age"
              value={labReport?.patient?.age}
              padding="0px"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsRow
              name="Sample Type"
              value={labReport?.sample_type}
              padding="0px"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsRow
              name="Patient Type"
              value="patient_type"
              padding="0px"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsRow
              name="Doctor"
              value={labReport?.doctor_name}
              padding="0px"
            />
          </Grid>
        </Grid>
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="none">Paramter</TableCell>
                <TableCell>value</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Range</TableCell>
                <TableCell>Remark</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testList.map((test) => {
                return (
                  <>
                    <TableRow
                      key={test}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        colSpan={5}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "bold", padding: "10px 0px" }}
                        >
                          {test}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    {labResult.map((lr) => {
                      if (lr.test_name === test) {
                        const isItemSelected = isSelected(lr);
                        return (
                          <TableRow
                            selected={isItemSelected}
                            onClick={() => handleClick(lr)}
                            key={lr.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              {lr?.parameter_name}
                            </TableCell>
                            <TableCell>{lr?.result}</TableCell>
                            <TableCell>{lr?.unit}</TableCell>
                            <TableCell>{`${lr?.lower_limit || ""} - ${
                              lr?.upper_limit || ""
                            }`}</TableCell>
                            <TableCell>{lr.remark}</TableCell>
                          </TableRow>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default LabResultPreview;
