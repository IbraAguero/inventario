import { useEffect, useState } from "react";
import { StyledDialog } from "../../components/styledComponents/StyledDialog";
import { useModal } from "../../context/ModalContext";
import validationSchema from "./FormModel/validationSchema";
import defaultValues from "./FormModel/formInitialValues";
import AditionalForm from "./Forms/AditionalForm";
import TecnicalForm from "./Forms/TecnicalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import {
  Alert,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import useTitle from "../../hooks/useTitle";
import networkFormModel from "./FormModel/networkFormModel";
import {
  useCreateNetworkMutation,
  useGetNetworksQuery,
  useUpdateNetworkMutation,
} from "./networksApiSlice";

const { formField } = networkFormModel;

const steps = ["Informacion Tecnica", "Informacion Adicional"];

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <TecnicalForm formField={formField} />;
    case 1:
      return <AditionalForm formField={formField} />;
    default:
      return <div>Not found</div>;
  }
}

const FormNetwork = () => {
  const { modalOpen, closeModal } = useModal();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeStep, setActiveStep] = useState(0);
  const [errContent, setErrContent] = useState("");
  const currentValidationSchema = validationSchema[activeStep];

  const navigate = useNavigate();
  const params = useParams();

  const { network } = useGetNetworksQuery("networksList", {
    selectFromResult: ({ data }) => ({
      network: data?.entities[params.id],
    }),
  });

  useTitle(
    params.id
      ? "Editar periferico | Inventario"
      : "Agregar periferico | Inventario"
  );

  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });

  const { handleSubmit, reset, trigger, formState } = methods;
  const { isSubmitting } = formState;

  useEffect(() => {
    if (network) {
      const parseNetwork = {
        ...network,
        [formField.maker.name]: network.maker._id,
        [formField.model.name]: network.model._id,
        [formField.type.name]: network.type?._id,
        [formField.place.name]: network.place._id,
        [formField.state.name]: network.state._id,
        [formField.supplier.name]: network.supplier?._id,
      };
      reset(parseNetwork);
    }
  }, [network]);

  const [createNetwork, { data, isSuccess, isLoading, error }] =
    useCreateNetworkMutation();
  const [
    updateNetwork,
    {
      data: dataUpd,
      isSuccess: isUpdSuccess,
      isLoading: isUpdLoading,
      error: errorUpd,
    },
  ] = useUpdateNetworkMutation();

  const isLastStep = activeStep === steps.length - 1;

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isLastStep) {
      try {
        if (params.id) {
          await updateNetwork(data);
          console.log(data);
        } else {
          await createNetwork(data);
          console.log(data);
        }
      } catch (err) {
        console.error("Error al agregar la red:", err);
      }
    } else {
      handleNext();
    }
  });

  useEffect(() => {
    if (isSuccess || isUpdSuccess) {
      navigate("/redes");
      handleReset();
      enqueueSnackbar(data?.message || dataUpd?.message, {
        variant: "success",
      });
    }
  }, [isSuccess, isUpdSuccess]);

  useEffect(() => {
    setErrContent(error?.data?.message || errorUpd?.data?.message) ?? "";

    setTimeout(() => {
      setErrContent("");
    }, 3000);
  }, [error, errorUpd]);

  return (
    <>
      <StyledDialog
        open={modalOpen}
        onClose={closeModal}
        fullWidth
        /* maxWidth="md" */
      >
        <DialogTitle
          sx={{
            fontSize: "20px",
            fontWeight: "600",
            textAlign: "center",
            color: "#fff",
            margin: 0,
            padding: 1,
          }}
        >
          {params.id ? "Editar Red" : "Agregar Red"}
        </DialogTitle>
        <DialogContent
          sx={{
            margin: "0 5px 5px",
            padding: "0 4rem 2rem",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            background: colors.bgTable,
            gap: 3,
          }}
        >
          <Box sx={{ marginTop: "2rem" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
          {errContent && <Alert severity="error">{errContent}</Alert>}
          <>
            {activeStep === steps.length ? (
              <h5>Formulario Enviado</h5>
            ) : (
              <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                  {_renderStepContent(activeStep)}
                  <Box
                    display="flex"
                    justifyContent="center"
                    style={{ paddingTop: "5vh" }}
                  >
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Atras
                    </Button>
                    {activeStep === steps.length - 1 ? (
                      <LoadingButton
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={isSubmitting}
                        loading={isLoading || isUpdLoading}
                      >
                        Enviar
                      </LoadingButton>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        Siguiente
                      </Button>
                    )}
                  </Box>
                </form>
              </FormProvider>
            )}
          </>
        </DialogContent>
      </StyledDialog>
    </>
  );
};
export default FormNetwork;
