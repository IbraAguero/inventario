import { useTheme } from '@emotion/react';
import useTitle from '../../hooks/useTitle';
import { tokens } from '../../theme';
import { useModal } from '../../context/ModalContext';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useGetUsersQuery } from './usersApiSlice';
import TableUser from './TableUser';
import ButtonMoreMenu from '../../components/ButtonMoreMenu';
import ButtonMoreMenuUser from './ButtonMoreMenuUser';

const UserPage = () => {
  useTitle('Usuarios | Inventario');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { openModal } = useModal();
  const location = useLocation();

  const { data, error, isError, isLoading } = useGetUsersQuery('usersList', {
    pollingInterval: 30000,
    refetchOnFocus: true,
  });

  const users = data?.ids.map((id) => data?.entities[id]);

  const columns = [
    {
      field: 'name',
      headerName: 'Nombre',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: 'Apellido',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Correo',
      headerAlign: 'center',
      align: 'center',
      flex: 2,
    },
    {
      field: 'rol',
      headerName: 'Rol',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'active',
      headerName: 'Activo',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { active } }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            minWidth="85px"
            padding="1px"
            borderRadius={25}
            backgroundColor={
              active ? colors.greenAccent[600] : colors.grey[700]
            }
          >
            {active ? 'Activo' : 'Inactivo'}
          </Box>
        );
      },
    },

    {
      field: 'acciones',
      headerName: '',
      sortable: false,
      disableExport: true,
      disableColumnMenu: true,
      align: 'center',
      width: 40,
      renderCell: ({ row: { id, username, active } }) => {
        return (
          <ButtonMoreMenuUser
            id={id}
            name={username}
            state={active}
            //deleteAction={deletePrinter}
          />
        );
      },
    },
  ];

  return (
    <>
      <Box
        bgcolor={colors.primary[700]}
        margin={1}
        marginTop={4}
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
            <Typography variant="h3" fontWeight="600">
              Usuarios
            </Typography>
            <Button
              component={Link}
              to="agregar"
              onClick={openModal}
              state={{ background: location }}
              variant="contained"
              size="small"
              color="primary"
            >
              Agregar
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
          <TableUser
            isLoading={isLoading}
            data={users || []}
            header={columns}
          />
        </Box>
      </Box>
    </>
  );
};
export default UserPage;
