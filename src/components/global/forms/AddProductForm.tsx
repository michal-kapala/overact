import { useState } from 'react';
import TextInput, { TextInputProps } from './controls/TextInput';

export default function AddProductForm() {
    const [name, setName] = useState("");

    return (
        <TextInput label='Name' placeholder='An amazing product' input={name} setInput={setName}/>
    );
}
