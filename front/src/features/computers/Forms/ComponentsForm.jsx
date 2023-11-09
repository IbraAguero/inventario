import { Box, Typography } from "@mui/material";
import ComponentList from "../../../components/ComponentList";

const ComponentsForm = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom align="center" mb="2rem">
        Componentes
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <ComponentList title="Placa Madre" />
        <ComponentList title="CPU" value={"Intel I5"} />
        <ComponentList title="RAM" />
        <ComponentList title="Disco Duro" />
        <ComponentList title="Tarjeta Grafica" />
      </Box>
    </>
  );
};
export default ComponentsForm;
