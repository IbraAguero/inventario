import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useAddOptionMutation,
  useGetOptionsQuery,
} from "../../app/api/optionsApiSlice";
import SelectFieldWithMenu from "../../components/fields/SelectFieldWithMenu";
import { Box, Grid } from "@mui/material";
import { TextFieldCustom } from "../../components/fields/TextFieldCustom";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const schema = yup.object().shape({
  maker: yup.string().required("Fabricante es requerido"),
  model: yup.string().required("Este campo es obligatorio"),
  socket: yup.string().required("Este campo es obligatorio"),
});

const MotherBoardForm = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const url = "computadoras/placa-madre";

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { data: optionsMakers, error } = useGetOptionsQuery(
    "placa-madre/fabricantes"
  );

  const [addOption, { isSuccess, data: dataAdd, error: errAdd }] =
    useAddOptionMutation();

  const onSubmit = (data) => {
    addOption({ url, data });
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <SelectFieldWithMenu
              name="maker"
              label="Fabricante"
              data={optionsMakers || []}
              url={url}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldCustom name="model" label="Modelo" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextFieldCustom name="socket" label="Socket" />
          </Grid>
        </Grid>
        <Box
          display="flex"
          justifyContent="center"
          style={{ paddingTop: "5vh" }}
        >
          <LoadingButton
            variant="contained"
            type="submit"
            color="primary"
            //disabled={isSubmitting}
            //loading={isLoading || isUpdLoading}
          >
            Enviar
          </LoadingButton>
        </Box>
      </form>
    </FormProvider>
  );
};

export default MotherBoardForm;
