import { useRef } from "react";

interface ImageUploadProps {
  setInput: Function,
}

export default function ImageUpload({ setInput }: ImageUploadProps) {
  const inputFile = useRef<HTMLInputElement | null>(document.querySelector('input#image-file'));

  /**
   * Opens the file upload dialog.
   */
  function onUpload() {
    // `current` points to the mounted file input element
    inputFile?.current?.click();
  };

  return (
    <div className="flex flex-col py-4">
      <label htmlFor="image-file">Image</label>
      <div className="flex flex-row pt-2">
        <input
          className=""
          lang="en-US"
          accept="image/*"
          id="image-file"
          ref={inputFile}
          type="file"
          onChange={(e) => {
            let file = e.target.files ? e.target.files[0] : null;
            setInput(file);
            
          }}
        />
        <button onClick={onUpload}
          className="justify-center items-center rounded-md border border-transparent bg-blue-600 disabled:bg-gray-500 px-4 py-1 text-base font-medium text-white hover:bg-blue-700"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
