import { Box, Button, Tab, Tabs, useTheme } from "@mui/material";
import useTitle from "../../hooks/useTitle";
import { tokens } from "../../theme";
import { useState } from "react";
import PropTypes from "prop-types";
import CpuDataGrid from "./CpuDataGrid";
import MotherboardDataGrid from "./MotherboardDataGrid";
import ComponentsForm from "./ComponentsForm";
import RamDataGrid from "./RamDataGrid";
import HddDataGrid from "./HddDataGrid";
import GraphicCardDataGrid from "./GraphicCardDataGrid";

const ComponentsPage = () => {
  useTitle("Componentes | Inventario");

  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabContent = (tabValue) => {
    switch (tabValue) {
      case 0:
        return <MotherboardDataGrid />;
      case 1:
        return <CpuDataGrid />;
      case 2:
        return <RamDataGrid />;
      case 3:
        return <HddDataGrid />;
      case 4:
        return <GraphicCardDataGrid />;
      default:
        return null;
    }
  };

  return (
    <>
      <Box
        bgcolor={colors.primary[700]}
        margin={1}
        padding={3}
        marginTop={3}
        borderRadius={3}
        boxShadow={8}
        height="8vh"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box></Box>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Placa Madre" {...a11yProps(0)} />
          <Tab label="CPU" {...a11yProps(1)} />
          <Tab label="RAM" {...a11yProps(2)} />
          <Tab label="Disco Duro" {...a11yProps(3)} />
          <Tab label="Tarjeta Gráfica" {...a11yProps(4)} />
        </Tabs>
        <Button size="small" variant="contained" onClick={openModal}>
          Agregar
        </Button>
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
        <Box
          margin={1}
          borderRadius={3}
          boxShadow={8}
          padding="5px"
          height="83vh"
          display="flex"
          flexDirection="column"
        >
          <Box
            height="100%"
            width="100%"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                //borderBottom: 'none',
              },
              "& .lugar-column--cell": {
                //color: colors.greenAccent[500],
              },
              "& .MuiDataGrid-columnHeaders": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[900],
                borderBottom: "none",
                borderRadius: "15px",
              },
              "& .MuiDataGrid-overlay": {
                backgroundColor: "rgba(0,0,0,0)",
              },
              "& .MuiDataGrid-virtualScroller": {
                //backgroundColor: colors.primary[500],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
              },
              "& .MuiCheckbox-root": {
                //color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                //color: `${colors.grey[400]} !important`,
              },
              "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus": {
                outline: "none !important",
              },
              "& .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
            }}
          >
            {renderTabContent(value)}
          </Box>
        </Box>
      </Box>
      <ComponentsForm modal={modal} closeModal={closeModal} />
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
