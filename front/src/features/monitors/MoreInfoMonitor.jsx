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
import { useGetMonitorsQuery } from "./monitorsApiSlice";

const MoreInfoMonitor = () => {
  const { modalOpen, closeModal } = useModal();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const params = useParams();
  const { isAuthenticated } = useAuth();

  const { monitor, isLoading } = useGetMonitorsQuery("monitorsList", {
    skip: !isAuthenticated,
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      monitor: data?.entities[params.id],
    }),
  });

  if (isLoading || !monitor) {
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
          Monitor | {monitor?.nroinventario}
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
              <Typography variant="h5" gutterBottom align="center">
                Información del Monitor
              </Typography>
              <Grid container spacing={2} textAlign="center">
                {Object.entries({
                  "Nro. Inventario": monitor?.nroinventario,
                  "Nro. Serie": monitor?.nroserie,
                  Fabricante: monitor?.maker.name,
                  Tipo: monitor?.type.name,
                  Modelo: monitor?.model.name,
                  Lugar: monitor?.place.name,
                  Estado: monitor?.state.name,
                  "Agregada por": monitor?.createdBy?.name,
                }).map(([label, value]) => (
                  <Grid item xs={6} key={label}>
                    <Typography variant="body1">
                      <strong>{label}:</strong> {value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="h5" gutterBottom align="center">
                Historial de cambios
              </Typography>
              {monitor?.changes && monitor?.changes?.length > 0 ? (
                <ChangeAccordion changes={monitor.changes} />
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
export default MoreInfoMonitor;
