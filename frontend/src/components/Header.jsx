import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title" onClick={() => navigate("/")}>
            My Book Library
          </h1>
          <div className="auth-buttons">
            <button onClick={() => navigate("/login")} className="auth-btn">
              Login
            </button>
            <button onClick={() => navigate("/books/form")} className="auth-btn">
              +&nbsp;Book
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
