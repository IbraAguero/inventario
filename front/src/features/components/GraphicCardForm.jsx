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
  memory: "",
};

const schema = yup.object().shape({
  maker: yup.string().required("Campo requerido"),
  model: yup.string().required("Campo requerido"),
  memory: yup.string().required("Campo requerido"),
});

const GraphicCardForm = ({ closeModal }) => {
  const [errContent, setErrContent] = useState("");

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const urlComponent = "computadoras/tarjeta-grafica";
  const urlMaker = "tarjeta-grafica/fabricantes";

  const { data: optionsMakers } = useGetOptionsQuery(urlMaker);
  const [addOption, { isSuccess, isLoading, data: dataAdd, error: errAdd }] =
    useAddOptionMutation();

  const onSubmit = (data) => {
    addOption({ url: urlComponent, data });
    console.log(data);
  };

  console.log(errAdd);

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
            <Grid item xs={12} sm={5}>
              <SelectFieldWithMenu
                name="maker"
                label="Fabricante"
                data={optionsMakers || []}
                url={urlMaker}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldCustom name="model" label="Modelo" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextFieldCustom name="memory" label="Memoria" />
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

export default GraphicCardForm;
