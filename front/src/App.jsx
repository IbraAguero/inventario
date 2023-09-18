import { Route, Routes, useLocation } from 'react-router-dom';
import useTitle from './hooks/useTitle';
import LoginPage from './features/auth/LoginPage';
import PersistLogin from './features/auth/PersistLogin';
import ComputerPage from './features/computers/ComputerPage';
import MonitorPage from './features/monitors/MonitorPage';
import PrinterPage from './features/printers/PrinterPage';
import PeripheralPage from './features/peripherals/PeripheralPage';
import NetworkPage from './features/networks/NetworkPage';
import RequireAuth from './features/auth/RequireAuth';
import HomePage from './features/home/HomePage';
import DashLayout from './components/DashLayout';
import Layout from './components/Layout';
import { ROLES } from './utils/roles';
import { esES } from '@mui/x-data-grid';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings } from './theme';
import FormPrinter from './features/printers/FormPrinter';
import { ConfirmProvider } from 'material-ui-confirm';

function App() {
  useTitle('Inventario');
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode), esES), [mode]);

  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConfirmProvider
          defaultOptions={{
            title: `Estas seguro?`,
            confirmationText: 'Aceptar',
            cancellationText: 'Cancelar',
            dialogProps: {
              className: '',
              PaperProps: {
                sx: {
                  width: '400px',
                  borderRadius: '8px',
                  padding: '10px',
                },
              },
            },
            titleProps: {
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '5px',
            },
            confirmationButtonProps: {
              color: 'success',
              variant: 'contained',
            },
            cancellationButtonProps: {
              color: 'error',
            },
          }}
        >
          <Routes location={background || location}>
            {/* public routes */}
            {/* <Route path="/" element={<Layout />}>
      </Route> */}
            <Route path="/login" element={<LoginPage />} />

            {/* private routes */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route element={<DashLayout />}>
                  <Route index element={<HomePage />} />

                  <Route path="computadoras">
                    <Route index element={<ComputerPage />} />
                  </Route>

                  <Route path="monitores">
                    <Route index element={<MonitorPage />} />
                  </Route>

                  <Route path="impresoras">
                    <Route index element={<PrinterPage />} />
                    <Route path="agregar" element={<FormPrinter />} />
                    <Route path="editar/:id" element={<FormPrinter />} />
                  </Route>

                  <Route path="perifericos">
                    <Route index element={<PeripheralPage />} />
                  </Route>

                  <Route path="redes">
                    <Route index element={<NetworkPage />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Routes>
          {background && (
            <Routes>
              <Route path="impresoras">
                <Route path="agregar" element={<FormPrinter />} />
                <Route path="editar/:id" element={<FormPrinter />} />
              </Route>
            </Routes>
          )}
        </ConfirmProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
