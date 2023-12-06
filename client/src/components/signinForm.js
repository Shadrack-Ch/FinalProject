import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To display error messages
  const [isLoading, setIsLoading] = useState(false); // To manage loading state

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state

    try {
      const response = await fetch('/auth/login', { // Corrected endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Assuming the response returns JSON

      if (response.ok) {
        console.log('Sign-in successful!');
        navigate('/dashboard'); // Redirect to dashboard or home page
      } else {
        setErrorMessage(data.message || 'Sign-in failed!'); // Set error message from response
      }
    } catch (error) {
      setErrorMessage('Error during sign-in');
      console.error('Error during sign-in:', error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p/>
      <button type="submit" disabled={isLoading}>{isLoading ? 'Signing In...' : 'Sign In'}</button>
    </form>
  );
};

export default SignInForm;
