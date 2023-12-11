import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetUsersQuery } from "../features/users/usersApiSlice.js";

const ChangeAccordion = ({ changes }) => {
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const { data, error, isError, isLoading } = useGetUsersQuery("usersList", {
    pollingInterval: 30000,
    refetchOnFocus: true,
  });
  const users = data?.ids.map((id) => data?.entities[id]);

  return (
    <Box>
      {changes.map((change, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          >
            <Typography color="white">
              Cambio #{index + 1} - {formatDate(change.date)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Campo</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      Valor Anterior
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>Valor Nuevo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {change.values.map((value, valueIndex) => (
                    <TableRow
                      key={valueIndex}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell sx={{ color: "white" }}>
                        {value.field}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {value.oldValue}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {value.newValue}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {users?.map((user) => {
              if (user.id === change.user) {
                return (
                  <Box sx={{ marginTop: 2 }} key={user.id}>
                    <Typography variant="subtitle1" color="white">
                      Usuario: {user.name} {user.lastName}
                    </Typography>
                  </Box>
                );
              }
            })}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ChangeAccordion;
