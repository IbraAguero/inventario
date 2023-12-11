//import { esES } from '@mui/x-data-grid';

/* blue: {
  100: "#d2d5e3",
  200: "#a5aac7",
  300: "#7780aa",
  400: "#4a558e",
  500: "#1d2b72",
  600: "#17225b",
  700: "#111a44",
  800: "#0c112e",
  900: "#060917"
}
 */

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#eeeeee",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#cfd3d7",
          200: "#a0a7af",
          300: "#707a88",
          400: "#f2f0f0", //'#414e60'
          500: "#112238",
          600: "#0e1b2d",
          700: "#040D19",
          800: "#070e16",
          900: "#0e1b2d",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#B3EB7A",
          600: "#6d9644",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#D9D9D9",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#112238",
        },
        bgTable: "#11223847",
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#eeeeee",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0", // manually changed
          500: "#161f31",
          600: "#1F2A40",
          700: "#1D2B72",
          800: "#19214D",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#B3EB7A",
          600: "#6d9644",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#D9D9D9",
        },
        bgTable: "#FFFFFF",
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  // Función para calcular la luminancia relativa

  return {
    shape: {
      borderRadius: 10,
      //transition: 'all 0.2s ease',
    },
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode

            primary: {
              //main: colors.primary[100],
              main: "#6ba0d4",
              //secondary: colors.primary[700],
            },
            secondary: {
              main: colors.greenAccent[600],
            },
            success: {
              main: "#B3EB7A",
            },
            neutral: {
              dark: colors.grey[500],
              main: colors.grey[400],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
            text: {
              primary: "#ffffff", // Color blanco para el texto principal
            },
            /* action: {
              active: '#ffffff', // Color blanco para los iconos
            }, */
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[600],
            },
            secondary: {
              main: colors.greenAccent[700],
            },
            success: {
              main: "#B3EB7A",
            },
            neutral: {
              dark: colors.grey[500],
              main: colors.grey[900],
              light: colors.grey[100],
            },
            background: {
              default: "#D9D9D9",
              //paper: '#fff',
            },

            /* action: {
              active: '#000000', // Color blanco para los iconos
            }, */
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
        color: "#fff",
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
        color: "#fff",
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
        color: "#fff",
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
        color: "#fff",
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
        color: "#fff",
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
      },
    },

    components: {
      MuiDialog: {
        styleOverrides: {
          root: {},
          paper: {
            //backgroundColor: '#000 !important',
            borderRadius: 20,
          },
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "dashed" },
            style: {
              textTransform: "none",
              border: `2px dashed grey`,
            },
          },
        ],
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          },
          indicator: {
            height: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            backgroundColor: "#fff",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: "600",
            color: "#d8d8d8",
            "&.Mui-selected": {
              color: "#fff",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            //borderRadius: 15,
            //color: '#fff',
            backgroundColor: mode === "dark" && "#040D19",
            //color: mode === 'light' ? '#000' : '#ffffff',
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1b3c5e",
              //borderColor: mode === 'light' ? '#000' : '#ffffff',
              //transition: 'border-color 0.3s ease',
              transition: "border-color 0.2s linear",
            },
            "&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6ba0d4",
              //borderColor: mode === 'light' ? '##7c2121' : '##7c2121',
            },
            "&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
              //boxShadow: `${alpha(colors.primary[200], 0.25)} 0 0 0 0.2rem`,
              borderColor: "#6ba0d4",
              //borderColor: colors.primary[200],
            },

            //'&.MuiInputBase-multiline': {
            //  padding: 30,
            //},
          },

          input: {
            fontWeight: 500,
            //padding: '15.5px 14px',
            //borderRadius: '20px',

            "&:focused .MuiOutlinedInput-notchedOutline": {
              //borderColor: '#f51811',
            },
            "&.MuiInputBase-inputSizeSmall": {
              padding: "10px 14px",
              "&.MuiInputBase-inputAdornedStart": {
                paddingLeft: 0,
              },
            },
          },
          inputAdornedStart: {
            paddingLeft: 4,
          },
          notchedOutline: {
            //borderRadius: '20px',
            "&:hover .notchedOutline": {
              //borderColor: '#1c2272',
            },
            "&:focused .notchedOutline": {
              //borderColor: '#ee0f0fa6',
            },
          },
        },
      },
      /* MuiOutlinedInput: {
        styleOverrides: {
          root: {
            //borderRadius: 8,
            border: 'none',
            //backgroundColor: '#040d19',
            //color: '#fff',
            //color: mode === 'light' ? '#000' : '#ffffff',
            '& .MuiOutlinedInput-notchedOutline': {
              //borderColor: '#c0c0c0',
              border: 'none',
              borderColor: mode === 'light' ? '#000' : '#ffffff',
              transition: 'border-color 0.3s ease',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              //borderColor: '#7c2121',
              borderColor: mode === 'light' ? '##7c2121' : '##7c2121',
            },
            '&:focus': {
              boxShadow: `${alpha(colors.primary[200], 0.25)} 0 0 0 0.2rem`,
              borderColor: colors.primary[200],
            },
            //'&.MuiInputBase-multiline': {
            //  padding: 30,
            //},
          },
          input: {
            border: 'none',
            fontWeight: 500,
            padding: '15.5px 14px',
            borderRadius: '20px',
            //'&:hover .MuiOutlinedInput-notchedOutline': {
            //  borderColor: '#1c2272',
            //},
            '&.MuiInputBase-inputSizeSmall': {
              border: 'none',
              padding: '10px 14px',
              '&.MuiInputBase-inputAdornedStart': {
                paddingLeft: 0,
              },
            },
          },
          inputAdornedStart: {
            paddingLeft: 4,
          },
          notchedOutline: {
            boreder: 'none',
            borderRadius: '20px',
            '&:hover .notchedOutline': {
              borderColor: '#1c2272',
            },
          },
        },
      }, */
    },
  };
};
