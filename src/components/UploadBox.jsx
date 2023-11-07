import React, { useState } from "react";
import axios from "axios";

const BACKEND_ADDRESS = "http://localhost:8000";

const UploadBox = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = React.useCallback(() => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post(`${BACKEND_ADDRESS}/upload/`, formData)
        .then((response) => {
          console.log("File uploaded successfully");
          setSelectedFile(null);
          if (props.onUploadResponse) {
            props.onUploadResponse(response.data);
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      alert("Please select a file before uploading.");
    }
  }, [props, selectedFile]);

  return (
    <div className="w-96 border border-gray-200 p-5 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Upload</h1>
      <input
        type="file"
        onChange={handleFileSelect}
        className="mb-4 p-2 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Upload
      </button>
      {selectedFile && (
        <p className="mt-4">Selected File: {selectedFile.name}</p>
      )}
    </div>
  );
};

export default UploadBox;
