import { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Autocomplete, TextField } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../mui/theme";
import { Size } from "../../../../prisma/generated/type-graphql";

interface SizeMultiselectProps {
  label: string,
  /**
   * Selected data state.
   */
  input: Size[],
  /**
   * Selected data setter.
   */
  setInput: Function,
  /**
   * Size listing.
   */
  sizes: Size[],
}

function compSizes(a: Size, b: Size): number {
  if(a.name < b.name) return -1;
  else if (a.name === b.name) return 0;
  else return 1;
}

export default function SizeMultiselect(
  { label, input, setInput, sizes }: SizeMultiselectProps
) {

  // selected autocomplete option
  const [selected, setSelected] = useState(
    sizes.sort((a,b) => compSizes(a,b))[0]
  );

  // Controlled Autocomplete text (see MUI docs)
  const [inputValue, setInputValue] = useState('');

  const defaultProps = {
    options: sizes.sort((a,b) => compSizes(a,b)),
    getOptionLabel: (option: Size) => option.name
  };

  return (
    <>
      <div>
        <div className="flex flex-row relative mt-1 rounded-md shadow-sm">
          <div className="w-full">
            <Autocomplete
              {...defaultProps}
              id="size-autocomplete"
              value={selected}
              onChange={(event: any, newValue: Size | null) => {
                setSelected(newValue ?? sizes.sort((a,b) => compSizes(a,b))[0])
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label={label} variant="standard" />
              )}
            />
          </div>
          <button className="items-center justify-center rounded-md border border-transparent bg-blue-600 disabled:bg-gray-500 ml-1 px-4 py-1 text-base font-medium text-white hover:bg-blue-700"
            type="button" 
            // max # of sizes
            disabled={input.includes(selected) || !selected}
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
