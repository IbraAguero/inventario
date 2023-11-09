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
import CpuForm from "./CpuForm";
import RamForm from "./RamForm";
import HddForm from "./HddForm";
import GraphicCardForm from "./GraphicCardForm";

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
          <>
            {selectedComponent === "Placa Madre" && <MotherBoardForm />}
            {selectedComponent === "CPU" && <CpuForm closeModal={closeModal} />}
            {selectedComponent === "RAM" && <RamForm closeModal={closeModal} />}
            {selectedComponent === "Disco Duro" && (
              <HddForm closeModal={closeModal} />
            )}
            {selectedComponent === "Tarjeta Grafica" && (
              <GraphicCardForm closeModal={closeModal} />
            )}
          </>
        )}
      </DialogContent>
    </StyledDialog>
  );
};

export default ComponentsForm;
