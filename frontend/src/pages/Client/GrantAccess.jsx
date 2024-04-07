import React, { useState } from 'react';

const GrantAccess = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputId, setInputId] = useState('');
  const handleSubmit = () => {
    // You can perform actions with the inputValue here, such as submitting it to a backend API
    console.log('Submitted value:', inputValue , inputId);
    // Clear the input field after submission
    setInputValue('');
  };

  return (
    <div className="mt-10 text-black flex-col">
      <h1>Grant Access</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a string"
      />
       <input
        type="text"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
        placeholder="Enter a string"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default GrantAccess;
