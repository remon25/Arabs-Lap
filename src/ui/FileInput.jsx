import { useState } from "react";
import styled from "styled-components";

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;

  input[type="file"] {
    display: none;
  }

  label {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-left: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }

  .file-name {
    font-size: 1.2rem;
    color: var(--color-neutral-600);
  }
`;

const FileInput = () => {
  const [fileName, setFileName] = useState("لم يتم اختيار صورة");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "لم يتم اختيار صورة");
  };

  return (
    <FileInputWrapper>
      <input
        type="file"
        id="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file">اختر صورة</label>
      <span className="file-name">{fileName}</span>
    </FileInputWrapper>
  );
};

export default FileInput;
