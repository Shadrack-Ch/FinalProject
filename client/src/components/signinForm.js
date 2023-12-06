import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/auth'; // Adjust the path as per your project structure

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth(); // Destructure the login function from useAuth
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use the login function from useAuth
      await login({ email, password });
      console.log('Sign-in successful!');
      navigate('/dashboard'); // Redirect to the dashboard on successful login
    } catch (error) {
      // Handle errors that may be thrown by the login function
      setErrorMessage(error.message || 'Sign-in failed!');
      console.error('Error during sign-in:', error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p />
      <button type="submit" disabled={isLoading}>{isLoading ? 'Signing In...' : 'Sign In'}</button>
    </form>
  );
};

export default SignInForm;
