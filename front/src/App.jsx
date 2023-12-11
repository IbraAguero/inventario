import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import PersistLogin from "./features/auth/PersistLogin";
import ComputerPage from "./features/computers/ComputerPage";
import MonitorPage from "./features/monitors/MonitorPage";
import PrinterPage from "./features/printers/PrinterPage";
import PeripheralPage from "./features/peripherals/PeripheralPage";
import NetworkPage from "./features/networks/NetworkPage";
import RequireAuth from "./features/auth/RequireAuth";
import HomePage from "./features/home/HomePage";
import DashLayout from "./components/DashLayout";
//import Layout from './components/Layout';
import { ROLES } from "./utils/roles";
import { esES } from "@mui/x-data-grid";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import FormPrinter from "./features/printers/FormPrinter";
import FormUser from "./features/users/FormUser";
import { ConfirmProvider } from "material-ui-confirm";
import ForgetPassword from "./features/auth/ForgetPassword";
import ChangePassword from "./features/auth/ChangePassword";
import MoreInfo from "./features/printers/MoreInfo";
import Prefetch from "./features/auth/Prefetch";
import UserPage from "./features/users/UserPage";
import ComponentsPage from "./features/components/ComponentesPage";
import FormComputer from "./features/computers/FormComputer";
import FormMonitor from "./features/monitors/FormMonitor";
import MoreInfoMonitor from "./features/monitors/MoreInfoMonitor";
import FormPeripheral from "./features/peripherals/FormPeripheral";
import MoreInfoPeripheral from "./features/peripherals/MoreInfoPeripheral";
import FormNetwork from "./features/networks/FormNetwork";
import MoreInfoNetwork from "./features/networks/MoreInfoNetwork";
import MoreInfoComputer from "./features/computers/MoreInfoComputer";

function App() {
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
            confirmationText: "Aceptar",
            cancellationText: "Cancelar",
            dialogProps: {
              className: "",
              PaperProps: {
                sx: {
                  width: "400px",
                  borderRadius: "8px",
                  padding: "10px",
                },
              },
            },
            titleProps: {
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "5px",
            },
            confirmationButtonProps: {
              color: "success",
              variant: "contained",
            },
            cancellationButtonProps: {
              color: "error",
            },
          }}
        >
          <Routes location={background || location}>
            {/* public routes */}
            {/* <Route path="/" element={<Layout />}>
      </Route> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/recuperar-contraseña" element={<ForgetPassword />} />
            <Route path="/cambiar-contraseña" element={<ChangePassword />} />

            {/* private routes */}
            <Route element={<PersistLogin />}>
              <Route
                element={
                  <RequireAuth allowedRoles={[...Object.values(ROLES)]} />
                }
              >
                <Route element={<Prefetch />}>
                  <Route element={<DashLayout />}>
                    <Route index element={<HomePage />} />

                    <Route path="computadoras">
                      <Route index element={<ComputerPage />} />
                      <Route path=":id" element={<MoreInfoComputer />} />
                      <Route path="agregar" element={<FormComputer />} />
                      <Route path="editar/:id" element={<FormComputer />} />
                    </Route>

                    <Route path="monitores">
                      <Route index element={<MonitorPage />} />
                      <Route path=":id" element={<MoreInfoMonitor />} />
                      <Route path="agregar" element={<FormMonitor />} />
                      <Route path="editar/:id" element={<FormMonitor />} />
                    </Route>

                    <Route path="impresoras">
                      <Route index element={<PrinterPage />} />
                      <Route path=":id" element={<MoreInfo />} />
                      <Route path="agregar" element={<FormPrinter />} />
                      <Route path="editar/:id" element={<FormPrinter />} />
                    </Route>

                    <Route path="perifericos">
                      <Route index element={<PeripheralPage />} />
                      <Route path=":id" element={<MoreInfoPeripheral />} />
                      <Route path="agregar" element={<FormPeripheral />} />
                      <Route path="editar/:id" element={<FormPeripheral />} />
                    </Route>

                    <Route path="redes">
                      <Route index element={<NetworkPage />} />
                      <Route path=":id" element={<MoreInfoNetwork />} />
                      <Route path="agregar" element={<FormNetwork />} />
                      <Route path="editar/:id" element={<FormNetwork />} />
                    </Route>

                    <Route path="componentes">
                      <Route index element={<ComponentsPage />} />
                    </Route>

                    <Route
                      element={
                        <RequireAuth allowedRoles={[ROLES.Administrador]} />
                      }
                    >
                      <Route path="usuarios">
                        <Route index element={<UserPage />} />
                        <Route path="agregar" element={<FormUser />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Routes>
          {background && (
            <Routes>
              <Route path="impresoras">
                <Route path=":id" element={<MoreInfo />} />
                <Route path="agregar" element={<FormPrinter />} />
                <Route path="editar/:id" element={<FormPrinter />} />
              </Route>
              <Route path="monitores">
                <Route path=":id" element={<MoreInfoMonitor />} />
                <Route path="agregar" element={<FormMonitor />} />
                <Route path="editar/:id" element={<FormMonitor />} />
              </Route>
              <Route path="perifericos">
                <Route path=":id" element={<MoreInfoPeripheral />} />
                <Route path="agregar" element={<FormPeripheral />} />
                <Route path="editar/:id" element={<FormPeripheral />} />
              </Route>
              <Route path="redes">
                <Route path=":id" element={<MoreInfoNetwork />} />
                <Route path="agregar" element={<FormNetwork />} />
                <Route path="editar/:id" element={<FormNetwork />} />
              </Route>
              <Route path="computadoras">
                <Route path=":id" element={<MoreInfoComputer />} />
                <Route path="agregar" element={<FormComputer />} />
                <Route path="editar/:id" element={<FormComputer />} />
              </Route>
              <Route path="usuarios">
                <Route path="agregar" element={<FormUser />} />
              </Route>
            </Routes>
          )}
        </ConfirmProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
