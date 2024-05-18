
'use client';

import "./styles/login.scss";
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState(null);
    const [cookie, setCookie] = useState(null);

    // for storing session data 
    useEffect(() => {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }, []);

    //for storing cookie data
    useEffect(() => {
      const storedCookie = document.cookie.split(';').find(c => c.startsWith('token:'));
      if (storedCookie) {
        setCookie(storedCookie.split(':')[1]);
      }
    }, []);
  
    // handeling submit and fetch api
   const handleSubmit = async (event) => {
    event.preventDefault();
    try  {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setToken(data.token);
      sessionStorage.setItem('token', data.token);
      console.log('Login successful:', data);
      alert("login was successful");

      setCookie(data.token);
      document.cookie = `token=${data.token}; path=/;`;

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

    return(
        <section className='form-section d-flex h-100 justify-content-center align-items-center'>
         <form onSubmit={handleSubmit} className='form-border p-2 bg-white rounded'>
         <div className='d-flex flex-row align-items-center'>
            <div className='me-3 ms-1'>
              <Image
                src="/icons8-person-30.png"
                alt="This is an image of a cat"
                width={20}
                height={20}
              />
            </div>
            <div>
              <p className='fs-5 fw-medium'>Sign in</p>
            </div>
        </div>  

          <div className='horizontal-line'></div> 
          
          <div className="d-flex flex-row align-items-center mb-4">
            <label htmlFor="username" className='me-3'>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="d-flex flex-row align-items-center">
            <label htmlFor="password" className='me-3'>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='horizontal-line'></div>
          <button type="submit" className="btn btn-primary w-100 mt-1">
            Login
          </button>
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </form>
      </section>    
    );
}
