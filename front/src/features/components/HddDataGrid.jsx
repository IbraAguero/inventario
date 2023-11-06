import { DataGrid } from "@mui/x-data-grid";
import { useGetOptionsQuery } from "../../app/api/optionsApiSlice";

const HddDataGrid = () => {
  const columns = [
    {
      field: "maker",
      headerName: "Fabricante",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => params.row.maker.name,
    },
    {
      field: "model",
      headerName: "Modelo",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "capacity",
      headerName: "Capacidad",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "type",
      headerName: "Tipo",
      headerAlign: "center",
      flex: 1,
      align: "center",
      valueGetter: (params) => params.row.type.name,
    },
    /* {
      field: 'amount',
      headerName: 'Cantidad',
      headerAlign: 'center',
      flex: 1,
      align: 'center',
    }, */
  ];

  const { data, error, isLoading } = useGetOptionsQuery("computadoras/hdd");

  return (
    <>
      <DataGrid
        rows={data || []}
        getRowId={(row) => row._id}
        loading={isLoading}
        columns={columns}
        density="compact"
        rowSelection={false}
      />
    </>
  );
};

export default HddDataGrid;
