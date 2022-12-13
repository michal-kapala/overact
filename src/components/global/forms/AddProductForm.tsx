import { useState } from 'react';
import TextInput from './controls/TextInput';
import { ProductCreateInput } from '../../../../prisma/generated/type-graphql';
import { useCreateOneProduct } from '../../../graphql/mutations/Product/createOneProduct';

function onSubmit(variables: ProductCreateInput, mutate: Function) {
    try {
        mutate(variables);
    }
    catch(e) {
        console.error(e);
    }
}

export default function AddProductForm() {
    
    // name field
    const [name, setName] = useState("");
    
    // SKU id field
    const [skuId, setSkuId] = useState("");

    // mutation hook
    const {data, status, mutate} = useCreateOneProduct();

    return (
        <form onSubmit={() => { 
            var variables = {
                skuId,
                name,
                price: 1.0,
                image: "test_image.png",
                category: {}
            } satisfies ProductCreateInput;
            onSubmit(variables, mutate);
        }}>
            <TextInput label='Name' placeholder='An amazing product' input={name} setInput={setName}/>
            <TextInput label='SKU' placeholder='Barcode' input={skuId} setInput={setSkuId}/>
            <button type='submit'>Submit</button>
        </form>
    );
}
