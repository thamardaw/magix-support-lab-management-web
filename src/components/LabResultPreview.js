import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import DetailsRow from "./DetailsRow";
import labResultFormAtom from "../recoil/labResultForm";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAxios } from "../hooks";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import { useNavigate } from "react-router-dom";
import LetterHead from "./LetterHead";
import capitalize from "../utils/capitalize";
import padZero from "../utils/padZero";

// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";

const LabResultPreview = (
  {
    height,
    isPreview = true,
    data,
    refreshData,
    enableDelete = false,
    isPrintMode = false,
  },
  ref
) => {
  // const [isEditMode, setIsEditMode] = useState(false);
  const api = useAxios({ autoSnackbar: true });
  const navigate = useNavigate();
  const { labReport, labResult } = data;
  const [testList, setTestList] = useState([]);
  const [labResultForm, setLabResultForm] = useRecoilState(labResultFormAtom);
  const resetLabResultForm = useResetRecoilState(labResultFormAtom);

  const deleteParameter = async (id) => {
    const res = await api.delete(`/api/lab_reports/result/${id}`);
    if (res.status === 200) {
      refreshData();
      resetLabResultForm();
    }
    return;
  };

  const removeDuplicateObjectFromArray = (array, key) => {
    let check = new Set();
    return array.filter((obj) => !check.has(obj[key]) && check.add(obj[key]));
  };

  useEffect(() => {
    if (labResult) {
      const tl = [
        ...removeDuplicateObjectFromArray(
          labResult.map((lr) => {
            return {
              test_name: lr?.test_name,
              test_id: lr?.test_id,
              test: lr?.test,
            };
          }),
          "test_name"
        ),
      ];
      setTestList(tl);
    }
    return () => resetLabResultForm();
    // eslint-disable-next-line
  }, [labResult]);

  return (
    <>
      {isPreview && (
        <Box display="flex" alignItems="center">
          <Typography variant="h6">
            {/* {isEditMode ? "Edit" : "Preview"} */}
            Preview
          </Typography>
          <IconButton
            color="primary"
            disabled={labReport?.id === undefined}
            onClick={() =>
              navigate(`/dashboard/lab_report/details/${labReport?.id}`, {
                state: { goBack: true },
              })
            }
          >
            <SettingsOverscanIcon />
          </IconButton>
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
        ref={ref}
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
        <LetterHead isPreview={isPreview} isPrintMode={isPrintMode} />
        <Box paddingLeft="10px" paddingRight="10px" width="100%">
          <Grid container alignItems="flex-start" sx={{ marginBottom: "8px" }}>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              {/* {isEditMode ? (
              <TextField label="Patient Name" size="small" />
            ) : ( */}
              <DetailsRow
                name="Name"
                value={labReport?.patient?.name}
                padding="0px"
                marginV="2px"
              />
              {/* )} */}
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              {/* {isEditMode ? (
              <TextField
                label="Patient Sex"
                size="small"
                placeholder="YYYY-MM-DD"
              />
            ) : ( */}
              <DetailsRow
                name="Patient ID"
                value={labReport?.patient?.patient_id}
                padding="0px"
                marginV="2px"
              />
              {/* )} */}
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              <DetailsRow
                name="Sample Type"
                value={labReport?.sample_type}
                padding="0px"
                marginV="2px"
              />
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              {/* {isEditMode ? (
              <TextField
                label="Patient Sex"
                size="small"
                placeholder="YYYY-MM-DD"
              />
            ) : ( */}
              <DetailsRow
                name="Gender"
                value={capitalize(labReport?.patient?.gender)}
                padding="0px"
                marginV="2px"
              />
              {/* )} */}
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              <DetailsRow
                name="Sample ID"
                value={labReport?.sample_id && padZero(labReport?.sample_id)}
                padding="0px"
                marginV="2px"
              />
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              <DetailsRow
                name="Patient Type"
                value={labReport?.patient_type}
                padding="0px"
                marginV="2px"
              />
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              <DetailsRow
                name="Age"
                value={labReport?.patient?.age}
                padding="0px"
                marginV="2px"
              />
            </Grid>

            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              <DetailsRow
                name="Refer Dr."
                value={labReport?.doctor_name}
                padding="0px"
                marginV="2px"
              />
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              {/* {isEditMode ? (
              <TextField label="Date" size="small" placeholder="YYYY-MM-DD" />
            ) : ( */}
              <DetailsRow
                name="Test Time"
                value={labReport?.test_date}
                padding="0px"
                marginV="2px"
              />
              {/* )} */}
            </Grid>
          </Grid>
          <TableContainer>
            <Table
              size="small"
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: "none",
                },
              }}
            >
              <TableHead>
                <TableRow
                  style={{
                    borderTop: "2px solid black",
                    borderBottom: "2px solid black",
                  }}
                >
                  <TableCell
                    padding="none"
                    sx={{
                      minWidth: "120px",
                    }}
                  >
                    Parameter
                  </TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Ref.range</TableCell>
                  <TableCell>Remark</TableCell>
                  {enableDelete && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <Box
                sx={{
                  height: "10px",
                }}
              />
              <TableBody>
                {testList.map((test) => {
                  return (
                    <>
                      <TableRow
                        key={test.test_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          display: test?.test?.show_in_report_form
                            ? "block"
                            : "none",
                        }}
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
                            {test.test_name}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {labResult.map((lr) => {
                        if (lr.test_name === test.test_name) {
                          return (
                            <TableRow
                              key={lr.id}
                              selected={labResultForm?.id === lr?.id}
                              onClick={() => {
                                if (lr.id === labResultForm.id) {
                                  resetLabResultForm();
                                } else {
                                  setLabResultForm({
                                    ...lr,
                                  });
                                }
                              }}
                              sx={{
                                // border: 0,
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                              <TableCell>
                                {(() => {
                                  if (lr?.lower_limit || lr?.upper_limit) {
                                    return `${lr?.lower_limit || "0"} - ${
                                      lr?.upper_limit || "0"
                                    }`;
                                  }
                                })()}
                              </TableCell>
                              <TableCell>{lr.remark}</TableCell>
                              {enableDelete && (
                                <TableCell maxwidth="4px">
                                  <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => deleteParameter(lr?.id)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              )}
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
      </Box>
    </>
  );
};

export default forwardRef(LabResultPreview);
