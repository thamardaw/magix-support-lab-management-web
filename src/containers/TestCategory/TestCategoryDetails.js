import { Box, Divider, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton, DetailsRow } from "../../components";
import { useAxios } from "../../hooks";

const TestCategoryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useAxios({ autoSnackbar: true });
  const [details, setDetails] = useState({});

  const getData = async () => {
    const res = await api.get(`/api/test_categories/${parseInt(id)}`);
    if (res.status === 200) {
      setDetails({ ...res.data });
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    } else {
      navigate(-1);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          paddingLeft: "12px",
        }}
        variant="dense"
        disableGutters={true}
      >
        <BackButton backFunction={() => navigate(-1)} />
        <Typography variant="h5">Details</Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ flexDirection: "column", padding: "10px" }}>
        <DetailsRow name="ID" value={details?.id} />
        <DetailsRow name="Name" value={details?.name} />
      </Box>
    </Box>
  );
};

export default TestCategoryDetails;
