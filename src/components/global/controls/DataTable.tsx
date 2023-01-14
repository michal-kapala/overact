import { ThemeProvider } from "@mui/system";
import { theme } from "../../mui/theme";
import Box from "@mui/material/Box";
import { DataGrid, GridColumns } from '@mui/x-data-grid';

interface DataTableProps {
  rows: any[];
  columns: GridColumns<any>
}

export default function DataTable({ rows, columns }: DataTableProps) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          getRowHeight={() => 'auto'}
          sx={{ 
            color: 'text.primary',
            bgcolor: 'background.paper'
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
