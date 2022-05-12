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
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "created_time",
    numeric: false,
    disablePadding: false,
    label: "Date & Time",
  },
];

const LabTestTable = () => {
  const navigate = useNavigate();
  const api = useAxios({ autoSnackbar: true });
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const getData = async () => {
    setIsTableLoading(true);
    const res = await api.get("/api/lab_tests");
    if (res.status === 200) {
      const data = res.data.map((row) => {
        const dateAndTime = `${row.created_time.split("T")[0]} ${new Date(
          row.created_time
        ).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}`;
        return {
          id: row.id,
          category: row?.test_category_?.name || "",
          name: row?.name || "",
          created_time: dateAndTime,
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
      await api.delete(`/api/lab_tests/${parseInt(selected[0].id)}`);
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
          tableName: "Lab Test",
          maxHeight: "62vh",
          atom: "labTestTableAtom",
        }}
        data={rows}
        isLoading={isTableLoading}
        toolbarButtons={{
          whenNoneSelected: [
            {
              id: "lab test table new button",
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
              id: "lab test table edit button",
              component: memo(({ ...rest }) => (
                <Button variant="contained" size="small" {...rest}>
                  Edit
                </Button>
              )),
              callback: (selected) => {
                navigate(`form/${selected[0].id}`, { state: { mode: "edit" } });
              },
            },
            {
              id: "lab test table detail button",
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
              id: "lab test table delete button",
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

export default LabTestTable;
