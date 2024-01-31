import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);

    // Register Handler för att registrera användare..
      const handleRegister = async () => {
      try {
        const response = await fetch('http://localhost:3001/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to register user');
        }
  
        const result = await response.json();
        alert(result.message)
      } catch (error) {
        alert(error.message || 'Failed to register user');
      }
    };

  const handleLogin = async () => {

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // inkludera cookies
        body: JSON.stringify({ username, password }),
      });
      
      console.log('Response Status:', response.status);

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      localStorage.setItem('access_token', result.token);
      setUsername ('');
      setPassword ('');
      setAuthenticated(true);
    } catch (error) {
      alert(error.message || 'Login failed!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');  // Remove token
    setAuthenticated(false);  // Update authentication state
    setData(null);  // Clear fetched data
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:3002/data', {
        headers: { Authorization: `Bearer ${token}`,
       },
       credentials: 'include', // skickar med cookies
      });
    
      if (!response.ok) {
        if (response.status === 401) {  // Unauthorized
          handleLogout();
          alert('Session expired. Please login again.');
          return;
        }
        throw new Error('Failed to fetch data from backend');
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      alert(error.message || 'Failed to fetch data');
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated ?
          <>
            {data ? <p>{data}</p> : 
            <button onClick={fetchData} id="fetchData-button" >Fetch Data</button>}
            <button onClick={handleLogout} id="logOut-button" >Logout</button>
          </> :
          (<div className="login-container">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="input-field" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input-field" />
            <button onClick={handleLogin} className="login-button">Login</button>
            <button onClick={handleRegister} className="register-button">Register</button>
          </div>)
        }
      </header>
    </div>
  );
}

export default App;