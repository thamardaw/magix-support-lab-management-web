import PropTypes from "prop-types";
import { alpha, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled("div")(({ theme, padding = "10px" }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  margin: "10px 0px",
  padding: padding,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
  },
}));

const DetailsRow = ({
  leftWidth = "30%",
  rightWidth = "70%",
  textVariant = "body2",
  padding,
  name,
  value,
}) => {
  return (
    <StyledBox padding={padding}>
      <Box sx={{ width: leftWidth }}>
        <Typography variant={textVariant} sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
      </Box>
      <Box
        sx={{
          width: `calc(${rightWidth} - 5px)`,
          marginLeft: "5px",
          wordWrap: "break-word",
        }}
      >
        <Typography variant={textVariant}>{value}</Typography>
      </Box>
    </StyledBox>
  );
};

DetailsRow.propTypes = {
  leftWidth: PropTypes.string,
  rightWidth: PropTypes.string,
  textVariant: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
};

export default DetailsRow;
