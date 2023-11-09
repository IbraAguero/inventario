import { useEffect, useState } from "react";
import { StyledDialog } from "../../components/styledComponents/StyledDialog";
import { useModal } from "../../context/ModalContext";
import printerFormModel from "./FormModel/printerFormModel";
import validationSchema from "./FormModel/validationSchema";
import defaultValues from "./FormModel/formInitialValues";
import AditionalForm from "./Forms/AditionalForm";
import TecnicalForm from "./Forms/TecnicalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  selectPrinterById,
  useCreatePrinterMutation,
  useGetPrintersQuery,
  useUpdatePrinterMutation,
} from "./printersApiSlice";
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
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import useTitle from "../../hooks/useTitle";

const { formId, formField } = printerFormModel;

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

const FormPrinter = () => {
  const { modalOpen, closeModal } = useModal();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeStep, setActiveStep] = useState(0);
  const [errContent, setErrContent] = useState("");
  const currentValidationSchema = validationSchema[activeStep];

  const navigate = useNavigate();
  const params = useParams();

  const { printer } = useGetPrintersQuery("printersList", {
    selectFromResult: ({ data }) => ({
      printer: data?.entities[params.id],
    }),
  });

  useTitle(
    params.id
      ? "Editar impresora | Inventario"
      : "Agregar impresora | Inventario"
  );

  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });

  const { handleSubmit, reset, trigger, formState, watch } = methods;
  const { isSubmitting } = formState;

  useEffect(() => {
    if (printer) {
      const parsePrinter = {
        ...printer,
        [formField.maker.name]: printer.maker._id,
        [formField.model.name]: printer.model._id,
        [formField.type.name]: printer.type?._id,
        [formField.place.name]: printer.place._id,
        [formField.state.name]: printer.state._id,
        [formField.supplier.name]: printer.supplier?._id,
      };
      reset(parsePrinter);
    }
  }, [printer]);

  const [createPrinter, { data, isSuccess, isLoading, error }] =
    useCreatePrinterMutation();
  const [
    updatePrinter,
    {
      data: dataUpd,
      isSuccess: isUpdSuccess,
      isLoading: isUpdLoading,
      error: errorUpd,
    },
  ] = useUpdatePrinterMutation();

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
          await updatePrinter(data);
          console.log(data);
        } else {
          await createPrinter(data);
          console.log(data);
        }
      } catch (err) {
        console.error("Error al agregar la impresora:", err);
      }
    } else {
      handleNext();
    }
  });

  useEffect(() => {
    if (isSuccess || isUpdSuccess) {
      navigate("/impresoras");
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
          {params.id ? "Editar Impresora" : "Agregar Impresora"}
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
              {steps.map((label, index) => {
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
export default FormPrinter;
