import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

const defaultValues = {
  maker: "",
  model: "",
  frequency: "",
  cores: "",
};

const schema = yup.object().shape({
  maker: yup.string().required("El fabricante es requerido"),
  model: yup.string().required("El modelo es requerido"),
  frequency: yup.string().required("La frecuencia es requerida"),
  cores: yup.number().min(0).max(100).required("Este campo es obligatorio"),
});

const CpuForm = ({ closeModal }) => {
  const [errContent, setErrContent] = useState("");

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const urlComponent = "computadoras/cpu";
  const urlMaker = "cpu/fabricantes";

  const { data: optionsMakers } = useGetOptionsQuery(urlMaker);

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
            <Grid item xs={12} sm={6}>
              <TextFieldCustom name="frequency" label="Frecuencia" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldCustom
                name="cores"
                label="Nucleos"
                type="number"
                inputProps={{
                  min: 0,
                  max: 100,
                  step: 1,
                }}
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

export default CpuForm;
