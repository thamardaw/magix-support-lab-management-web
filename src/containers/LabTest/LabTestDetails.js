import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { BackButton, DetailsRow, ParameterFormTable } from "../../components";
import { useAxios } from "../../hooks";
import parameterFormAtom from "../../recoil/parameterForm";

const LabTestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useAxios({ autoSnackbar: true });
  const [labTest, setLabTest] = useState({});
  const [parameter, setParameter] = useState([]);
  const parameterForm = useRecoilValue(parameterFormAtom);

  const getLabTestAndParameter = async () => {
    const [labTest, parameter] = await Promise.all([
      api.get(`/api/lab_tests/${id}`),
      api.get(`/api/parameters?lab_test_id=${id}`),
    ]);
    if (labTest.status === 200 && parameter.status === 200) {
      setLabTest(labTest.data);
      setParameter(parameter.data);
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    getLabTestAndParameter();
    // eslint-disable-next-line
  }, []);

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
        <DetailsRow name="Name" value={labTest?.name} />
        <DetailsRow name="Category" value={labTest?.test_category_?.name} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "35%" },
            }}
          >
            <Typography
              variant="p"
              sx={{ display: "block", fontWeight: 500, fontSize: "14px" }}
            >
              Parameter Name
            </Typography>
            <Typography
              variant="p"
              sx={{ display: "block", padding: "10px 0px", fontSize: "14px" }}
            >
              {parameterForm?.name || "-"}
            </Typography>
            <Typography
              variant="p"
              sx={{ display: "block", fontWeight: 500, fontSize: "14px" }}
            >
              Unit
            </Typography>
            <Typography
              variant="p"
              sx={{ display: "block", padding: "10px 0px", fontSize: "14px" }}
            >
              {parameterForm?.unit || "-"}
            </Typography>
            <Typography
              variant="p"
              sx={{ display: "block", fontWeight: 500, fontSize: "14px" }}
            >
              Result Type
            </Typography>
            <Typography
              variant="p"
              sx={{ display: "block", padding: "10px 0px", fontSize: "14px" }}
            >
              {parameterForm?.result_type || "-"}
            </Typography>
            <Typography
              variant="p"
              sx={{ display: "block", fontWeight: 500, fontSize: "14px" }}
            >
              Result Default Text
            </Typography>
            <Typography
              variant="p"
              sx={{
                display: "block",
                margin: "10px 0px",
                padding: "10px",
                fontSize: "14px",
                height: "60px",
                overflow: "auto",
                border: "1px solid #ccc",
              }}
            >
              {typeof parameterForm?.result_default_text === "string"
                ? "-"
                : parameterForm?.result_default_text.join(", ")}
            </Typography>
            <Typography
              variant="p"
              sx={{ display: "block", fontWeight: 500, fontSize: "14px" }}
            >
              Ranges
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                // padding: "10px 0px",
                margin: "10px 0px",
                height: "150px",
                overflowY: "scroll",
                border: "1px solid #ccc",
              }}
            >
              <List>
                {parameterForm?.parameter_ranges &&
                  parameterForm.parameter_ranges.map((pr) => (
                    <ListItem key={pr.id}>
                      <ListItemText
                        primary={`${pr?.lower_limit}-${pr?.upper_limit}`}
                        secondary="Low Remark, Normal Remark, High Remark"
                      />
                    </ListItem>
                  ))}
              </List>
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "65%" },
              padding: "0px 10px",
            }}
          >
            <ParameterFormTable height={470} data={parameter} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LabTestDetails;
