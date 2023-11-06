import { useTheme } from "@emotion/react";
import { Box, TextField, Typography, Link, Alert } from "@mui/material";
import { tokens } from "../../theme";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { NavLink, useLocation } from "react-router-dom";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useChangePasswordMutation } from "./authApiSlice";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useEffect, useState } from "react";
import PasswordField from "../../components/fields/PasswordField";

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Ingrese la nueva contraseña"),
  confirmPassword: yup
    .string()
    .required("Confirme su contraseña")
    .oneOf([yup.ref("newPassword"), null], "Las contraseñas no coinciden"),
});

const ChangePassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get("token");

  const [changePassword, { data, isLoading, error, isSuccess }] =
    useChangePasswordMutation();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      changePassword({ token: token, body: data });
    } catch (error) {
      console.log(error);
    }
  });

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (error) setErrMsg(error.data.message);
  }, [error]);

  if (isSuccess) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor={colors.primary}
      >
        <Box
          maxWidth={400}
          p={6}
          boxShadow={8}
          borderRadius={5}
          bgcolor={colors.primary[700]}
          width={{ xs: "10", md: "8", lg: "4" }}
        >
          <Box
            textAlign="center"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "center",
            }}
          >
            <CheckCircleOutlinedIcon sx={{ fontSize: "5rem" }} />
            <Typography
              variant="h4"
              component="h1"
              fontWeight={700}
              fontSize={18}
            >
              Contraseña cambiada con exito
            </Typography>
            <Typography
              variant="h6"
              component="small"
              fontWeight={300}
              fontSize={14}
            >
              Ahora puedes usar tu nueva contraseña para iniciar sesión.
            </Typography>
            <Typography textAlign="center" marginTop={2}>
              Volver al{" "}
              <Link component={NavLink} to="/login">
                Inicio
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor={colors.primary}
    >
      <Box
        minWidth={400}
        p={6}
        boxShadow={8}
        borderRadius={5}
        bgcolor={colors.primary[700]}
        width={{ xs: "10", md: "8", lg: "4" }}
        textAlign="center"
        sx={{
          marginBottom: 2,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box>
          <Typography variant="h3" component="h1" fontWeight={700}>
            Cambiar contraseña
          </Typography>
          <Typography variant="h6" component="small" fontWeight={400}>
            ingrese su nueva contraseña
          </Typography>
        </Box>
        {errMsg && <Alert severity="error">{errMsg}</Alert>}
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <PasswordField name="newPassword" label="Nueva contraseña" />
              <PasswordField
                name="confirmPassword"
                label="Confirmar contraseña"
              />
            </Box>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={isSubmitting}
              loading={isLoading}
            >
              Enviar
            </LoadingButton>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
};
export default ChangePassword;
