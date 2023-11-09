import { Grid, Typography } from "@mui/material";
import { TextFieldCustom } from "../../../components/fields/TextFieldCustom";
import { useFormContext } from "react-hook-form";

const TecnicalForm = ({ formField }) => {
  const { nroInventario, nroSerie } = formField;
  const { watch, setValue } = useFormContext();

  return (
    <>
      <Typography variant="h5" gutterBottom align="center" mb="2rem">
        Informacion Tecnica
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name={nroInventario.name}
            label={nroInventario.label}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name={nroSerie.name}
            label={nroSerie.label}
            autoComplete="off"
          />
        </Grid>
      </Grid>
    </>
  );
};
export default TecnicalForm;
