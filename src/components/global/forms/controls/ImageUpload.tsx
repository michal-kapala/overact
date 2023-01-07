interface ImageUploadProps {
  setInput: Function,
}

export default function ImageUpload({ setInput }: ImageUploadProps) {
  return (
    <div className="flex flex-col py-4">
      <label htmlFor="image-file">Image</label>
      <div className="flex flex-row pt-2">
        <input
          className=""
          lang="en-US"
          accept="image/*"
          id="image-file"
          type="file"
          onChange={(e) => {
            let file = e.target.files ? e.target.files[0] : null;
            setInput(file);
          }}
        />
      </div>
    </div>
  );
}
