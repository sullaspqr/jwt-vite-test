import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://jwt.sulla.hu/login', {
        username,
        password
      });
      setToken(response.data.token);
      console.log(token);
    } catch (error) {
      console.error("Hitelesítési hiba:", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('https://jwt.sulla.hu/termekek', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
    } catch (error) {
      console.error("Adatok lekérése sikertelen:", error);
    }
  };
  return (
    <div>
      <h1>Bejelentkezés</h1>
    Felhasználónév: <input type="text" placeholder="felhasználónév"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    />
    Jelszo: <input type="password" placeholder="jelszo"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={handleLogin}>Bejelentkezés</button>
    {token && (
    <div>
      <h2>Sikeres bejelentkezés védett végpontra</h2>
      <p>Token: {token}</p>
      <button onClick={fetchData}>Végpont lekérdezés</button>
      {data && (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.name} - {item.price} </li>
          ))}
        </ul>
      )}
    </div>)}
    </div>
  );
};