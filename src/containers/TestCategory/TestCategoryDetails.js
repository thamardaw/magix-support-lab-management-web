import { Box, Button, Divider, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton, DeleteDialog, DetailsRow } from "../../components";
import { useAxios } from "../../hooks";

const TestCategoryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useAxios({ autoSnackbar: true });
  const [details, setDetails] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const getData = async () => {
    const res = await api.get(`/api/test_categories/${parseInt(id)}`);
    if (res.status === 200) {
      setDetails({ ...res.data });
    }
  };

  const deleteItem = async () => {
    const res = await api.delete(`/api/test_categories/${parseInt(id)}`);
    if (res.status === 200) {
      setOpenDeleteDialog(false);
      navigate(-1);
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
    <>
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
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Details
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{ marginRight: "5px" }}
            onClick={() => navigate(`/dashboard/test_category/form/${id}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{ marginRight: "5px" }}
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete
          </Button>
        </Toolbar>
        <Divider />
        <Box sx={{ flexDirection: "column", padding: "10px" }}>
          <DetailsRow name="ID" value={details?.id} />
          <DetailsRow name="Name" value={details?.name} />
        </Box>
      </Box>
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

export default TestCategoryDetails;
