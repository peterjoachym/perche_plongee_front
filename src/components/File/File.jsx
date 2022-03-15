import React from 'react';

const File = (props) => {
  const { doc_name, file_name } = props;

  return (
    <button className="file-button" type="button">
      <img className="file-image" src="./public/icons.svg" alt="file" />
      <a
        href={`${process.env.REACT_APP_API_URL}/documents/${file_name}`}
        rel="noreferrer"
        target="_blank"
      >
        {doc_name}
      </a>
    </button>
  );
};

export default File;
