import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const API_BASE_URL = 'http://localhost:8000/api/generate.php';

function App() {
  // State
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumber, setUseNumber] = useState(true);
  const [useSpecial, setUseSpecial] = useState(false);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [copied, setCopied] = useState(false);

  // Compute strength
  const getStrength = () => {
    const classes = [useUpper, useLower, useNumber, useSpecial].filter(Boolean).length;
    if (length >= 12 && classes >= 3) return { label: 'Strong', color: '#27ae60' };
    if (length >= 8 && classes >= 2) return { label: 'Medium', color: '#f39c12' };
    return { label: 'Weak', color: '#e74c3c' };
  };

  const strength = getStrength();

  // Simulate offline for testing error handling
  // const [simulateOffline, setSimulateOffline] = useState(false);

  //   // error message from backend
  //   if (simulateOffline) {
  //     setErrors(['Unable to reach the password generator. Is the backend running?']);
  //     return;
  //   }

  

  // Generate password
  const generatePassword = async () => {
    // Clear previous state
    setErrors([]);
    setPassword('');

    

    const params = new URLSearchParams({
      length,
      useUpperCase: useUpper,
      useLowerCase: useLower,
      useNumber: useNumber,
      useSpecialChar: useSpecial,
    });

    try {
      const response = await fetch(`${API_BASE_URL}?${params}`);

      if (response.ok) {
        // Success: plain text password
        const pwd = await response.text();
        setPassword(pwd);
      } else {
        // Handle API validation errors (400 Bad Request)
        const errorData = await response.json();
        const errorList = [];

        if (errorData.details) {
          // Push each validation message into the list
          Object.values(errorData.details).forEach((msg) => {
            errorList.push(msg);
          });
        } else if (errorData.error) {
          // Fallback to top-level error message
          errorList.push(errorData.error);
        } else {
          errorList.push('Invalid input parameters.');
        }

        setErrors(errorList);
      }
    } catch (err) {
      // Handle network-level errors (CORS, DNS, offline, etc.)
      setErrors(['Unable to reach the password generator. Is the backend running?']);
      console.error('Network error:', err);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setError('Failed to copy');
    }
  };

  // Generate on mount
  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="container">
      <h1>Password Maker</h1>

      <div className="controls">
        <label>
          Length: <span className="length-value">{length}</span>
          <input
            type="range"
            min="1"
            max="99"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>

        <div className="toggles">
          <label>
            <input
              type="checkbox"
              checked={useUpper}
              onChange={(e) => setUseUpper(e.target.checked)}
            />{' '}
            Uppercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={useLower}
              onChange={(e) => setUseLower(e.target.checked)}
            />{' '}
            Lowercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={useNumber}
              onChange={(e) => setUseNumber(e.target.checked)}
            />{' '}
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={useSpecial}
              onChange={(e) => setUseSpecial(e.target.checked)}
            />{' '}
            Special Characters
          </label>
        </div>

        <button onClick={generatePassword}>Generate Password</button>
      </div>

      <div className="output">
        <input type="text" value={password} readOnly />
        <button onClick={copyToClipboard}>
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>

      <div className="strength">
        Strength: <span style={{ color: strength.color }}>{strength.label}</span>
      </div>

      
      {errors.length > 0 && (
        <div className="error">
          {errors.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      )}
      
    </div>
  );
}

export default App
