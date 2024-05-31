import React, { useState, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../controllers/usercontroller';
import { TextField, Button } from '@mui/material';

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();



  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/userlogin', { username, password });
        //setData(JSON.stringify(response.data));       
        // Handle successful login (e.g., redirect, store token)
        const { success, message } = response.data;
        if (success) {
          navigate('/admin');
        }
        else{
          setData("invalid user name or password");
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            setError(error.message);
            console.error('Axios error:', error);
        } else {
            setError('An unexpected error occurred');
            console.error('Unexpected error:', error);
        }
    }
};
  return (
    <Container>
      <LoginForm onSubmit={handleLogin} action='POST'>
        <h2>Login</h2>
        <InputWrapper>
          <TextField label="Email" variant="outlined" fullWidth value={username} onChange={e => setUsername(e.target.value)} />
        </InputWrapper>
        <InputWrapper>
          <TextField label="Password" type="password" variant="outlined" value={password} fullWidth onChange={e => setPassword(e.target.value)} />
          <TextField label="Password" type="password" variant="outlined" value={password} fullWidth onChange={e => setPassword(e.target.value)} />
        </InputWrapper>
        <Button variant="contained" color="primary" fullWidth type="submit">
          Sign In
        </Button>
     <p>{data}</p> 
      </LoginForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

export default LoginPage;