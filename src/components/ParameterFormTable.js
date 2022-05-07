import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme, maxwidth }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#EBEBEB",
  },
  wordWrap: "break-word",
  maxWidth: maxwidth,
}));

const ParameterFormTable = ({ height }) => {
  return (
    <TableContainer
      sx={{
        height: height,
        border: "1px solid #ccc",
      }}
    >
      <Table
        aria-label="simple table"
        size="small"
        stickyHeader
        sx={{ minWidth: 380 }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell maxwidth="15px">Parameter Name</StyledTableCell>
            <StyledTableCell maxwidth="15px">Unit</StyledTableCell>
            <StyledTableCell maxwidth="20px">Ranges</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <StyledTableCell maxwidth="15px">parameter_name</StyledTableCell>
            <StyledTableCell maxwidth="15px">unit</StyledTableCell>
            <StyledTableCell maxwidth="20px">ranges</StyledTableCell>
          </TableRow>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <StyledTableCell maxwidth="15px">parameter_name</StyledTableCell>
            <StyledTableCell maxwidth="15px">unit</StyledTableCell>
            <StyledTableCell maxwidth="20px">ranges</StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ParameterFormTable;
