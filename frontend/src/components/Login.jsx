import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  async function handleSubmit(event){
    event.preventDefault();

    const response = await fetch('http://localhost:8585/auth/login', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });

    const json = await response.json();

    if (!json.success){
      alert('Wrong credentials');
    }
    else{
      // localStorage.setItem('token', json.token);
      alert(`Got new token ${json.data.token} which will expire on ${json.data.expiryDate}`)
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
          name="username"
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          placeholder="Password"
          required
        />
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
