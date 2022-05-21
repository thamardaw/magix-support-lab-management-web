import {
  Autocomplete,
  Box,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useAxios } from "../hooks";
import labResultFormAtom from "../recoil/labResultForm";

// useEffect(() => {
//  setDetails({
//    ...details,
//    parameter_name: currentParameter?.name,
//    parameter_id: currentParameter?.id,
//    test_name: currentParameter?.lab_test_?.name,
//    unit: currentParameter?.unit,
//    lower_limit: "",
//    upper_limit: "",
//    result: "",
//  });
// setDetails({
//   ...details,
//   lower_limit: "",
//   upper_limit: "",
//   result: "",
// });
// setParameterRanges(currentParameter?.parameter_ranges || []);
// setResultDefaultTexts(currentParameter?.result_default_text || []);
// eslint-disable-next-line
// }, [currentParameter]);

const LabResultForm = ({ height, refreshData }) => {
  const api = useAxios({ autoSnackbar: true });
  const [parameters, setParameters] = useState([]);
  const [details, setDetails] = useRecoilState(labResultFormAtom);
  const resetLabResultFrom = useResetRecoilState(labResultFormAtom);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const getParameterData = async () => {
    const res = await api.get(`/api/parameters`);
    if (res.status === 200) {
      setParameters(res.data);
    }
  };

  // const prepareData = (cp) => {
  //   if (cp) {
  //     setParameterRanges(cp?.parameter_ranges || []);
  //     setResultDefaultTexts(cp?.result_default_text || []);
  //   }
  // };

  useEffect(() => {
    if (details?.parameter_id && details?.id) {
      setDetails({
        ...details,
        currentParameter: parameters.find(
          (d) => d?.id === details?.parameter_id
        ),
      });
    }
    // eslint-disable-next-line
  }, [details.parameter_id, details?.id]);

  useEffect(() => {
    if (details?.currentParameter?.result_type === "number") {
      const pr = details?.currentParameter?.parameter_ranges.filter((p) => {
        return (
          p.lower_limit.toString() === details?.lower_limit.toString() &&
          p.upper_limit.toString() === details?.upper_limit.toString()
        );
      });
      if (parseFloat(details?.lower_limit) > parseFloat(details?.result)) {
        setDetails({
          ...details,
          remark: pr[0]?.low_remark,
        });
      } else if (
        parseFloat(details?.upper_limit) < parseFloat(details?.result)
      ) {
        setDetails({
          ...details,
          remark: pr[0]?.high_remark,
        });
      } else {
        setDetails({
          ...details,
          remark: pr[0]?.normal_remark,
        });
      }
    }
    // eslint-disable-next-line
  }, [details.result, details.lower_limit, details.upper_limit]);

  useEffect(() => {
    getParameterData();
    refreshData();
    return () => resetLabResultFrom();
    // eslint-disable-next-line
  }, []);

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
          <Autocomplete
            fullWidth
            value={details?.currentParameter || null}
            options={parameters}
            getOptionLabel={(option) => `${option.name}`}
            renderOption={(props, option) => {
              return (
                <Box {...props} key={option.id}>
                  {option.name}
                </Box>
              );
            }}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            onChange={(event, newValue) => {
              setDetails({ ...details, currentParameter: newValue });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                fullWidth
                size="small"
                margin="normal"
              />
            )}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Result</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Autocomplete
            fullWidth
            freeSolo={true}
            options={details?.currentParameter?.result_default_text || []}
            inputValue={details?.result || ""}
            onInputChange={(event, newInputValue) => {
              setDetails({
                ...details,
                result: newInputValue,
              });
            }}
            value={details?.result || null}
            onChange={(event, newValue) => {
              setDetails({
                ...details,
                result: newValue,
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                size="small"
                margin="dense"
              />
            )}
          />
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
          <TextField
            select
            fullWidth
            value={
              !details?.currentParameter
                ? ""
                : details?.lower_limit || details?.upper_limit
                ? `${details?.lower_limit}-${details?.upper_limit}`
                : ""
            }
            // value={`${details?.lower_limit}-${details?.upper_limit}`}
            size="small"
            margin="dense"
            onChange={(e) => {
              if (e.target.value) {
                setDetails({
                  ...details,
                  lower_limit: e.target.value.split("-")[0],
                  upper_limit: e.target.value.split("-")[1],
                });
              }
            }}
          >
            {details?.currentParameter?.parameter_ranges
              ? details?.currentParameter?.parameter_ranges.map((pr) => (
                  <MenuItem value={`${pr?.lower_limit}-${pr?.upper_limit}`}>
                    {`${pr?.lower_limit}-${pr?.upper_limit}`}
                  </MenuItem>
                ))
              : [].map((pr) => (
                  <MenuItem value={`${pr?.lower_limit}-${pr?.upper_limit}`}>
                    {`${pr?.lower_limit}-${pr?.upper_limit}`}
                  </MenuItem>
                ))}
          </TextField>
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
            value={details?.remark || ""}
            onChange={handleChange}
          />
        </Box>
      </Box>
      {/* <LoadingButton
          variant="contained"
          loading={isLoading}
          fullWidth
          onClick={details?.id ? updateLabResult : createNewLabResult}
        >
          Save
        </LoadingButton> */}
    </Box>
  );
};

export default LabResultForm;
