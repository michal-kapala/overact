import { useState } from 'react';
import TextInput from './controls/TextInput';
import PriceInput from './controls/PriceInput';
import { ProductCreateInput } from '../../../../prisma/generated/type-graphql';
import { useCreateOneProduct } from '../../../graphql/mutations/Product/createOneProduct';

export default function AddProductForm() {
    
    // name field
    const [name, setName] = useState("");
    
    // SKU id field
    const [skuId, setSkuId] = useState("");

    // price field
    const [price, setPrice] = useState(0);

    // mutation hook
    const {data, status, mutate} = useCreateOneProduct();

    return (
        <form>
            <TextInput label='Name' placeholder='An amazing product' input={name} setInput={setName}/>
            <TextInput label='SKU' placeholder='Barcode' input={skuId} setInput={setSkuId}/>
            <PriceInput label='Price' placeholder='0.00' input={price} setInput={setPrice} />
            <button type='button' onClick={() => {
                const data = {
                    skuId,
                    name,
                    price,
                    image: "test_image.png",
                    category: {}
                } as ProductCreateInput;
                
                try {
                    console.info(JSON.stringify({data}));
                    mutate({data});
                }
                catch(e: any) {
                    console.error(e);
                }
            }}>Save</button>
        </form>
    );
}
