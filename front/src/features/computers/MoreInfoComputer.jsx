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
import { useGetComputersQuery } from "./computersApiSlice";

const MoreInfoComputer = () => {
  const { modalOpen, closeModal } = useModal();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const textColor = theme.palette.mode === "light" ? "black" : "white";

  const params = useParams();
  const { isAuthenticated } = useAuth();

  const { computer, isLoading } = useGetComputersQuery("computersList", {
    skip: !isAuthenticated,
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      computer: data?.entities[params.id],
    }),
  });

  if (isLoading || !computer) {
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
          Computadora | {computer?.nroinventario}
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
                align="center"
                marginTop={1}
                color={textColor}
                fontWeight="500"
              >
                Información de la computadora
              </Typography>
              <Grid container spacing={2} textAlign="center">
                {Object.entries({
                  "Nro. Inventario": computer?.nroinventario || "",
                  "Nro. Serie": computer?.nroserie || "",
                  Lugar: computer?.place?.name || "",
                  Estado: computer?.state?.name || "",
                  "Placa Madre": `${computer?.motherBoard?.maker?.name || ""} ${
                    computer?.motherBoard?.model || ""
                  }`,
                  CPU: `${computer?.cpu.maker?.name || ""} ${
                    computer?.cpu?.model || ""
                  }`,
                  RAM: `${computer?.ram.maker?.name || ""} ${
                    computer?.ram?.capacity || ""
                  }`,
                  HDD: `${computer?.hdd.maker?.name || ""} ${
                    computer?.hdd?.capacity || ""
                  }`,
                  "Tarjeta Grafica": `${
                    computer?.graphicCard?.maker?.name || ""
                  } ${computer?.graphicCard?.model || ""}`,
                  "Agregada por": computer?.createdBy?.name || "",
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
                fontWeight="500"
              >
                Historial de cambios
              </Typography>
              {computer?.changes && computer?.changes?.length > 0 ? (
                <ChangeAccordion changes={computer.changes} />
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
export default MoreInfoComputer;
