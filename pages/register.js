import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();

    axios({
      url: 'http://159.89.203.190:1000/api/user/register',
      method: 'POST',
      headers: {},
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
        router.push('/');
      })
      .catch((err) => {
        setErrorMessage('Registration failed.'); // Set error message
        console.log(err);
      });

    console.log('Registration submitted:', {
      firstName,
      lastName,
      email,
      password,
    });

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="card">
      <Header />
      <h1 className='text-xl font-bold'>Бүртгүүлэх</h1>
      <form onSubmit={handleRegister}>
        <label>
          Овог:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Нэр:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          И-майл:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Нууц үг:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Бүртгүүлэх</button>
      </form>
    </div>
  );
};

export default Register;
