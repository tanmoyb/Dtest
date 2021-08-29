import React, { useState, useEffect } from "react";
import axios from "axios";
interface Props {
  fileData: string;
  content: string;
  setFileData: (value: string) => void; // optional prop to open modal when button clicked,
}
const API_BASE = "http://localhost:5000";

const FileLoader: React.FC<Props> = ({
  content,
  fileData,
  setFileData,
}): React.ReactElement => {
  const [selectedFile, setSelectedFile] = useState();
  const [loaded, setLoaded] = useState(Number);

  const onChangeHandler = (event): void => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setLoaded(0);
  };

  const onClickHandler = (): void => {
    const data = new FormData();
    // @ts-ignore
    data.append("file", selectedFile);
    data.append("body", fileData);
    axios
      .post("http://localhost:8000/upload", data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res);
        readFile();
      });
  };

  const readFile = () => {
    const fileReader = new FileReader();
    // @ts-ignore
    fileReader.readAsText(selectedFile, "UTF-8");
    fileReader.onload = (e) => {
      // @ts-ignore
      console.log("e.target.result", selectedFile);
      // @ts-ignore
      setFileData(e.target.result);
    };
  };

  return (
    <>
      <input type="file" onChange={onChangeHandler} accept=".json" />
      <button type="button" onClick={onClickHandler}>
        Upload
      </button>
      {"uploaded file content -- " + fileData}
    </>
  );
};

export default FileLoader;
