const Login = () => {

  async function handleSubmit(event){
    event.preventDefault();

    let formData = new window.FormData(event.target);

    let urlencoded = new URLSearchParams(formData).toString();

    const response = await fetch('http://localhost:8585/auth/login', {
      method: 'post',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlencoded
    });

    const json = await response.json();

    if (!json.success){
      alert('Wrong credentials');
    }
    else{
      localStorage.setItem('token', json.token);
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
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
