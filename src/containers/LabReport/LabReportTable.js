import { Button } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { CustomTable, DeleteDialog } from "../../components";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks";

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
  const api = useAxios({ autoSnackbar: true });
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const getData = async () => {
    setIsTableLoading(true);
    const res = await api.get("/api/lab_reports/");
    if (res.status === 200) {
      const data = res.data.map((row) => {
        return {
          id: row.id,
          date: row.created_time.split("T")[0],
          sample_id: row?.sample_id,
          patient_id: row?.patient?.patient_id,
          patient_name: row?.patient?.name || "",
          test_date: row?.test_date,
        };
      });
      setRows(data);
      setIsTableLoading(false);
    }
    return;
  };

  const deleteItem = async () => {
    if (selected.length === 0) {
      return;
    } else if (selected.length === 1) {
      await api.delete(`/api/lab_reports/${parseInt(selected[0].id)}`);
    }
    setOpenDeleteDialog(false);
    setSelected([]);
    getData();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

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
        isLoading={isTableLoading}
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
                navigate("form", { state: { mode: "new" } });
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
                navigate(`form/${selected[0].id}`, {
                  state: { mode: "edit" },
                });
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
                navigate(`details/${selected[0].id}`);
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
                setSelected(selected);
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
          deleteItem();
        }}
      />
    </>
  );
};

export default LabReportTable;
