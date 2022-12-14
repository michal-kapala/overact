interface PriceInputProps {
    label: string,
    placeholder: string,
    input: number,
    setInput: Function,
}

export default function PriceInput({label, placeholder, input, setInput}: PriceInputProps) {
    return (
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm appearance-none">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name={label}
            id={label}
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm appearance-none"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(parseFloat(e.target.value))}
          />
        </div>
      </div>
    )
  }
