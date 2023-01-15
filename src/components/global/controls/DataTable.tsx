import { ThemeProvider } from "@mui/system";
import { theme } from "../../mui/theme";
import Box from "@mui/material/Box";
import { DataGrid, GridColumns } from '@mui/x-data-grid';

interface DataTableProps {
  rows: any[];
  columns: GridColumns<any>;
  selected?: any[];
  setSelected?: Function;
}

export default function DataTable({rows, columns, selected, setSelected }: DataTableProps) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: 400, width: '100%' }}>
        {/** Selection is optional */}
        {
          selected && setSelected
            ?
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              selectionModel={selected}
              onSelectionModelChange={(newSelectionModel) => {
                setSelected(newSelectionModel);
              }}
              getRowHeight={() => 'auto'}
              sx={{ 
                color: 'text.primary',
                bgcolor: 'background.paper'
              }}
            />
            :
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
        }
      </Box>
    </ThemeProvider>
  );
}
