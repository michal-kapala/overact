import { GridColDef } from "@mui/x-data-grid";
import { Category } from "../../../prisma/generated/type-graphql";
import {
  BooleanRenderer,
  ColorRenderer,
  ColorsRenderer,
  ImageRenderer,
  SizesRenderer,
  StringsRenderer
} from './renderers';

// Column definitions for dashboard data tables

/**
 * Column definitions for products table.
 * 
 * Names in `field` property have to match with actual `Product` properties.
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

/**
 * Column definitions for categories table.
 * 
 * Names in `field` property have to match with actual `Category` properties.
 */
export const categoryColumns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 120, type: 'string' },
  { 
    field: 'tags',
    headerName: 'Tags',
    width: 120,
    type: 'string',
    renderCell: StringsRenderer,
  },
  { 
    field: 'colorable',
    headerName: 'Colors',
    width: 80,
    type: 'boolean',
    renderCell: BooleanRenderer,
  },
  { 
    field: 'sizeable',
    headerName: 'Sizes',
    width: 80,
    type: 'boolean',
    renderCell: BooleanRenderer,
  },
];

/**
 * Column definitions for colors table.
 * 
 * Names in `field` property have to match with actual `Color` properties.
 */
export const colorColumns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 120, type: 'string' },
  {
    field: 'rgb',
    headerName: 'Color',
    width: 120,
    type: 'string',
    renderCell: ColorRenderer,
  },
];

/**
 * Column definitions for sizes table.
 * 
 * Names in `field` property have to match with actual `Size` properties.
 */
export const sizeColumns: GridColDef[] = [
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
  { field: 'name', headerName: 'Name', width: 120, type: 'string' },
  { field: 'size', headerName: 'Value', width: 120, type: 'string' },
];
