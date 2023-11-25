import React, { useCallback, useState } from "react";
import { useDropzone, DropzoneRootProps } from "react-dropzone";
import upload_img from "../assets/upload.png";
import useLocalStorage from "./LocalStorage";

const FileUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useLocalStorage<{ filename: string; size: number }[]>('uploadedFiles', []);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    const maxSize = 1024 * 1024; 
    if (file.size > maxSize) {
      alert("File size exceeds 1 MB. Please choose a smaller file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulating file upload progress
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) =>
          prevProgress !== null ? prevProgress + 10 : 10
        );
      }, 500);

      // Simulate file upload success
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);

        // Save file information to localStorage
        const fileInfo = {
          filename: file.name,
          size: file.size,
        };

        // Update existing files array
        const updatedFiles = [...uploadedFiles, fileInfo];
        setUploadedFiles(updatedFiles);
        setUploadProgress(null); // Reset progress bar
      }, 500);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  }, [uploadedFiles, setUploadedFiles]);

  const deleteFile = (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const {
    getRootProps,
    getInputProps,
  }: { getRootProps: DropzoneRootProps; getInputProps: any } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="pdf-file-wrapper mt-12 mx-14">
      <div
        {...getRootProps()}
        className="border-2 cursor-pointer flex justify-center items-center border-dashed border-gray-300 p-4 mb-4"
      >
        <input {...getInputProps()} />
        <img
          src={upload_img}
          alt=""
          style={{ width: "2rem", height: "2rem" }}
        />
        <p className="text-center ml-5">
          Drag & drop a file here, or click to select a file
        </p>
      </div>

      {uploadProgress !== null && (
        <div className="mb-4">
          <div
            className="rounded overflow-hidden"
            style={{ border: "1px solid #606770" }}
          >
            <div
              style={{ width: `${uploadProgress}%` }}
              className="prograss-bar text-white p-1 text-center"
            >
              {uploadProgress}%
            </div>
          </div>
        </div>
      )}

      {uploadedFiles.map((file, index) => (
        <div
          key={index}
          className="uploaded-item flex justify-between items-center p-4 rounded mb-4"
        >
          <div className="flex">
            <span className="mr-2">{index + 1}: </span>
            <p className="text-green-600">File uploaded successfully:</p>
            <p className="ml-2">{file.filename}</p>
          </div>
          <button
            onClick={() => deleteFile(index)}
            className="bg-red-500 text-white px-5 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileUpload;
