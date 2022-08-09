import { Avatar, Box, Typography } from "@mui/material";
import Logo from "./Logo";
import React from "react";
import { constants } from "../utils/constants";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
// import DraftsIcon from "@mui/icons-material/Drafts";

const KTM = ({ isPreview, isPrintMode }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isPrintMode
            ? "row"
            : {
                xs: "column",
                sm: "column",
                md: "row",
              },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            flex: 1,
          }}
        >
          <Box width="150px" height="150px">
            <Logo width="100%" height="100%" />
          </Box>
          <Box display="flex" flexDirection="Column" justifyContent="center">
            <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
              {constants.name_bur}
            </Typography>
            <Typography fontSize="0.9rem">
              {constants.hospital_desc_bur}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: isPrintMode
              ? "flex"
              : { xs: "none", sm: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{ width: "4px", height: "120px", backgroundColor: "#8CC63F" }}
          ></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "Column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{ display: "flex", margin: "5px 10px", alignItems: "center" }}
          >
            <Avatar
              sx={{
                bgcolor: "#1976d2",
                width: 32,
                height: 32,
              }}
              variant="rounded"
            >
              <PhoneIcon />
            </Avatar>
            <Typography
              sx={{ paddingLeft: "4px" }}
              fontSize={isPreview ? "0.8rem" : "0.9rem"}
            >
              {constants.hospital_phones_bur}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", margin: "5px 10px", alignItems: "center" }}
          >
            <Avatar
              sx={{ bgcolor: "#1976d2", width: 32, height: 32 }}
              variant="rounded"
            >
              <HomeIcon />
            </Avatar>
            <Typography
              sx={{ paddingLeft: "4px" }}
              fontSize={isPreview ? "0.8rem" : "0.9rem"}
            >
              {constants.hospital_address_bur}
            </Typography>
          </Box>
          {/* <Box
            sx={{ display: "flex", margin: "5px 10px", alignItems: "center" }}
          >
            <Avatar
              sx={{ bgcolor: "#1976d2", width: 32, height: 32 }}
              variant="rounded"
            >
              <DraftsIcon />
            </Avatar>
            <Box display="flex" flexDirection="column">
              <Typography
                sx={{ paddingLeft: "4px" }}
                fontSize={isPreview ? "0.8rem" : "0.9rem"}
              >
                {constants.hospital_email}
              </Typography>
              <Typography
                sx={{ paddingLeft: "4px", wordBreak: "break-all" }}
                fontSize={isPreview ? "0.8rem" : "0.9rem"}
              >
                {constants.hospital_fb}
              </Typography>
            </Box>
          </Box> */}
        </Box>
      </Box>
      <Box
        sx={{
          height: "4px",
          backgroundColor: "#8CC63F",
          margin: "8px 8px 8px 8px",
        }}
      ></Box>
    </Box>
  );
};

const ATD = ({ isPreview, isPrintMode }) => {
  return (
    <Box sx={{ width: "100%", marginBottom: "8px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isPrintMode
            ? "row"
            : {
                xs: "column",
                sm: "column",
                md: "row",
              },
        }}
      >
        <Box width="100px" height="100px">
          <Logo width="100%" height="100%" />
        </Box>
        <Box width="8px" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            textAlign="center"
            fontSize={isPreview ? "0.95rem" : "1.2rem"}
            color="#DA1F2F"
            fontWeight="bold"
          >
            {constants.name} {constants.hospital_desc}
          </Typography>
          <Typography
            textAlign="center"
            fontSize={isPreview ? "0.8rem" : "0.9rem"}
            fontWeight="bold"
          >
            {constants.hospital_address}
          </Typography>
          <Typography
            textAlign="center"
            fontSize={isPreview ? "0.8rem" : "0.9rem"}
            fontWeight="bold"
          >
            Tel : {constants.hospital_phones}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const GB = ({ isPreview, isPrintMode }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isPrintMode
            ? "row"
            : {
                xs: "column",
                sm: "column",
                md: "row",
              },
        }}
      >
        <Box width="90px" height="90px">
          <Logo width="100%" height="100%" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { sm: "100%", md: "60%" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            textAlign="center"
            fontSize={isPreview ? "0.95rem" : "1.2rem"}
            fontWeight={600}
          >
            {constants.name_bur} {constants.hospital_desc_bur}
          </Typography>
          <Typography
            textAlign="center"
            fontSize={isPreview ? "0.8rem" : "0.9rem"}
            fontWeight={600}
          >
            {constants.hospital_address_bur}
          </Typography>
          <Typography
            textAlign="center"
            fontSize={isPreview ? "0.8rem" : "0.9rem"}
            fontWeight="bold"
          >
            {constants.hospital_phones}
          </Typography>
          <Typography
            textAlign="center"
            fontSize={isPreview ? "0.8rem" : "0.9rem"}
            fontWeight={600}
          >
            "ရွှင်လန်း ကျန်းမာ အားထားရာ ကမ္ဘာ"
          </Typography>
        </Box>
        <Box
          width="90px"
          height="90px"
          sx={{
            display: isPrintMode
              ? "block"
              : { xs: "none", sm: "none", md: "block" },
          }}
        >
          <Logo width="100%" height="100%" />
        </Box>
      </Box>
      <Box
        sx={{
          height: "2px",
          backgroundColor: "black",
          margin: "16px 100px 16px 100px",
        }}
      ></Box>
    </Box>
  );
};

const LetterHead = ({ isPreview, isPrintMode }) => {
  if (constants.hospital_logo === "/logos/ktm_logo.png")
    return <KTM isPreview={isPreview} isPrintMode={isPrintMode} />;
  if (constants.hospital_logo === "/logos/atd_logo.png")
    return <ATD isPreview={isPreview} isPrintMode={isPrintMode} />;
  if (constants.hospital_logo === "/logos/gb_logo.jpg")
    return <GB isPreview={isPreview} isPrintMode={isPrintMode} />;
};

export default React.memo(LetterHead);
