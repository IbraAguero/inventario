import { useParams } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { StyledDialog } from "../../components/styledComponents/StyledDialog";
import {
  Box,
  CircularProgress,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import ChangeAccordion from "../../components/ChangeAcordion";
import useAuth from "../../hooks/useAuth";
import { useGetPeripheralsQuery } from "./peripheralsApiSlice";

const MoreInfoPeripheral = () => {
  const { modalOpen, closeModal } = useModal();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const textColor = theme.palette.mode === "light" ? "black" : "white";

  const params = useParams();
  const { isAuthenticated } = useAuth();

  const { peripheral, isLoading } = useGetPeripheralsQuery("peripheralsList", {
    skip: !isAuthenticated,
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      peripheral: data?.entities[params.id],
    }),
  });

  if (isLoading || !peripheral) {
    return (
      <StyledDialog open={modalOpen} onClose={closeModal} fullWidth>
        <Box
          p={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      </StyledDialog>
    );
  }

  return (
    <>
      <StyledDialog open={modalOpen} onClose={closeModal} fullWidth>
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
          Periferico | {peripheral?.nroinventario}
        </DialogTitle>
        <DialogContent
          sx={{
            margin: "0 5px 5px",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            background: colors.bgTable,
          }}
        >
          <>
            <Box
              paddingTop={2}
              paddingBottom={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                color={textColor}
              >
                Información del Periferico
              </Typography>
              <Grid container spacing={2} textAlign="center">
                {Object.entries({
                  "Nro. Inventario": peripheral?.nroinventario,
                  "Nro. Serie": peripheral?.nroserie,
                  Fabricante: peripheral?.maker.name,
                  Tipo: peripheral?.type.name,
                  Modelo: peripheral?.model.name,
                  Lugar: peripheral?.place.name,
                  Estado: peripheral?.state.name,
                  "Agregada por": peripheral?.createdBy?.name,
                }).map(([label, value]) => (
                  <Grid item xs={6} key={label}>
                    <Typography variant="body1">
                      <strong>{label}:</strong> {value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                color={textColor}
              >
                Historial de cambios
              </Typography>
              {peripheral?.changes && peripheral?.changes?.length > 0 ? (
                <ChangeAccordion changes={peripheral.changes} />
              ) : (
                <Typography align="center">
                  Aun no se registraron cambios en el dispositivo
                </Typography>
              )}
            </Box>
          </>
        </DialogContent>
      </StyledDialog>
    </>
  );
};
export default MoreInfoPeripheral;
