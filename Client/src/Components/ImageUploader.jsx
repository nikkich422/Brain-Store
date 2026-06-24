import { useDropzone } from "react-dropzone";
import { useCallback, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const ImageUploader = ({ files, setFiles }) => {

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const removeImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div>

      {/* Drop Area */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer hover:bg-gray-50"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">
          Drag & drop images here, or click to select
        </p>
      </div>

      {/* Preview */}
      <div className="flex gap-4 mt-4 flex-wrap">
        {files.map((file, index) => (
          <div key={index} className="relative">

            <img
              src={file.preview}
              className="w-24 h-24 object-cover rounded border border-gray-300"
            />

            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-600 hover:bg-red-800 text-white rounded-full p-1 cursor-pointer"
            >
              <IoClose size={14} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ImageUploader;