import { FC } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import { getLogout } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "@/utils/helper/useCookie";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  toggleDrawer?: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header: FC<AppBarProps> = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await getLogout();
    },
    onSuccess: (res) => {
      if (res.status == 200) {
        removeCookie("token");
        navigate("/login");
      }
    },
    onError: (error) => {
      if (error) {
        removeCookie("token");
      }
    },
  });

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{ pr: "24px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={() => mutation.mutate()} color="inherit">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
