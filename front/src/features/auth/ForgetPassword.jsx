import { useTheme } from '@emotion/react';
import { Alert, Box, Link, TextField, Typography } from '@mui/material';
import { tokens } from '../../theme';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useForgetPasswordMutation } from './authApiSlice';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import { useEffect, useState } from 'react';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Ingrese un correo valido')
    .required('Ingrese un correo electronico'),
});

const ForgetPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [errMsg, setErrMsg] = useState('');

  const [forgetPassword, { data, isLoading, error, isSuccess }] =
    useForgetPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      forgetPassword(data);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (error) setErrMsg(error.data.message);
  }, [error]);

  const email = watch('email');

  useEffect(() => {
    setErrMsg('');
  }, [email]);

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
          width={{ xs: '10', md: '8', lg: '4' }}
        >
          <Box
            textAlign="center"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <MarkEmailReadOutlinedIcon sx={{ fontSize: '5rem' }} />
            <Typography variant="h4" component="h1" fontWeight={700}>
              Revise su bandeja de entrada
            </Typography>
            <Typography variant="h6" component="small" fontWeight={300}>
              Se ha enviado un correo electrónico con instrucciones para
              actualizar su contraseña.
            </Typography>
            <Typography textAlign="center" marginTop={2}>
              Volver al{' '}
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
        minWidth={350}
        p={6}
        boxShadow={8}
        borderRadius={5}
        bgcolor={colors.primary[700]}
        width={{ xs: '10', md: '8', lg: '4' }}
      >
        <Box
          textAlign="center"
          sx={{
            marginBottom: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="h3" component="h1" fontWeight={700}>
            Recuperar contraseña
          </Typography>
          <Typography variant="h6" component="small" fontWeight={400}>
            ingrese su correo para continuar
          </Typography>
          {errMsg && <Alert severity="error">{errMsg}</Alert>}
        </Box>
        <form onSubmit={onSubmit}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Correo electronico"
                autoComplete="off"
                error={!!errors.email || !!error?.data}
                helperText={errors.email?.message}
              />
            )}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={isSubmitting}
            loading={isLoading}
          >
            Enviar
          </LoadingButton>
          <Typography textAlign="center" marginTop={3}>
            Desea volver?{' '}
            <Link component={NavLink} to="/login">
              Inicio
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};
export default ForgetPassword;
