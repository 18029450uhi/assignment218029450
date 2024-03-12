import React from 'react';

const ProblemSpecificHints = ({ problemSpecificHints }) => (
  <div style={{ background: '#F5F5F5', padding: '10px' }}>
    <h3>Problem Specific Hints</h3>
    {ProblemSpecificHints.map(hint => (
      <p>{hint}</p>
    ))}
  </div>
);

export default ProblemSpecificHints;
