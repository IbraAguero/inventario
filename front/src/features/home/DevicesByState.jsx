import { Box, Skeleton, useTheme } from "@mui/material";
import StatDevice from "../../components/StatDevice";
import { tokens } from "../../theme";
import { useGetDevicesByStateQuery } from "./homeApiSlice";

const DevicesByState = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, isLoading } = useGetDevicesByStateQuery();

  return (
    <Box
      className="statDeviceContainer"
      bgcolor={colors.primary[700]}
      margin={1}
      padding={3}
      marginTop={3}
      borderRadius={3}
      boxShadow={8}
      height="9em"
      display="flex"
      flexDirection="row"
      alignItems="center"
      border={`12px solid ${colors.primary[700]}`}
    >
      {isLoading ? (
        <Box display="flex" gap={3}>
          <Skeleton height={200} width={130} />
          <Skeleton height={200} width={130} />
          <Skeleton height={200} width={130} />
          <Skeleton height={200} width={130} />
          <Skeleton height={200} width={130} />
          <Skeleton height={200} width={130} />
          <Skeleton height={200} width={130} />
          <Skeleton height={200} width={130} />
          <Skeleton height={200} width={130} />
        </Box>
      ) : (
        <>
          <div className="statDeviceWrapper">
            {data?.map((stateData) =>
              Object.keys(stateData).map((device, index) => {
                if (device !== "estado" && stateData[device] > 0) {
                  return (
                    <>
                      <StatDevice
                        key={Date.now()}
                        device={device}
                        number={stateData[device]}
                        state={stateData.estado}
                      />
                    </>
                  );
                }
                return null;
              })
            )}
          </div>
          <div className="statDeviceWrapper">
            {data?.map((stateData) =>
              Object.keys(stateData).map((device) => {
                if (device !== "estado" && stateData[device] > 0) {
                  return (
                    <>
                      <StatDevice
                        key={Date.now()}
                        device={device}
                        number={stateData[device]}
                        state={stateData.estado}
                      />
                    </>
                  );
                }
                return null;
              })
            )}
          </div>
        </>
      )}
    </Box>
  );
};
export default DevicesByState;
