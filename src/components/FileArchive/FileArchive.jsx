import React from 'react';

const FileArchive = (props) => {
  const { id, doc_name, doc_type } = props;

  return (
    <tr className="member-line">
      <td>{id}</td>
      <td>{doc_name}</td>
      <td>{doc_type}</td>
    </tr>
  );
};

export default FileArchive;
