import { useState } from 'react';
import TextInput from './controls/TextInput';
import { CategoryCreateInput, CategoryCreatetagsInput } from '../../../../prisma/generated/type-graphql';
import { useCreateOneCategory } from '../../../graphql/mutations/Category/createOneCategory';

interface AddCategoryFormProps {
  setModalOpen: Function
}

export default function AddCategoryForm({ setModalOpen }: AddCategoryFormProps) {
  
  // name field
  const [name, setName] = useState("");
  
  // tags array
  const [tags, setTags] = useState({set: []} as CategoryCreatetagsInput);

  // mutation hook
  const {data, status, mutate} = useCreateOneCategory();

  return (
    <form>
      <TextInput label='Name' placeholder='An amazing category' input={name} setInput={setName}/>
      <button type='button' onClick={() => {
        const data = {
          name,
          tags,
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
