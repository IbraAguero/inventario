import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const SelectFieldCustom = ({ name, label, data, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedValue = field.value;
        const isValueValid = data.some((item) => item.id === selectedValue);
        const fieldValue = isValueValid ? selectedValue : '';
        return (
          <FormControl error={!!fieldState.error} fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              {...props}
              error={!!fieldState.error}
              label={label}
              value={fieldValue}
            >
              {data?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {!!fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};
export default SelectFieldCustom;
