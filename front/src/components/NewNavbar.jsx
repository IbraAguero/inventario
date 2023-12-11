import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { tokens } from "../theme";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { setMode } from "../app/globalSlice";
import { StyledMenu } from "./styledComponents/StyledMenu";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import useAuth from "../hooks/useAuth";

const pages = [
  {
    label: "Inicio",
    route: "/",
  },
  {
    label: "Computadoras",
    route: "/computadoras",
  },
  {
    label: "Monitores",
    route: "/monitores",
  },
  {
    label: "Impresoras",
    route: "/impresoras",
  },
  {
    label: "Perifericos",
    route: "/perifericos",
  },
  {
    label: "Redes",
    route: "/redes",
  },
  {
    label: "Componentes",
    route: "/componentes",
  },
];

function NewNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { isAdministrador } = useAuth();

  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUsers = () => {
    handleCloseUserMenu();
    navigate("/usuarios");
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    navigate("/login");
    sendLogout();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: colors.primary[800] }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Inventario
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <StyledMenu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography
                    component={NavLink}
                    to={page.route}
                    textAlign="center"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </StyledMenu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Inventario
          </Typography>
          <Box
            sx={{
              justifyContent: "center",
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map(({ route, label }) => (
              <Button
                className="button-menu"
                component={NavLink}
                to={route}
                key={label}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  paddingLeft: 2,
                  paddingRight: 2,
                  color: "white",
                  display: "block",
                  borderRadius: "0",
                  textAlign: "center",
                  borderBottom: pathname === route && "2px solid #fff",
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
          <Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                sx={{ color: "#ffffff" }}
                onClick={() => dispatch(setMode())}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon sx={{ fontSize: "22px" }} />
                ) : (
                  <LightModeOutlinedIcon sx={{ fontSize: "22px" }} />
                )}
              </IconButton>
              <IconButton
                sx={{ color: "#ffffff" }}
                onClick={handleOpenUserMenu}
              >
                <AccountCircleOutlinedIcon sx={{ fontSize: "25px" }} />
              </IconButton>
              <StyledMenu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {isAdministrador && (
                  <MenuItem onClick={handleUsers}>
                    <GroupOutlinedIcon />
                    <Typography textAlign="center">Usuarios</Typography>
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon />
                  <Typography textAlign="center">Cerrar sesion</Typography>
                </MenuItem>
              </StyledMenu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NewNavbar;
