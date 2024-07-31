import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { register } from "../store/authSlice";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleRegister = () => {
    dispatch(register({ username, password, email })).then((action) => {
      if (register.fulfilled.match(action)) {
        navigate("/login");
      }
    });
  };

  return (
    <div className="body-register">
      <div className="container-register">
        <h1 className="header-register">Register</h1>
        {authStatus === "loading" && <p>Registering...</p>}
        {authError && <p style={{ color: "red" }}>{authError}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
