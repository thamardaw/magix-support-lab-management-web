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
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
];

const TestCategoryTable = () => {
  const navigate = useNavigate();
  const api = useAxios({ autoSnackbar: true });
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const getData = async () => {
    setIsTableLoading(true);
    const res = await api.get("/api/test_categories/");
    if (res.status === 200) {
      const data = res.data.map((row) => {
        return {
          id: row.id,
          name: row.name,
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
      await api.delete(`/api/test_categories/${parseInt(selected[0].id)}`);
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
          tableName: "Test Category",
          maxHeight: "62vh",
          atom: "testCategoryTableAtom",
        }}
        data={rows}
        isLoading={isTableLoading}
        toolbarButtons={{
          whenNoneSelected: [
            {
              id: "test category table new button",
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
              id: "test category table edit button",
              component: memo(({ ...rest }) => (
                <Button variant="contained" size="small" {...rest}>
                  Edit
                </Button>
              )),
              callback: (selected) => {
                navigate(`form/${selected[0].id}`);
              },
            },
            {
              id: "test category table detail button",
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
              id: "test category table delete button",
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

export default TestCategoryTable;
