//worksheet component for question detail or subject screen?
//note: I will fix this soon -Irah

import React from 'react';
import { Link } from 'react-router-dom';

const Worksheet = ({ children }) => {
  return (
    <div className="worksheet-container">
      <h2>Worksheets</h2>
      <div>
        <p>Example 1</p>
        <p>Example 2</p>
        <p>Example 3</p>
        <p>Example 4</p>
      </div>
    {/* <Link to="/worksheets">See More</Link> */}
      {children}
    </div>
  );
};

export default Worksheet;
