interface TextInputProps {
    label: string,
    placeholder: string,
    input: string,
    setInput: Function,
}

export default function TextInput({label, placeholder, input, setInput}: TextInputProps) {

    return (
      <div>
        <label htmlFor={label} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            type="text"
            name={label}
            id={label}
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
    )
  }
