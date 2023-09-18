import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import MenuSelect from './MenuSelect';

const SelectFieldWithMenu = ({
  name,
  label,
  data,
  url,
  valuesForm,
  ...props
}) => {
  const { control, watch, setValue } = useFormContext();
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
            <Box display="flex" alignItems="center">
              <InputLabel>{label}</InputLabel>
              <Select
                {...field}
                {...props}
                error={!!fieldState.error}
                label={label}
                value={fieldValue}
                fullWidth
              >
                {data?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <MenuSelect
                name={name}
                label={label}
                url={url}
                valuesForm={valuesForm}
              />
            </Box>
            {!!fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};
export default SelectFieldWithMenu;
