import { useState } from "react";
import TextInput from "../../global/controls/TextInput";
import { Category, SizeCreateInput } from "../../../../prisma/generated/type-graphql";
import CategoryCombo from "../../global/controls/CategoryCombo";
import { useCreateOneSize } from "../../../graphql/mutations/Size/createOneSize";

interface AddSizeFormProps {
  setModalOpen: Function
  categories: Category[]
}

export default function AddColorForm({ setModalOpen, categories }: AddSizeFormProps) {
  // size name
  const [name, setName] = useState("");

  // size value
  const [size, setSize] = useState("");

  // selected category
  const [category, setCategory] = useState<Category>(categories[0]);

  // mutation hook
  const { mutate } = useCreateOneSize();

  return (
    <form className="flex flex-col justify-center">
      <div className="pt-4">
        <TextInput
          label='Name'
          placeholder='Name for your size'
          maxLength={40}
          input={name}
          setInput={setName}
        />
      </div>

      <div className="pt-4">
        <TextInput
          label='Size'
          placeholder='Size value'
          maxLength={40}
          input={size}
          setInput={setSize}
        />
      </div>

      <div className="py-4">
        <CategoryCombo 
            categories={categories}
            setCategory={setCategory}
        />
      </div>
      
      <button className="justify-center items-center rounded-md border border-transparent bg-blue-600 disabled:bg-gray-500 px-4 py-1 text-base font-medium text-white hover:bg-blue-700"
        type='button'
        disabled={name.length == 0 || size.length == 0}
        onClick={() => {
          let data = {
            name,
            size,
            category: {
                connect: {
                    id: category.id
                }
            }
          } as SizeCreateInput;

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
