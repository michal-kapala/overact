import { useState } from 'react';
import TextInput from '../../global/controls/TextInput';
import PriceInput from '../../global/controls/PriceInput';
import type { Category, CategoryCreateNestedOneWithoutProductsInput, CategoryWhereUniqueInput, ProductCreateInput } from '../../../../prisma/generated/type-graphql';
import { useCreateOneProduct } from '../../../graphql/mutations/Product/createOneProduct';
import CategoryCombo from '../../global/controls/CategoryCombo';
import ImageUpload from '../../global/controls/ImageUpload';

interface AddProductFormProps {
  categories: Category[]
  setModalOpen: Function
}

export default function AddProductForm({ categories, setModalOpen }: AddProductFormProps) {
  
  // name field
  const [name, setName] = useState("");
  
  // SKU id field
  const [skuId, setSkuId] = useState("");

  // price field
  const [price, setPrice] = useState(0);

  // category mapped for input
  const [category, setCategory] = useState<CategoryWhereUniqueInput>({id: "", name: ""});

  // image file
  const [image, setImage] = useState<File>();

  // mutation hook
  const {data, status, mutate} = useCreateOneProduct();

  return (
    <form className="flex flex-col justify-center">
      <div className="pt-4">
        <TextInput 
          label='Name'
          placeholder='An amazing product'
          maxLength={50}
          input={name} 
          setInput={setName}
        />
      </div>
      <div className="pt-4">
        <TextInput
          label='SKU'
          placeholder='Barcode'
          maxLength={20}
          input={skuId}
          setInput={setSkuId}
        />
      </div>
      <div className="pt-4">
        <PriceInput
          label='Price'
          placeholder='0.00'
          input={price}
          setInput={setPrice}
        />
      </div>
      <div className="p-4">
        <CategoryCombo categories={categories} setCategory={setCategory}/>
      </div>

      <div className="">
        <ImageUpload setInput={setImage}/>
      </div>

      <button className="justify-center items-center rounded-md border border-transparent bg-blue-600 disabled:bg-gray-500 px-4 py-1 text-base font-medium text-white hover:bg-blue-700"
        type='button'
        disabled={name.length == 0 || skuId.length == 0 || price <= 0 || image === undefined}
        onClick={() => {
          const catNested = {
            connect: {
              id: category.id
            }
          } as CategoryCreateNestedOneWithoutProductsInput;

          // TODO: call next route for supabase auth & upload
          // TODO: get the image path for db
          // TODO: define image loader for supabase storage to display images

          const data = {
            skuId,
            name,
            price,
            // the name should allow to get the image from Supabase Storage
            image: image?.name,
            category: catNested,
          } as ProductCreateInput;
          
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
