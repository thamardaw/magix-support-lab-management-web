import { Avatar, Box, Typography } from "@mui/material";
import Logo from "./Logo";
import React from "react";
import { constants } from "../utils/constants";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import DraftsIcon from "@mui/icons-material/Drafts";

const LetterHead = ({ isPreview, isPrintMode }) => {
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
          <Box width="150px" height="160px">
            <Logo width="100%" height="100%" />
          </Box>
          <Box display="flex" flexDirection="Column" justifyContent="center">
            <Typography variant="h6">{constants.name}</Typography>
            <Typography fontSize="0.9rem">{constants.hospital_desc}</Typography>
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
              {constants.hospital_phones}
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
              {constants.hospital_address}
            </Typography>
          </Box>
          <Box
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
          </Box>
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

export default React.memo(LetterHead);
