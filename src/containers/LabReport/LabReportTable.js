import { Button } from "@mui/material";
import { memo, useState } from "react";
import { CustomTable, DeleteDialog } from "../../components";
import { useNavigate } from "react-router-dom";

function createData(
  id,
  patient_id,
  doctor_name,
  sample_id,
  sample_type,
  patient_type,
  test_date
) {
  return {
    id,
    patient_id,
    doctor_name,
    sample_id,
    sample_type,
    patient_type,
    test_date,
  };
}

const rows = [createData(1, 1, "Aye Aye", 1, "Type", "Type", "2022-2-2")];

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "patient_id",
    numeric: false,
    disablePadding: false,
    label: "Patient ID",
  },
  {
    id: "doctor_name",
    numeric: false,
    disablePadding: false,
    label: "Doctor Name",
  },
  {
    id: "sample_id",
    numeric: false,
    disablePadding: false,
    label: "Sample ID",
  },
  {
    id: "sample_type",
    numeric: false,
    disablePadding: false,
    label: "Sample Type",
  },
  {
    id: "patient_type",
    numeric: false,
    disablePadding: false,
    label: "Patient Type",
  },
  {
    id: "test_date",
    numeric: false,
    disablePadding: false,
    label: "Test Date",
  },
];

const LabReportTable = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <CustomTable
        tableConfig={{
          headCells: headCells,
          tableName: "Lab Report",
          maxHeight: "62vh",
        }}
        data={rows}
        isLoading={false}
        toolbarButtons={{
          whenNoneSelected: [
            {
              id: "lab report table new button",
              component: memo(({ ...rest }) => (
                <Button variant="outlined" size="small" {...rest}>
                  New
                </Button>
              )),
              callback: (selected) => {
                navigate("form");
              },
            },
          ],
          whenOneSelected: [
            {
              id: "lab report table edit button",
              component: memo(({ ...rest }) => (
                <Button variant="contained" size="small" {...rest}>
                  Edit
                </Button>
              )),
              callback: (selected) => {
                navigate("form/1");
              },
            },
            {
              id: "lab report table detail button",
              component: memo(({ ...rest }) => (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ marginLeft: "5px" }}
                  {...rest}
                >
                  Details
                </Button>
              )),
              callback: (selected) => {
                navigate("details/1");
              },
            },
            {
              id: "lab report table delete button",
              component: memo(({ ...rest }) => (
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  sx={{ marginLeft: "5px" }}
                  {...rest}
                >
                  Delete
                </Button>
              )),
              callback: (selected) => {
                setOpenDialog(true);
              },
            },
          ],
          whenMoreThanOneSelected: [],
        }}
      />
      <DeleteDialog
        isOpen={openDialog}
        handleClose={() => setOpenDialog(false)}
        callback={() => {
          console.log("delete");
        }}
      />
    </>
  );
};

export default LabReportTable;
