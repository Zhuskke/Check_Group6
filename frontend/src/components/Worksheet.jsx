import React from 'react';
import '../designs/Worksheet.css';

const Worksheet = ({ subject, worksheets }) => {
  const handleDownload = (worksheet) => {
    if (!worksheet || !worksheet.name || !worksheet.file) {
      console.error("Invalid worksheet object:", worksheet);
      return;
    }
  
    const link = document.createElement('a');
    link.href = worksheet.file;
    link.setAttribute('download', worksheet.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <div className="worksheet-container">
      <div className="worksheet-content">
        <h1 className="worksheet-title">{subject} Worksheets</h1>
        <ul className="worksheet-list">
          {worksheets.map((worksheet, index) => (
            <li key={index} className="worksheet-item">
              <span className="worksheet-name">{worksheet.name}</span>
              <button className="worksheet-button" onClick={() => handleDownload(worksheet)}>Download</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Worksheet;
