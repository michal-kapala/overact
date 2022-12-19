import { useState } from 'react';
import TextInput from './controls/TextInput';
import { CategoryCreateInput, CategoryCreatetagsInput } from '../../../../prisma/generated/type-graphql';
import { useCreateOneCategory } from '../../../graphql/mutations/Category/createOneCategory';
import ChipInput from './controls/ChipInput';
import Switch from './controls/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

interface AddCategoryFormProps {
  setModalOpen: Function
}

export default function AddCategoryForm({ setModalOpen }: AddCategoryFormProps) {
  
  // name field
  const [name, setName] = useState("");
  
  // tags array
  const [tags, setTags] = useState([] as string[]);

  // sizeable flag
  const [sizeable, setSizeable] = useState(false);

  // colorable flag
  const [colorable, setColorable] = useState(false);

  // mutation hook
  const {data, status, mutate} = useCreateOneCategory();

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
      <div className="flex flex-col pt-4">
        <ChipInput
          label='Tags'
          placeholder='Add a tag'
          input={tags}
          setInput={setTags}
        />
      </div>
      <div className="flex flex-col justify-center pb-4">
        <FormGroup>
          <div className="flex flex-col justify-start items-center">
            <FormControlLabel
              label="Sizeable"
              control={<Switch label='Sizeable' setInput={setSizeable} />}
              labelPlacement="start"
            />
            <FormControlLabel
              label="Colorable"
              control={<Switch label='Colorable' setInput={setColorable} />}
              labelPlacement="start"
            />
          </div>
        </FormGroup>
      </div>
      <button className="justify-center items-center rounded-md border border-transparent bg-blue-600 disabled:bg-gray-500 px-4 py-1 text-base font-medium text-white hover:bg-blue-700"
        type='button'
        disabled={name.length == 0}
        onClick={() => {
          const inputTags = {set: tags} as CategoryCreatetagsInput;

          const data = {
            name,
            tags: inputTags,
            sizeable,
            colorable,
          } as CategoryCreateInput;
          
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
