import React from 'react';
import '../designs/Worksheet.css'

const Worksheet = ({ subject }) => {
  // Define worksheet data for each subject
  const worksheetData = {
    Calculus: [
      { name: 'Differentiation Worksheet', url: '/pdfs/Calculus/Differentiation Worksheet.pdf' },
      { name: 'Integral Worksheet', url: '/pdfs/Calculus/Integral Worksheet.pdf' },
      // Add more Calculus worksheets as needed
    ],
    Physics: [
      { name: 'Acceleration Worksheet', url: '/pdfs/Physics/Acceleration Worksheet.pdf' },
      { name: 'Torque Worksheet', url: '/pdfs/Physics/Torque Worksheet.pdf' },
      // Add more Physics worksheets as needed
    ],
    Math: [
      { name: 'Algebra Worksheet', url: '/pdfs/Math/Algebra Worksheet.pdf' },
      { name: 'Trigonometry Worksheet', url: '/pdfs/Math/Trigonometry Worksheet.pdf' },
      // Add more Mathematics worksheets as needed
    ],
    English: [
      { name: 'Crossword Worksheet', url: '/pdfs/English/Crossword Worksheet.pdf' },
      { name: 'Present Tense Worksheet', url: '/pdfs/English/Present Tense Worksheet.pdf' },
      // Add more English worksheets as needed
    ],
    Science: [
      { name: 'Animal Cell Worksheet', url: '/pdfs/Science/Animal Cell Worksheet.pdf' },
      { name: 'Chemistry Worksheet', url: '/pdfs/Science/Chemistry Worksheet.pdf' },
      // Add more Science worksheets as needed
    ],
    History: [
      { name: 'Philippine History Worksheet', url: '/pdfs/History/Philippine History Worksheet.pdf' },
      { name: 'General History Worksheet', url: '/pdfs/History/General History Worksheet.pdf' },
      // Add more History worksheets as needed
    ],
  };

  // Retrieve worksheets for the specified subject
  const worksheets = worksheetData[subject] || [];

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.substring(url.lastIndexOf('/') + 1);
    link.click();
  };

  return (
    <div className="worksheet-container">
    <div className="worksheet-content">
      <h1 className="worksheet-title">{subject} Worksheets</h1>
      <ul className="worksheet-list">
        {worksheets.map((worksheet, index) => (
          <li key={index} className="worksheet-item">
            <span className="worksheet-name">{worksheet.name}</span>
            <button className="worksheet-button" onClick={() => handleDownload(worksheet.url)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Worksheet;
