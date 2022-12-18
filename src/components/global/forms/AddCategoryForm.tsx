import { useState } from 'react';
import TextInput from './controls/TextInput';
import { CategoryCreateInput, CategoryCreatetagsInput } from '../../../../prisma/generated/type-graphql';
import { useCreateOneCategory } from '../../../graphql/mutations/Category/createOneCategory';
import ChipInput from './controls/ChipInput'

interface AddCategoryFormProps {
  setModalOpen: Function
}

export default function AddCategoryForm({ setModalOpen }: AddCategoryFormProps) {
  
  // name field
  const [name, setName] = useState("");
  
  // tags array
  const [tags, setTags] = useState([] as string[]);

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
      <button className="justify-center items-center rounded-md border border-transparent bg-blue-600 disabled:bg-gray-500 px-4 py-1 text-base font-medium text-white hover:bg-blue-700"
        type='button'
        disabled={name.length == 0}
        onClick={() => {
          const inputTags = {set: tags} as CategoryCreatetagsInput;

          const data = {
            name,
            tags: inputTags,
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
