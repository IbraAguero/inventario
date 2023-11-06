import { DataGrid } from "@mui/x-data-grid";
import { useGetOptionsQuery } from "../../app/api/optionsApiSlice";

const GraphicCardDataGrid = () => {
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
      field: "memory",
      headerName: "Memoria",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },

    /* {
      field: 'amount',
      headerName: 'Cantidad',
      headerAlign: 'center',
      flex: 1,
      align: 'center',
    }, */
  ];

  const { data, error, isLoading } = useGetOptionsQuery(
    "computadoras/tarjeta-grafica"
  );

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

export default GraphicCardDataGrid;
