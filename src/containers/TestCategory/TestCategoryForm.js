import { LoadingButton } from "@mui/lab";
import { Box, Divider, TextField, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "../../components";
import { useAxios } from "../../hooks";

const TestCategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useAxios({ autoSnackbar: true });
  const [isLoading, setIsLoading] = useState(false);

  const [details, setDetails] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    const res = await api.get(`/api/test_categories/${parseInt(id)}`);
    if (res.status === 200) {
      setDetails({ ...res.data });
    } else {
      navigate(-1);
    }
  };

  const createNew = async () => {
    setIsLoading(true);
    const res = await api.post(`/api/test_categories/`, {
      ...details,
    });
    if (res.status === 200) {
      navigate(-1);
    }
    setIsLoading(false);
  };

  const update = async () => {
    setIsLoading(true);
    const res = await api.put(`/api/test_categories/${parseInt(id)}`, {
      ...details,
    });
    if (res.status === 200) {
      navigate(-1);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      getData();
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
        <Typography variant="h5">{id ? "Edit" : "New"}</Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ flexDirection: "column", padding: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography variant="p">Name</Typography>
          </Box>
          <TextField
            size="small"
            sx={{ width: "70%" }}
            margin="dense"
            value={details?.name || ""}
            name="name"
            onChange={handleChange}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
        <LoadingButton
          variant="contained"
          loading={isLoading}
          size="small"
          sx={{ marginRight: "5px" }}
          onClick={id ? update : createNew}
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default TestCategoryForm;
