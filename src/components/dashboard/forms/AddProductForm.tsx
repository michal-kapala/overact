import { useState } from 'react';
import TextInput from '../../global/controls/TextInput';
import PriceInput from '../../global/controls/PriceInput';
import CategoryCombo from '../../global/controls/CategoryCombo';
import ImageUpload from '../../global/controls/ImageUpload';
import type {
  Category,
  CategoryCreateNestedOneWithoutProductsInput,
  CategoryWhereUniqueInput,
  Color,
  ColorCreateNestedManyWithoutProductsInput,
  ColorWhereUniqueInput,
  ProductCreateInput,
  Size,
  SizeCreateNestedManyWithoutProductsInput,
  SizeWhereUniqueInput
} from '../../../../prisma/generated/type-graphql';
import { useCreateOneProduct } from '../../../graphql/mutations/Product/createOneProduct';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { v4 as uuidv4 } from 'uuid';
import ColorMultiselect from '../../global/controls/ColorMultiselect';
import SizeMultiselect from '../../global/controls/SizeMultiselect';

interface AddProductFormProps {
  categories: Category[];
  colors: Color[];
  sizes: Size[];
  setModalOpen: Function;
  apiUrl: string;
}

export default function AddProductForm(
  { categories, colors, sizes, setModalOpen, apiUrl }: AddProductFormProps
) {
  
  // name field
  const [name, setName] = useState("");
  
  // SKU id field
  const [skuId, setSkuId] = useState("");

  // price field
  const [price, setPrice] = useState(0);

  // fallback category
  const defaultCategory = {
    id: "",
    name: "Default category"
  } as Category;

  // category mapped for input
  const [category, setCategory] = useState<Category>(
    defaultCategory
  );

  // colors mapped for input
  const [inputColors, setInputColors] = useState<Color[]>([]);

  // sizes mapped for input
  const [inputSizes, setInputSizes] = useState<Size[]>([]);

  // image file
  const [image, setImage] = useState<File>();

  // supabase client
  const supabase = useSupabaseClient();

  // mutation hook
  const {data, status, mutate} = useCreateOneProduct(apiUrl);

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
      <div className="p-4 z-30">
        <CategoryCombo categories={categories} setCategory={setCategory}/>
      </div>

      <div className="">
        <ImageUpload setInput={setImage}/>
      </div>

      <div className="p-4 z-20">
        <ColorMultiselect
          label='Colors'
          input={inputColors}
          setInput={setInputColors}
          colors={colors}
        />
      </div>

      <div className="p-4 z-10">
        <SizeMultiselect
          label='Sizes'
          input={inputSizes}
          setInput={setInputSizes}
          sizes={sizes.filter((s) => s.categoryId === category.id)}
        />
      </div>

      <button className="justify-center items-center rounded-md border border-transparent bg-blue-600 disabled:bg-gray-500 px-4 py-1 text-base font-medium text-white hover:bg-blue-700"
        type='button'
        disabled={
          name.length == 0 || skuId.length == 0
          || price <= 0 || image === undefined
          || inputColors.length == 0 || inputSizes.length == 0
        }
        onClick={async () => {
          try {
            if(image != undefined) {
              // Upload the attached image to Supabase Storage
              const { data: uploadData, error } = await supabase
                .storage
                .from('product-images')
                .upload(uuidv4(), image, {
                  cacheControl: '3600',
                  upsert: false
                })

              if(error) {
                console.error(JSON.stringify(error));
                return;
              }

              // Transform the product data for GQL mutation

              // category
              const catNested = {
                connect: {
                  id: category.id
                }
              } as CategoryCreateNestedOneWithoutProductsInput;

              // colors
              let colWhere = [] as ColorWhereUniqueInput[];
              inputColors.forEach((col) => {
                colWhere.push({ id: col.id } as ColorWhereUniqueInput);
              });

              const colNested = {
                connect: colWhere
              } as ColorCreateNestedManyWithoutProductsInput;

              // sizes
              let sizesWhere = [] as SizeWhereUniqueInput[];
              inputSizes.forEach((s) => {
                sizesWhere.push({id: s.id} as SizeWhereUniqueInput);
              });

              const sizesNested = {
                connect: sizesWhere
              } as SizeCreateNestedManyWithoutProductsInput;

              const data = {
                skuId,
                name,
                price,
                image: uploadData.path,
                category: catNested,
                colors: colNested,
                sizes: sizesNested,
              } as ProductCreateInput;
              
              mutate({data});
            }
          }
          // Unauthorized user in dashboard or network error
          catch(e) {
            console.error(e);
          }
          
          setModalOpen(false);
        }}>Save</button>
    </form>
  );
}
