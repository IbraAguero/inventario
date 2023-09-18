import {
  Box,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { tokens } from '../theme';
import { NavLink, useLocation } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { StyledMenu } from './styledComponents/StyledMenu';
import { setMode } from '../app/globalSlice';
import { useDispatch } from 'react-redux';

const routes = [
  {
    label: 'Inicio',
    route: '',
  },
  {
    label: 'Computadoras',
    route: '/computadoras',
  },
  {
    label: 'Monitores',
    route: '/monitores',
  },
  {
    label: 'Impresoras',
    route: '/impresoras',
  },
  {
    label: 'Perifericos',
    route: '/perifericos',
  },
  {
    label: 'Redes',
    route: '/redes',
  },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  //const colorMode = useContext(ColorModeContext);

  const [value, setValue] = useState(-1);

  //const location = useLocation();

  /* const foundRoute = routes.find((route) => route.route === location.pathname);

  useEffect(() => {
    if (foundRoute) {
      setValue(routes.indexOf(foundRoute));
    } else {
      setValue(0);
    }
  }, [location]); */

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    sendLogout();
  };

  return (
    <>
      <Box
        //position="fixed"
        //width="100%"
        component="nav"
        p={1}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        bgcolor={colors.primary[800]}
      >
        <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant="h4"
            component="h2"
            marginLeft={1}
            fontWeight="700"
          >
            Inventario
          </Typography>
        </NavLink>
        <Box display="flex" marginRight={1}>
          <IconButton
            sx={{ color: '#ffffff' }}
            onClick={() => dispatch(setMode())}
          >
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlinedIcon sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlinedIcon sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          <IconButton
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ color: '#ffffff' }}
          >
            <PersonOutlinedIcon />
          </IconButton>
          <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon />
              Cerrar sesion
            </MenuItem>
          </StyledMenu>
        </Box>
      </Box>
      <Box
        //position="fixed"
        //width="100%"
        //top={55}
        bgcolor={colors.primary[700]}
        display={'flex'}
        gap={3}
        justifyContent={'center'}
      >
        <Tabs value={value} onChange={handleChange}>
          {routes.map((el, index) => (
            <Tab
              label={el.label}
              component={NavLink}
              to={el.route}
              key={index}
            />
          ))}
        </Tabs>
      </Box>
    </>
  );
};

export default Navbar;
