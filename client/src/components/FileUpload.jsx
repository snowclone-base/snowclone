import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      // console.log("file: ", file);
      let formData = new FormData();
      formData.append("file", file);
      console.log("formdata:", formData);

      await axios
        .post("http://localhost:5175/schema", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("response: ", res);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("please select a file");
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <form onSubmit={handleFileSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
