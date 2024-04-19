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
      <h1 className="worksheet-title">{subject} Worksheets</h1>
      <div className="worksheet-content">
        <div className="worksheet-list-container">
          {worksheets.map((worksheet, index) => (
            <div key={index} className="worksheet-item-container">
              <div className="worksheet-item">
                <span className="worksheet-name">{worksheet.name}</span>
                <div className="worksheet-button-container">
                  <button className="worksheet-button" onClick={() => handleDownload(worksheet)}>Download</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Worksheet;
