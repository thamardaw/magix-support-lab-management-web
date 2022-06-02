import { styled } from "@mui/material/styles";
import {
  IconButton,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { useAxios } from "../hooks";

const StyledTableCell = styled(TableCell)(({ theme, maxwidth }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#EBEBEB",
  },
  wordWrap: "break-word",
  maxWidth: maxwidth,
}));

const ParameterFormTable = ({
  height,
  data,
  refreshData,
  enableDelete = false,
}) => {
  const api = useAxios({ autoSnackbar: true });
  const [parameterForm, setParameterForm] = useRecoilState(parameterFormAtom);
  const resetParameterFrom = useResetRecoilState(parameterFormAtom);
  const [rows, setRows] = useState([]);

  const deleteParameter = async (id) => {
    resetParameterFrom();
    const res = await api.delete(`/api/parameters/${id}`);
    if (res.status === 200) {
      refreshData();
    }
    return;
  };

  useEffect(() => {
    setRows(data || []);
    if (parameterForm.id) {
      setParameterForm(data.find((d) => d.id === parameterForm.id));
    }
    return () => resetParameterFrom();
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
            <StyledTableCell maxwidth="20px">Parameter Name</StyledTableCell>
            <StyledTableCell maxwidth="15px">Unit</StyledTableCell>
            <StyledTableCell maxwidth="20px">Ranges</StyledTableCell>
            {enableDelete && (
              <StyledTableCell maxwidth="4px">Actions</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              selected={row.id === parameterForm?.id}
              onClick={() => {
                if (row.id === parameterForm?.id) {
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
              <StyledTableCell maxwidth="20px">{row?.name}</StyledTableCell>
              <StyledTableCell maxwidth="15px">{row?.unit}</StyledTableCell>
              <StyledTableCell maxwidth="20px">
                {row.parameter_ranges
                  .map((pr) => `${pr?.lower_limit}-${pr?.upper_limit}`)
                  .join(", ")}
              </StyledTableCell>
              {enableDelete && (
                <StyledTableCell maxwidth="4px">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteParameter(row?.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ParameterFormTable;
