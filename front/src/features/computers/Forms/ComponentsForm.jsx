import { Box, Typography } from "@mui/material";
import ComponentList from "../../../components/ComponentList";

const ComponentsForm = ({ handleAddCpu }) => {
  return (
    <>
      <Typography variant="h5" gutterBottom align="center" mb="2rem">
        Componentes
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <ComponentList
          title="Placa Madre"
          name="motherBoard"
          url="placa-madre"
        />
        <ComponentList title="CPU" name="cpu" url="cpu" />
        <ComponentList title="RAM" name="ram" url="ram" />
        <ComponentList title="Disco Duro" name="hdd" url="hdd" />
        <ComponentList
          title="Tarjeta Grafica"
          name="graphicCard"
          url="tarjeta-grafica"
        />
      </Box>
    </>
  );
};
export default ComponentsForm;
