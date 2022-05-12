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
import { useEffect, useState } from "react";
import parameterFormAtom from "../recoil/parameterForm/atom";
import { useRecoilState, useResetRecoilState } from "recoil";

const StyledTableCell = styled(TableCell)(({ theme, maxwidth }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#EBEBEB",
  },
  wordWrap: "break-word",
  maxWidth: maxwidth,
}));

const ParameterFormTable = ({ height, data }) => {
  const [parameterForm, setParameterForm] = useRecoilState(parameterFormAtom);
  const resetParameterFrom = useResetRecoilState(parameterFormAtom);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(data || []);
    if (parameterForm.id) {
      setParameterForm(data.find((d) => d.id === parameterForm.id));
    }
    // eslint-disable-next-line
  }, [data]);

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
          {rows.map((row) => (
            <TableRow
              selected={row.id === parameterForm.id}
              onClick={() => {
                if (row.id === parameterForm.id) {
                  resetParameterFrom();
                } else {
                  setParameterForm({ ...row });
                }
              }}
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <StyledTableCell maxwidth="15px">{row.name}</StyledTableCell>
              <StyledTableCell maxwidth="15px">{row.unit}</StyledTableCell>
              <StyledTableCell maxwidth="20px">
                {row.parameter_ranges
                  .map((pr) => `${pr?.lower_limit}-${pr?.upper_limit}`)
                  .join(", ")}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ParameterFormTable;
