import { DataGrid } from '@mui/x-data-grid';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const TablePrinter = ({ data, header, apiRef, isLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      height="100%"
      width="100%"
      sx={{
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-cell': {
          //borderBottom: 'none',
        },
        '& .lugar-column--cell': {
          //color: colors.greenAccent[500],
        },
        '& .MuiDataGrid-columnHeaders': {
          borderTop: 'none',
          backgroundColor: colors.blueAccent[900],
          borderBottom: 'none',
          borderRadius: '15px',
        },
        '& .MuiDataGrid-virtualScroller': {
          //backgroundColor: colors.primary[500],
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
        },
        '& .MuiCheckbox-root': {
          //color: `${colors.greenAccent[200]} !important`,
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
          //color: `${colors.grey[400]} !important`,
        },
        '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus': {
          outline: 'none !important',
        },
        '& .MuiDataGrid-cell:focus-within': {
          outline: 'none !important',
        },
      }}
    >
      <DataGrid
        apiRef={apiRef}
        columns={header}
        rows={data}
        density="compact"
        rowSelection={false}
        loading={isLoading}
        sx={{
          '@media print': {
            '.MuiDataGrid-main': {
              width: 'fit-content',
              fontSize: '12px',
              height: 'fit-content',
              overflow: 'visible',
              color: '#000',
            },
            '*': {
              color: '#000',
            },

            //marginBottom: 400,
          },
        }}
      />
    </Box>
  );
};
export default TablePrinter;
