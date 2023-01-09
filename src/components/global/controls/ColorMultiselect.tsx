import { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Autocomplete, TextField } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../mui/theme";
import { Color } from "../../../../prisma/generated/type-graphql";

interface ColorMultiselectProps {
  label: string,
  /**
   * Selected data state.
   */
  input: Color[],
  /**
   * Selected data setter.
   */
  setInput: Function,
  /**
   * Color listing.
   */
  colors: Color[]
}

function compColors(a: Color, b: Color): number {
  if(a.name < b.name) return -1;
  else if (a.name === b.name) return 0;
  else return 1;
}

export default function ColorMultiselect(
  { label, input, setInput, colors }: ColorMultiselectProps
) {

  // selected autocomplete option
  const [selected, setSelected] = useState(colors.sort((a,b) => compColors(a,b))[0]);

  const defaultProps = {
    options: colors,
    getOptionLabel: (option: Color) => option.name
  };

  return (
    <>
      <div>
        <div className="flex flex-row relative mt-1 rounded-md shadow-sm">
          {/* <input
            type="text"
            name={label}
            id={label}
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={placeholder}
            maxLength={40}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          /> */}
          <div className="w-full">
            <Autocomplete
              {...defaultProps}
              id="color-autocomplete"
              value={selected}
              onChange={(event: any, newValue: Color| null) => {
                setSelected(newValue ?? colors.sort((a,b) => compColors(a,b))[0])
              }}
              renderInput={(params) => (
                <TextField {...params} label={label} variant="standard" />
              )}
            />
          </div>
          <button className="items-center justify-center rounded-md border border-transparent bg-blue-600 disabled:bg-gray-500 ml-1 px-4 py-1 text-base font-medium text-white hover:bg-blue-700"
            type="button" 
            // max # of colors
            disabled={input.includes(selected)}
            onClick={() => {
              setInput([...input, selected]);
            }}>
              Add
          </button>
        </div>
      </div>
      <div className="p-6">
        <Stack direction="row" className="flex flex-wrap">
          <>
            {input.map((elem) => {
              return (
                <div className='my-2 mx-0.5' key={elem.id}>
                  <ThemeProvider theme={theme}>
                    <Chip label={elem.name} size="small" color="primary"/>
                  </ThemeProvider>
                </div>
              );
            })}
          </>
        </Stack>
      </div>
    </>
  );
}
