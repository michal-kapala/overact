import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Category, Color, Size } from "../../../prisma/generated/type-graphql";
import { ColorsRenderer, ImageRenderer, SizesRenderer } from './renderers';

// Column definitions for dashboard data tables

/**
 * Column definitions for products table.
 * 
 * Names in `field` property have to match with actual product properties.
 */
export const productColumns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 200 , type: 'string' },
  { field: 'skuId', headerName: 'SKU', width: 150, type: 'string' },
  { 
    field: 'category',
    headerName: 'Category',
    width: 160,
    type: 'string',
    valueGetter(params) {
      const cat = params.value as Category;
      return cat.name;
    },
  },
  { field: 'image',
    headerName: 'Image',
    width: 80,
    type: 'string',
    renderCell: ImageRenderer,
  },
  { 
    field: 'colors',
    headerName: 'Colors',
    width: 140,
    type: 'string',
    renderCell: ColorsRenderer,
  },
  { 
    field: 'sizes',
    headerName: 'Sizes',
    width: 140,
    type: 'string',
    
    renderCell: SizesRenderer,
  },
  { field: 'price', headerName: 'Price ($)', width: 80, type: 'number' },
];
