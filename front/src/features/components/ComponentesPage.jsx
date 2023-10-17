import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material';
import useTitle from '../../hooks/useTitle';
import { tokens } from '../../theme';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ComponentsPage = () => {
  useTitle('Componentes | Inventario');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        bgcolor={colors.primary[700]}
        margin={1}
        marginTop={3}
        borderRadius={3}
        boxShadow={8}
        height="8vh"
        display="flex"
        flexDirection="column"
      >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Placa Madre" {...a11yProps(0)} />
          <Tab label="CPU" {...a11yProps(1)} />
          <Tab label="RAM" {...a11yProps(2)} />
          <Tab label="Disco Duro" {...a11yProps(3)} />
          <Tab label="Tarjeta Grafica" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <Box
        bgcolor={colors.primary[700]}
        margin={1}
        marginTop={3}
        borderRadius={3}
        boxShadow={8}
        height="70vh"
        display="flex"
        flexDirection="column"
      >
        <CustomTabPanel value={value} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </>
  );
};
export default ComponentsPage;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
