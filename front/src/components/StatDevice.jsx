import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatDevice = ({ device, state, number }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      bgcolor={colors.bgTable}
      margin={1}
      height={100}
      width={130}
      padding={1}
      borderRadius={2}
      display="flex"
      flexDirection="column"
      textAlign="center"
      alignItems="center"
      border={`5px solid ${colors.primary[900]}`}
    >
      <Typography
        variant="h6"
        fontWeight="400"
        fontSize="0.9em"
        lineHeight={1.2}
      >
        {device}
      </Typography>
      <Typography
        variant="h6"
        fontWeight="400"
        fontSize="0.9em"
        lineHeight={1.2}
      >
        {state}
      </Typography>
      <Typography variant="h6" fontWeight="700" fontSize="2em">
        {number}
      </Typography>
    </Box>
  );
};
export default StatDevice;
