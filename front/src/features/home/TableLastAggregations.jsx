import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Loader } from "../../components/Loader";
import { tokens } from "../../theme";
import { useGetLatestAggregationsQuery } from "./homeApiSlice";

const TableLastAggregations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { data, isLoading } = useGetLatestAggregationsQuery();

  return (
    <Box
      bgcolor={colors.primary[700]}
      margin={1}
      padding={3}
      borderRadius={3}
      boxShadow={8}
      height="60vh"
      width={isMobile || isMediumScreen ? "95vw" : "35vw"}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {!data && isLoading ? (
        <Loader />
      ) : (
        <Box display="flex" flexDirection="column" height="100%">
          <Typography variant="h5" fontWeight="600" textAlign="center">
            Ultimas agregaciones
          </Typography>
          <TableContainer
            component={Paper}
            style={{
              marginTop: "16px",
              maxHeight: "100%",
              overflowY: "auto",
              overflowX: "auto",
              backgroundColor: colors.bgTable,
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nro. Inventario</TableCell>
                  <TableCell>Lugar</TableCell>
                  <TableCell>Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((device) => (
                  <TableRow key={device._id}>
                    <TableCell>{device.nroinventario}</TableCell>
                    <TableCell>{device.place.name}</TableCell>
                    <TableCell>
                      {new Date(device.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default TableLastAggregations;
