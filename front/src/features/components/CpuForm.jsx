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

const schema = yup.object().shape({
  maker: yup.string().required("Fabricante es requerido"),
  model: yup.string().required("Este campo es obligatorio"),
  frequency: yup.string().required("Este campo es obligatorio"),
  cores: yup.number().required("Este campo es obligatorio"),
});

const CpuForm = ({ closeModal }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [errContent, setErrContent] = useState("");

  const url = "computadoras/cpu";

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { data: optionsMakers } = useGetOptionsQuery("cpu/fabricantes");

  const [addOption, { isSuccess, isLoading, data: dataAdd, error: errAdd }] =
    useAddOptionMutation();

  const onSubmit = (data) => {
    addOption({ url, data });
    console.log(data);
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      enqueueSnackbar("Se agrego correctamente el CPU", {
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
                url="cpu/fabricantes"
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
