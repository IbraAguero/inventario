import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { useGetStatisticsQuery } from "./homeApiSlice";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const DonutChart = () => {
  const chartRef = useRef(null);
  Chart.defaults.color = "#fff";

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data } = useGetStatisticsQuery();

  const totalDevices = data?.totalDevices;
  const categories = totalDevices ? Object.keys(totalDevices) : [];
  const values = totalDevices ? Object.values(totalDevices) : [];
  console.log(categories);
  console.log(values);

  useEffect(() => {
    // Datos del gráfico
    if (!categories.length || !values.length) {
      return;
    }

    const chartData = {
      labels: categories,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "#bdb8b9",
            "#6e9dbd",
            "#bba261",
            "#bb61a0",
            "#61bb70",
          ],
        },
      ],
    };

    // Opciones del gráfico (puedes personalizar según tus necesidades)
    const options = {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        beforeInit(chart) {
          const originalFit = chart.legend.fit;

          chart.legend.fit = function fit() {
            originalFit.bind(chart.legend)();
            this.width += 100;
          };
        },
        legend: {
          position: "left",
          labels: {
            padding: 15,
          },
        },
        layout: {
          padding: {
            top: 20, // Ajusta el margen superior del gráfico
            right: 50, // Ajusta el margen derecho del gráfico
            bottom: 20, // Ajusta el margen inferior del gráfico
            left: 200, // Ajusta el margen izquierdo del gráfico
          },
        },
      },
    };

    // Obtén el contexto del canvas
    const ctx = chartRef.current.getContext("2d");

    // Crea el gráfico de donas
    const donutChart = new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: options,
    });

    // Limpia el gráfico cuando el componente se desmonta
    return () => {
      donutChart.destroy();
    };
  }, [categories, values]);

  return (
    <Box
      bgcolor={colors.primary[700]}
      margin={1}
      padding={3}
      borderRadius={3}
      boxShadow={8}
      height="60vh"
      width="70vw"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography>Dispositivos</Typography>
      <div>
        <canvas ref={chartRef} width="400px" height="300px" />
      </div>
    </Box>
  );
};

export default DonutChart;
