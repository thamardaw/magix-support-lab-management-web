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
import DetailsRow from "./DetailsRow";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";

const LabResultPreview = ({ height, isPreview = true }) => {
  // const [isEditMode, setIsEditMode] = useState(false);
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
            <DetailsRow name="Patient Name" value="Aung Aung" padding="0px" />
            {/* )} */}
          </Grid>
          <Grid item xs={12} md={6}>
            {/* {isEditMode ? (
              <TextField label="Date" size="small" placeholder="YYYY-MM-DD" />
            ) : ( */}
            <DetailsRow name="Date" value="2022-2-2" padding="0px" />
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
            <DetailsRow name="Patient Sex" value="male" padding="0px" />
            {/* )} */}
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsRow name="Sample ID" value="1" padding="0px" />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsRow name="Patient Age" value="19" padding="0px" />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsRow name="Sample Type" value="sample_type" padding="0px" />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsRow
              name="Patient Type"
              value="patient_type"
              padding="0px"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsRow name="Doctor" value="U Aye" padding="0px" />
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
              <TableRow
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
                    Electrolyte
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" padding="none">
                  Na
                </TableCell>
                <TableCell>10</TableCell>
                <TableCell>mmol/L</TableCell>
                <TableCell>8-11</TableCell>
                <TableCell>Over</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" padding="none">
                  Ca
                </TableCell>
                <TableCell>10</TableCell>
                <TableCell>mmol/L</TableCell>
                <TableCell>8-11</TableCell>
                <TableCell>Over</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" padding="none">
                  K
                </TableCell>
                <TableCell>10</TableCell>
                <TableCell>mmol/L</TableCell>
                <TableCell>8-11</TableCell>
                <TableCell>Over</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default LabResultPreview;
