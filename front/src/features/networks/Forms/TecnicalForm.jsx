import { Grid, Typography } from "@mui/material";
import { TextFieldCustom } from "../../../components/fields/TextFieldCustom";
import { useGetOptionsQuery } from "../../../app/api/optionsApiSlice";
import { useFormContext } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SelectFieldWithMenu from "../../../components/fields/SelectFieldWithMenu";

const TecnicalForm = ({ formField }) => {
  const { nroInventario, nroSerie, maker, model, type } = formField;
  const { watch, setValue } = useFormContext();

  const makerValue = watch(maker.name);

  const { isAuthenticated } = useAuth();

  const { data: optionsMakers, error } = useGetOptionsQuery(maker.url, {
    skip: !isAuthenticated,
  });

  const { data: optionsModels } = useGetOptionsQuery(
    `${model.url}/${makerValue}`,
    {
      skip: !makerValue,
    }
  );

  const { data: optionsTypes, error: errorType } = useGetOptionsQuery(
    type.url,
    {
      skip: !isAuthenticated,
    }
  );

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
        <Grid item xs={12} sm={6}>
          <SelectFieldWithMenu
            name={maker.name}
            label={maker.label}
            data={optionsMakers || []}
            url={maker.url}
            onChange={(e) => {
              setValue(maker.name, e.target.value);
              setValue(model.name, "");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectFieldWithMenu
            name={model.name}
            label={model.label}
            data={optionsModels || []}
            url={model.url}
            valuesForm={{ maker: makerValue }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectFieldWithMenu
            name={type.name}
            label={type.label}
            data={optionsTypes || []}
            url={type.url}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default TecnicalForm;
