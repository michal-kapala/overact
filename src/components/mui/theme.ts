import { createTheme } from '@mui/material/styles';
import type {} from "@mui/x-data-grid/themeAugmentation";

const textColor = '#D1D5DB';

export const theme = createTheme({
  palette: {
    primary: {
      // tailwind's color-blue-500
      main: '#3B82F6',
    },
    // text color used for data tables
    text: {
      primary: '#D1D5DB'
    },
    // table labels and footer rows
    // tailwind's color-gray-900
    background: {
      paper: '#111827'
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        // | sign inbetween column labels
        iconSeparator: {
          color: textColor
        },
        // table content excluding labels and footer rows
        virtualScrollerContent: {
          // tailwind's color-gray-800
          backgroundColor: '#1f2937',
        }
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        // DataGrid table UI icons
        root: {
          color: textColor
        }
      }
    }
  }
});
