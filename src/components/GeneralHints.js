import React from 'react';

const GeneralHints = ({ generalHints }) => (
  <div style={{ background: '#F5F5F5', padding: '10px' }}>
    <h3>General Hints</h3>
    {generalHints.map(hint => (
      <p>{hint}</p>
    ))}
  </div>
);

export default GeneralHints;
