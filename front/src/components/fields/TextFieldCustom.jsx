import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export const TextFieldCustom = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : ''}
        />
      )}
    />
  );
};
