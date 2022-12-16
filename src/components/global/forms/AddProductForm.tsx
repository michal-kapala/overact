import { useState } from 'react';
import TextInput from './controls/TextInput';
import PriceInput from './controls/PriceInput';
import type { Category, CategoryCreateNestedOneWithoutProductsInput, CategoryWhereUniqueInput, ProductCreateInput } from '../../../../prisma/generated/type-graphql';
import { useCreateOneProduct } from '../../../graphql/mutations/Product/createOneProduct';
import CategoryCombo from './controls/CategoryCombo';

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
    const [category, setCategory] = useState({id: "", name: ""} as CategoryWhereUniqueInput);

    // mutation hook
    const {data, status, mutate} = useCreateOneProduct();

    return (
        <form>
            <TextInput label='Name' placeholder='An amazing product' input={name} setInput={setName}/>
            <TextInput label='SKU' placeholder='Barcode' input={skuId} setInput={setSkuId}/>
            <PriceInput label='Price' placeholder='0.00' input={price} setInput={setPrice} />
            <CategoryCombo categories={categories} setCategory={setCategory}/>

            <button type='button' onClick={() => {
                const catNested = {
                    connect: {
                        id: category.id
                    }
                } as CategoryCreateNestedOneWithoutProductsInput;

                const data = {
                    skuId,
                    name,
                    price,
                    image: "test_image.png",
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
