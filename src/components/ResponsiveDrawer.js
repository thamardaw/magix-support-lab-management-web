import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import drawerAtom from "../recoil/drawer";
import { useRecoilState } from "recoil";

const ResponsiveDrawer = ({ window, drawerWidth }) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [selectedPath, setSelectedPath] = useState("patient");
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useRecoilState(drawerAtom);

  const handleClick = (path) => {
    return (e) => {
      setSelectedPath(path);
      navigate(path);
    };
  };

  const drawer = (
    <>
      <Toolbar />
      <List component="nav" aria-label="Main Menu">
        <ListItem>
          <Typography variant="overline" display="block">
            Menu
          </Typography>
        </ListItem>
        <ListItemButton
          selected={selectedPath.includes("patient")}
          onClick={handleClick("patient")}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Patient" />
        </ListItemButton>
        <ListItemButton
          selected={selectedPath.includes("test_category")}
          onClick={handleClick("test_category")}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Test Category" />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen((prev) => !prev)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default React.memo(ResponsiveDrawer);
