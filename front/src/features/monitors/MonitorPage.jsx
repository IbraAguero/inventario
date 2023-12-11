import {
  Box,
  Button,
  Typography,
  debounce,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useGridApiRef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";

import { Link, Outlet, useLocation } from "react-router-dom";

import { useModal } from "../../context/ModalContext";
import { tokens } from "../../theme";
import {
  useDeleteMonitorMutation,
  useGetMonitorsQuery,
} from "./monitorsApiSlice";
import ButtonMoreMenu from "../../components/ButtonMoreMenu";
import StyledSearchInput from "../../components/styledComponents/StyledSearchInput";
import TableMonitor from "./TableMonitor";
import useTitle from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";

const MonitorPage = () => {
  useTitle("Monitores | Inventario");
  const { isAdministrador, isTecnico } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const colors = tokens(theme.palette.mode);
  const { openModal } = useModal();
  const location = useLocation();

  const { data, isError, isLoading } = useGetMonitorsQuery("monitorsList", {
    pollingInterval: 30000,
    refetchOnFocus: true,
  });

  const monitors = data?.ids.map((id) => data?.entities[id]);

  const [deletePrinter] = useDeleteMonitorMutation();

  const columns = [
    {
      field: "nroinventario",
      headerName: "Nro Inv.",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "nroserie",
      headerName: "Nro Serie",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "place",
      headerName: "Lugar",
      flex: 3,
      cellClassName: "lugar-column--cell",
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => params.row.place.name,
    },
    {
      field: "maker",
      headerName: "Fabricante",
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueGetter: (params) => params.row.maker.name,
    },
    {
      field: "model",
      headerName: "Modelo",
      headerAlign: "center",
      align: "center",
      flex: 2,
      valueGetter: (params) => params.row.model.name,
    },
    {
      field: "createdAt",
      headerName: "Fecha de Creación",
      headerAlign: "center",
      align: "center",
      flex: 2,
      valueGetter: (params) => {
        const createdAt = params.row.createdAt;

        const formattedDate = new Date(createdAt).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        return formattedDate;
      },
    },
    {
      field: "updatedAt",
      headerName: "Fecha de Actualización",
      headerAlign: "center",
      align: "center",
      flex: 2,
      valueGetter: (params) => {
        const updatedAt = params.row.updatedAt;

        const formattedDate = new Date(updatedAt).toLocaleString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        return formattedDate;
      },
    },
    {
      field: "state",
      headerName: "Estado",
      headerAlign: "center",
      align: "center",
      cellClassName: "estado-column--cell",
      minWidth: 100,
      flex: 1,
      renderCell: ({ row: { state } }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            minWidth="85px"
            padding="1px"
            borderRadius={25}
            backgroundColor={
              state.name == "Activo"
                ? colors.greenAccent[600]
                : colors.grey[700]
            }
          >
            {state.name}
          </Box>
        );
      },
      valueGetter: (params) => params.row.state.name,
    },
    {
      field: "acciones",
      headerName: "",
      sortable: false,
      disableExport: true,
      disableColumnMenu: true,
      align: "center",
      width: 40,
      renderCell: ({ row: { id, nroinventario } }) => {
        return (
          <ButtonMoreMenu
            id={id}
            name={nroinventario}
            deleteAction={deletePrinter}
          />
        );
      },
    },
  ];

  const apiRef = useGridApiRef();
  const [searchText, setSearchText] = useState("");

  const updateSearchValue = useMemo(() => {
    return debounce((newValue) => {
      apiRef.current.setQuickFilterValues(
        newValue.split(" ").filter((word) => word !== "")
      );
    }, 250);
  }, [apiRef]);

  function handleSearchValueChange(event) {
    const newValue = event.target.value;
    setSearchText(newValue);
    updateSearchValue(newValue);
  }

  const handleExport = () => {
    // SIRVE PARA NO EXPORTAR ACCIONES
    /* const columnFieldsToExclude = ['acciones'];
    const filteredColumns = columns.filter(
      (column) => !columnFieldsToExclude.includes(column.field)
    );
    const columnNames = filteredColumns.map((column) => column.field);
 */
    apiRef.current.exportDataAsPrint({
      hideFooter: true,
      hideToolbar: true,
    });
  };

  return (
    <>
      <Box
        bgcolor={colors.primary[700]}
        margin={1}
        marginTop={3}
        borderRadius={3}
        boxShadow={8}
        padding="5px"
        height="83vh"
        display="flex"
        flexDirection="column"
      >
        <Box
          padding={1.2}
          paddingLeft={4}
          paddingRight={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          flex={1}
        >
          <Box display="flex" alignItems="center" gap={2}>
            {!isMobile && (
              <Typography variant="h3" fontWeight="600">
                Monitores
              </Typography>
            )}
            {(isAdministrador || isTecnico) && (
              <Button
                component={Link}
                to="agregar"
                onClick={openModal}
                state={{ background: location }}
                variant="contained"
                color="primary"
              >
                Agregar
              </Button>
            )}
          </Box>
          <Box display="flex" gap={1} alignItems="center">
            <StyledSearchInput
              searchText={searchText}
              onSearchTextChange={handleSearchValueChange}
            />
            <Button variant="contained" color="success" onClick={handleExport}>
              Exportar
            </Button>
          </Box>
        </Box>
        <Box
          bgcolor={colors.bgTable}
          borderRadius={3}
          padding={1.5}
          paddingTop={2}
          paddingBottom={0}
          height="62vh"
          flex={15}
        >
          <TableMonitor
            data={monitors || []}
            columns={columns}
            apiRef={apiRef}
            isLoading={isLoading}
          />
        </Box>
      </Box>
      <Outlet />
    </>
  );
};

export default MonitorPage;
