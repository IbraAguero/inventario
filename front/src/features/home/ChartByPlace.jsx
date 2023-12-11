import {
  Box,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import { useState } from "react";
import { Loader } from "../../components/Loader";
import {
  useGetDevicesByPlaceQuery,
  useGetTotalDevicesQuery,
} from "./homeApiSlice";

const ChartByPlace = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { data: dataTotal, isLoading: isLoadingTotal } =
    useGetTotalDevicesQuery();
  const { data, isLoading } = useGetDevicesByPlaceQuery();

  const [selectedPlace, setSelectedPlace] = useState("all");

  const handleChange = (event) => {
    setSelectedPlace(event.target.value);
  };

  const filteredData =
    selectedPlace === "all" ? dataTotal : data[selectedPlace];

  const formattedData = filteredData
    ? Object.entries(filteredData).map(([device, cant]) => ({
        id: device,
        label: device,
        value: cant,
      }))
    : [];

  return (
    <>
      <Box
        bgcolor={colors.primary[700]}
        margin={1}
        padding={3}
        paddingTop={5}
        borderRadius={3}
        boxShadow={8}
        height="60vh"
        width={isMobile || isMediumScreen ? "95vw" : "65vw"}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {!data && isLoading ? (
          <Loader />
        ) : (
          <>
            <Box
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              marginTop={2}
              paddingLeft={3}
              paddingRight={3}
            >
              <Typography
                variant="h3"
                fontWeight="600"
                sx={{ marginTop: isMobile && 2 }}
              >
                Dispositivos
              </Typography>

              <Select
                sx={{
                  marginTop: isMobile && 1,
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },
                }}
                size="small"
                value={selectedPlace}
                onChange={handleChange}
              >
                <MenuItem value="all">Todos los dispositivos</MenuItem>
                {Object.keys(data).map((place) => (
                  <MenuItem key={place} value={place}>
                    {place}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <ResponsivePie
              data={formattedData}
              theme={{
                tooltip: {
                  color: "#000000",
                },
              }}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={{ scheme: "blues" }}
              borderWidth={1}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              enableArcLinkLabels={isMobile ? true : false}
              arcLinkLabelsTextColor="white"
              legends={
                isMobile
                  ? ""
                  : [
                      {
                        anchor: isMobile ? "bottom" : "left",
                        direction: isMobile ? "row" : "column",
                        justify: false,
                        translateX: -40,
                        translateY: isMobile ? 40 : 0,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 40,
                        itemTextColor: "#ffffff",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "circle",
                        textWrap: isMobile ? "wrap" : "none",
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemTextColor: "#cecece",
                            },
                          },
                        ],
                      },
                    ]
              }
            />
          </>
        )}
      </Box>
    </>
  );
};
export default ChartByPlace;
