import { GridRenderCellParams } from "@mui/x-data-grid";
import { Color, Size } from "../../../prisma/generated/type-graphql";

// Renderer function for MUI DataGrid columns' renderCell

/**
 * Renders `Color[]` as a list inside of a DataGrid cell.
 * @param params 
 * @returns List of color names
 */
export function ColorsRenderer(
  params: GridRenderCellParams<any>
): JSX.Element | null {  
  const colors = params.row.colors as Color[];

  // returns a list of color names
  if(colors && colors.length > 0) {
    return <ul>
      {
        colors.map((c) => <li key={c.id}>{c.name}</li>)
      }
    </ul>
  }
  // no data
  return <p>-</p>
}

/**
 * Renders `Size[]` as a list inside of a DataGrid cell.
 * @param params 
 * @returns List of size names
 */
export function SizesRenderer(
  params: GridRenderCellParams<any>
): JSX.Element | null {
  const sizes = params.row.sizes as Size[];

  // returns a list of size names
  if(sizes && sizes.length > 0) {
    return <ul>
      {
        sizes.map((s) => <li key={s.id}>{s.name}</li>)
      }
    </ul>
  }
  // no data
  return <p>-</p>
}

export function ImageRenderer(
  params: GridRenderCellParams<any>
): JSX.Element | null {
  const imageUri = params.row.image as string;

  // returns asset link
  if(imageUri) {
    return <a 
      href={imageUri}
      target="_blank"
      rel="noreferrer"
      className="underline text-blue-500 hover:text-blue-300"
    >
    link
    </a>
  }
  // no data
  return <p>-</p>
}
