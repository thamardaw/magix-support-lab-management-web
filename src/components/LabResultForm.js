import { Box, Button, TextField, Typography } from "@mui/material";

const LabResultForm = ({ height }) => {
  return (
    <Box sx={{ height: height, overflowY: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Parameter</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField fullWidth name="parameter" size="small" margin="dense" />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Value</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField fullWidth name="value" size="small" margin="dense" />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Range</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField fullWidth name="range" size="small" margin="dense" />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Remark</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            multiline
            rows={3}
            name="remark"
            size="small"
            margin="dense"
          />
        </Box>
      </Box>
      <Box
        sx={{
          padding: "10px 0px",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" fullWidth>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default LabResultForm;
