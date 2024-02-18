import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { mainListItems } from "./ListItems";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import { ListItem } from "@mui/material";
import React, { FC, useEffect } from "react";

const drawerWidth: number = 240;

interface Props {
  open: boolean;
  toggleDrawer: () => void;
}

const Sidebar: FC<Props> = ({ open, toggleDrawer }) => {
  const location = useLocation();
  const { pathname } = location;
  const [currentPath, setCurrentPath] = React.useState("");
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const StyledDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  return (
    <StyledDrawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems.map((item, index) => (
          <Link
            key={index}
            to={`${item.path}`}
            style={{ textDecoration: "none" }}
          >
            <ListItem
              button
              sx={{
                bgcolor: item.path === currentPath ? "#1976d2" : "white",
                color: item.path === currentPath ? "white" : "#616161",
              }}
            >
              <ListItemIcon
                sx={{ color: item.path === currentPath ? "white" : "#616161" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;