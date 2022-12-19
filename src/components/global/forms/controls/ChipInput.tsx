import { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../mui/theme";

interface ChipInputProps {
  label: string,
  placeholder: string,
  input: string[],
  setInput: Function,
}

export default function ChipInput({label, placeholder, input, setInput}: ChipInputProps) {
  const [tag, setTag] = useState('');

  return (
    <>
      <div>
        <label htmlFor={label} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex flex-row relative mt-1 rounded-md shadow-sm">
          <input
            type="text"
            name={label}
            id={label}
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={placeholder}
            maxLength={40}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button className="items-center justify-center rounded-md border border-transparent bg-blue-600 disabled:bg-gray-500 ml-1 px-4 py-1 text-base font-medium text-white hover:bg-blue-700"
            type="button" 
            // max # of tags
            disabled={input.length >= 5 || tag.length <= 0}
            onClick={() => {
              setInput([...input, tag]); 
              setTag('');
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
                <div className='my-2 mx-0.5' key={elem}>
                  <ThemeProvider theme={theme}>
                    <Chip label={elem} size="small" color="primary"/>
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
