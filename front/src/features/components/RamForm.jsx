import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAddOptionMutation,
  useGetOptionsQuery,
} from "../../app/api/optionsApiSlice";
import SelectFieldWithMenu from "../../components/fields/SelectFieldWithMenu";
import { Alert, Box, Grid } from "@mui/material";
import { TextFieldCustom } from "../../components/fields/TextFieldCustom";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import * as yup from "yup";

const defaultValues = {
  maker: "",
  model: "",
  capacity: "",
  frequency: "",
  type: "",
};

const schema = yup.object().shape({
  maker: yup.string().required("El fabricante es requerido"),
  model: yup.string().required("Este campo es obligatorio"),
  capacity: yup.string().required("Este campo es obligatorio"),
  frequency: yup.string().required("Este campo es obligatorio"),
  type: yup.string().required("Este campo es obligatorio"),
});

const RamForm = ({ closeModal }) => {
  const [errContent, setErrContent] = useState("");

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const urlComponent = "computadoras/ram";
  const urlMaker = "ram/fabricantes";
  const urlTypes = "ram/tipos";

  const { data: optionsMakers } = useGetOptionsQuery(urlMaker);
  const { data: optionsTypes } = useGetOptionsQuery(urlTypes);
  const [addOption, { isSuccess, isLoading, data: dataAdd, error: errAdd }] =
    useAddOptionMutation();

  const onSubmit = (data) => {
    addOption({ url: urlComponent, data });
    console.log(data);
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      enqueueSnackbar("Se agrego correctamente el componente", {
        variant: "success",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    setErrContent(errAdd?.data?.message) ?? "";

    setTimeout(() => {
      setErrContent("");
    }, 3000);
  }, [errAdd]);

  return (
    <>
      {errContent && (
        <Alert severity="error" sx={{ marginBottom: 3 }}>
          {errContent}
        </Alert>
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <SelectFieldWithMenu
                name="maker"
                label="Fabricante"
                data={optionsMakers || []}
                url={urlMaker}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldCustom name="model" label="Modelo" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldCustom name="capacity" label="Capacidad" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldCustom name="frequency" label="Frecuencia" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectFieldWithMenu
                name="type"
                label="Tipo"
                data={optionsTypes || []}
                url={urlTypes}
              />
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
              disabled={isSubmitting}
              loading={isLoading}
            >
              Enviar
            </LoadingButton>
          </Box>
        </form>
      </FormProvider>
    </>
  );
};

export default RamForm;
