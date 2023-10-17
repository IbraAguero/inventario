import { useParams } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { StyledDialog } from '../../components/styledComponents/StyledDialog';
import {
  Box,
  CircularProgress,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectPrinterById, useGetPrintersQuery } from './printersApiSlice';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import ChangeAccordion from '../../components/ChangeAcordion';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import useAuth from '../../hooks/useAuth';

const MoreInfo = () => {
  const { modalOpen, closeModal } = useModal();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const params = useParams();
  const { isAuthenticated } = useAuth();

  const { printer, isLoading } = useGetPrintersQuery('printersList', {
    skip: !isAuthenticated,
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      printer: data?.entities[params.id],
    }),
  });

  if (isLoading || !printer) {
    return (
      <StyledDialog open={modalOpen} onClose={closeModal} fullWidth>
        <Box
          p={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
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
            fontSize: '20px',
            fontWeight: '600',
            textAlign: 'center',
            color: '#fff',
            margin: 0,
            padding: 1,
          }}
        >
          Impresora | {printer?.nroinventario}
        </DialogTitle>
        <DialogContent
          sx={{
            margin: '0 5px 5px',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            background: colors.bgTable,
          }}
        >
          <>
            <Box
              paddingTop={2}
              paddingBottom={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <Typography variant="h5" gutterBottom align="center">
                Información de la Impresora
              </Typography>
              <Grid container spacing={2} textAlign="center">
                {Object.entries({
                  'Nro. Inventario': printer?.nroinventario,
                  'Nro. Serie': printer?.nroserie,
                  Fabricante: printer?.maker.name,
                  Tipo: printer?.type.name,
                  Modelo: printer?.model.name,
                  Lugar: printer?.place.name,
                  Estado: printer?.state.name,
                  'Agregada por': printer?.createdBy?.username,
                  // Agregar más campos aquí
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
              {printer?.changes && printer?.changes?.length > 0 ? (
                <ChangeAccordion changes={printer.changes} />
              ) : (
                <>Aun no se registraron cambios en el dispositivo</>
              )}
            </Box>
          </>
        </DialogContent>
      </StyledDialog>
    </>
  );
};
export default MoreInfo;
