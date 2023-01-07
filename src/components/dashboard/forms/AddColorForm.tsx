import { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import TextInput from "../../global/controls/TextInput";

import { ColorCreateInput } from "../../../../prisma/generated/type-graphql";
import { ColorCreateVariables, useCreateOneColor } from "../../../graphql/mutations/Color/createOneColor";

interface AddColorFormProps {
  setModalOpen: Function
}

export default function AddColorForm({ setModalOpen }: AddColorFormProps) {
  // color name
  const [name, setName] = useState("");

  // rgb color
  const [color, setColor] = useColor("hex", "#FFFFFF");

  // mutation hook
  const { mutate } = useCreateOneColor();

  return (
    <form className="flex flex-col justify-center">
      <div className="pt-4">
        <TextInput 
          label='Name'
          placeholder='An amazing category'
          maxLength={40}
          input={name} 
          setInput={setName}
        />
      </div>

      <div className="pt-8 justify-center items-center">
        <ColorPicker
          width={222} height={100}
          color={color}
          onChange={setColor}
          hideHSV
        />
      </div>
      
      <button className="justify-center items-center rounded-md border border-transparent bg-blue-600 disabled:bg-gray-500 px-4 py-1 text-base font-medium text-white hover:bg-blue-700"
        type='button'
        disabled={name.length == 0}
        onClick={() => {
          
          const data = {
            name,
            rgb: color.hex,
          } as ColorCreateInput;

          try {
            mutate({data});
          }
          catch(e: any) {
            console.error(e);
          }
          setModalOpen(false);
        }}>Save</button>
    </form>
  );
}
