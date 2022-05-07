import { Button } from "@mui/material";
import { memo, useState } from "react";
import {
  CustomTable,
  DeleteDialog,
  NewLabReportDialog,
} from "../../components";
import { useNavigate } from "react-router-dom";

function createData(id, date, sample_id, patient_id, patient_name, test_date) {
  return {
    id,
    date,
    sample_id,
    patient_id,
    patient_name,
    test_date,
  };
}

const rows = [createData(1, "2022-2-2", 1, 1, "Name", "2022-2-2")];

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "sample_id",
    numeric: false,
    disablePadding: false,
    label: "Sample ID",
  },
  {
    id: "patient_id",
    numeric: false,
    disablePadding: false,
    label: "Patient ID",
  },
  {
    id: "patient_name",
    numeric: false,
    disablePadding: false,
    label: "Patient Name",
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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openLabReportDialog, setOpenLabReportDialog] = useState(false);
  return (
    <>
      <CustomTable
        tableConfig={{
          headCells: headCells,
          tableName: "Lab Report",
          maxHeight: "62vh",
          atom: "labReportTableAtom",
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
                setOpenLabReportDialog(true);
                // navigate("form");
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
                setOpenDeleteDialog(true);
              },
            },
          ],
          whenMoreThanOneSelected: [],
        }}
      />
      <DeleteDialog
        isOpen={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
        callback={() => {
          console.log("delete");
        }}
      />
      <NewLabReportDialog
        isOpen={openLabReportDialog}
        handleClose={() => setOpenLabReportDialog(false)}
        callback={() => {
          navigate("form/1", { state: { mode: "new" } });
        }}
      />
    </>
  );
};

export default LabReportTable;
