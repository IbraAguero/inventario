import { Box, useMediaQuery, useTheme } from "@mui/material";
import "../../index.css";
import ChartByPlace from "./ChartByPlace";
import TableLastAggregations from "./TableLastAggregations";
import DevicesByState from "./DevicesByState";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <DevicesByState />
      <Box
        display="flex"
        flexDirection={isMediumScreen || isMobile ? "column" : "row"}
      >
        <ChartByPlace />
        <TableLastAggregations />
      </Box>
    </>
  );
};
export default HomePage;
