interface TextInputProps {
    label: string,
    placeholder: string,
    input: string
    setInput: Function,
}

export default function TextInput(props: TextInputProps) {

    return (
      <div>
        <label htmlFor={props.label} className="block text-sm font-medium text-gray-700">
          {props.label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            type="text"
            name={props.label}
            id={props.label}
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={props.placeholder}
            value={props.input}
            onChange={(e) => props.setInput(e.target.value)}
          />
        </div>
      </div>
    )
  }