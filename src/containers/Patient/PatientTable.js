import { Button } from "@mui/material";
import { CustomTable } from "../../components";

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Fat (g)",
  },
  {
    id: "carbs",
    numeric: false,
    disablePadding: false,
    label: "Carbs (g)",
  },
  {
    id: "protein",
    numeric: false,
    disablePadding: false,
    label: "Protein (g)",
  },
];

const PatientTable = () => {
  return (
    <CustomTable
      tableConfig={{
        headCells: headCells,
        tableName: "Patient",
        maxHeight: "62vh",
      }}
      data={rows}
      toolbarButtons={{
        whenNoneSelected: [
          {
            id: "patient table new button",
            component: ({ ...rest }) => (
              <Button variant="outlined" size="small" {...rest}>
                New
              </Button>
            ),
            callback: (selected) => {
              console.log(selected);
            },
          },
        ],
        whenOneSelected: [
          {
            id: "patient table edit button",
            component: ({ ...rest }) => (
              <Button variant="contained" size="small" {...rest}>
                Edit
              </Button>
            ),
            callback: (selected) => {
              console.log(selected);
            },
          },
          {
            id: "patient table detail button",
            component: ({ ...rest }) => (
              <Button
                variant="contained"
                size="small"
                sx={{ marginLeft: "5px" }}
                {...rest}
              >
                Details
              </Button>
            ),
            callback: (selected) => {
              console.log(selected);
            },
          },
          {
            id: "patient table delete button",
            component: ({ ...rest }) => (
              <Button
                variant="contained"
                size="small"
                color="error"
                sx={{ marginLeft: "5px" }}
                {...rest}
              >
                Delete
              </Button>
            ),
            callback: (selected) => {
              console.log(selected);
            },
          },
        ],
        whenMoreThanOneSelected: [],
      }}
    />
  );
};

export default PatientTable;
