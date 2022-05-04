import { Button } from "@mui/material";
import { memo, useState } from "react";
import { CustomTable, DeleteDialog } from "../../components";
import { useNavigate } from "react-router-dom";

function createData(id, name) {
  return {
    id,
    name,
  };
}

const rows = [createData(1, "Aung Aung")];

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
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <CustomTable
        tableConfig={{
          headCells: headCells,
          tableName: "Test Category",
          maxHeight: "62vh",
        }}
        data={rows}
        isLoading={false}
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
                navigate("form/1");
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
                navigate("details/1");
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

export default TestCategoryTable;
