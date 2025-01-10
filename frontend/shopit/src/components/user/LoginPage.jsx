import { useContext, useState } from "react";
import api from "../../api";
import Error from "../ui/Error";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function LoginPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const {setIsAuthenticated, getUsername} = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    api.post('token/', { username, password })
      .then(response => {
        setUsername("");
        setPassword("");
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        setLoading(false);
        setIsAuthenticated(true);
        getUsername();
        const redirectTo = location.state?.from || '/';
        navigate(redirectTo);
      }
    )
    .catch(err => {
      console.log(err.message);
      setLoading(false);
      setError("Invalid username or password!");
    });
  }

  return (
    <div className="container mt-3">
      {error && <Error error={error} />}
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="username"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    </div>

  );
}

export default LoginPage;