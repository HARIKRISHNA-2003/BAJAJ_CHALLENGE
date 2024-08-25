import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(''); // State for error message

  const handleSubmit = async () => {
    try {
      // Reset error message before attempting to submit
      setError('');
      // Parse JSON and submit
      const parsedData = JSON.parse(jsonData);
      const res = await axios.post('http://localhost:4000/bfhl', parsedData);
      setResponse(res.data);
    } catch (error) {
      // Set error message if JSON parsing fails or if there's an API error
      if (error instanceof SyntaxError) {
        setError('Invalid JSON format. Please correct the JSON and try again.');
      } else {
        setError('An error occurred while submitting data.');
      }
    }
  };

  const handleSelectChange = (options) => {
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;
    const selectedValues = selectedOptions.map(option => option.value);

    return (
      <div className="response">
        {selectedValues.includes('Alphabets') && <div>Alphabets: {response.alphabets.join(', ')}</div>}
        {selectedValues.includes('Numbers') && <div>Numbers: {response.numbers.join(', ')}</div>}
        {selectedValues.includes('Highest Alphabet') && <div>Highest Alphabet: {response.highest_alphabet.join(', ')}</div>}
      </div>
    );
  };

  const options = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest Alphabet', label: 'Highest Alphabet' }
  ];

  return (
    <div className="App">
      <h1>Bajaj Finserv Health Challenge </h1><br /><h3>By Harikrishna (21bce9434)</h3>
      <textarea 
        className="json-input" 
        value={jsonData} 
        onChange={(e) => setJsonData(e.target.value)} 
        placeholder="API Input" 
      />
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      <Select
        isMulti
        options={options}
        onChange={handleSelectChange}
        placeholder="Select options"
      />
      {error && <div className="error">{error}</div>} {/* Display error message */}
      {renderResponse()}
    </div>
  );
}

export default App;
