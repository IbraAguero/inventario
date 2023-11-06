import React, { useState } from "react";
import {
  Box,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import { StyledDialog } from "../../components/styledComponents/StyledDialog";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import MotherBoardForm from "./MotherBoardForm";

const ComponentsForm = ({ modal, closeModal }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedComponent, setSelectedComponent] = useState("a");

  const handleComponentChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  const modalClose = () => {
    closeModal();
    setSelectedComponent("a");
  };

  return (
    <StyledDialog open={modal} onClose={modalClose} fullWidth>
      <DialogTitle
        sx={{
          fontSize: "20px",
          fontWeight: "600",
          textAlign: "center",
          color: "#fff",
          margin: 0,
          padding: 1,
        }}
      >
        Agregar componente
      </DialogTitle>
      <DialogContent
        sx={{
          margin: "0 5px 5px",
          padding: "1rem 4rem 2rem",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          background: colors.bgTable,
          gap: 3,
        }}
      >
        <Box marginTop={4} width="100%">
          <Select
            value={selectedComponent}
            onChange={handleComponentChange}
            fullWidth
          >
            <MenuItem value="a" disabled>
              <em>Seleccione el tipo del componente</em>
            </MenuItem>
            <MenuItem value="Placa Madre">Placa Madre</MenuItem>
            <MenuItem value="CPU">CPU</MenuItem>
            <MenuItem value="RAM">RAM</MenuItem>
            <MenuItem value="Disco Duro">Disco Duro</MenuItem>
            <MenuItem value="Tarjeta Grafica">Tarjeta Grafica</MenuItem>
          </Select>
        </Box>
        {selectedComponent && (
          // Aquí puedes renderizar el resto del formulario
          <div>
            {/* Agrega los campos adicionales según el tipo de componente seleccionado */}
            {selectedComponent === "Placa Madre" && (
              // Renderiza los campos específicos para la Placa Madre
              <MotherBoardForm />
            )}
            {selectedComponent === "CPU" && (
              // Renderiza los campos específicos para la CPU
              <div>Campos para CPU</div>
            )}
            {selectedComponent === "RAM" && (
              // Renderiza los campos específicos para la RAM
              <div>Campos para RAM</div>
            )}
            {selectedComponent === "Disco Duro" && (
              // Renderiza los campos específicos para el Disco Duro
              <div>Campos para Disco Duro</div>
            )}
            {selectedComponent === "Tarjeta Grafica" && (
              // Renderiza los campos específicos para la Tarjeta Gráfica
              <div>Campos para Tarjeta Gráfica</div>
            )}
          </div>
        )}
      </DialogContent>
    </StyledDialog>
  );
};

export default ComponentsForm;
