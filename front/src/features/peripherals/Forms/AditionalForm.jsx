import { Grid, Typography, useTheme } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { useGetOptionsQuery } from "../../../app/api/optionsApiSlice";
import SelectFieldWithMenu from "../../../components/fields/SelectFieldWithMenu";
import { TextFieldCustom } from "../../../components/fields/TextFieldCustom";

const AditionalForm = ({ formField }) => {
  const { place, state, supplier, order, comment, mandated } = formField;

  const theme = useTheme();
  const textColor = theme.palette.mode === "light" ? "black" : "white";

  const { isAuthenticated } = useAuth();

  const { data: optionsPlaces, error: errPlaces } = useGetOptionsQuery(
    place.url,
    {
      skip: !isAuthenticated,
    }
  );

  const { data: optionsStates, error: errStates } = useGetOptionsQuery(
    state.url,
    {
      skip: !isAuthenticated,
    }
  );
  const { data: optionsSupplier } = useGetOptionsQuery(supplier.url, {
    skip: !isAuthenticated,
  });

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        mb="2rem"
        color={textColor}
      >
        Informacion Tecnica
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <SelectFieldWithMenu
            name={place.name}
            label={place.label}
            data={optionsPlaces || []}
            url={place.url}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectFieldWithMenu
            name={state.name}
            label={state.label}
            data={optionsStates || []}
            url={state.url}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectFieldWithMenu
            name={supplier.name}
            label={supplier.label}
            data={optionsSupplier || []}
            url={supplier.url}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name={order.name}
            label={order.label}
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name={mandated.name}
            label={mandated.label}
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name={comment.name}
            label={comment.label}
            autoComplete="off"
          />
        </Grid>
      </Grid>
    </>
  );
};
export default AditionalForm;
