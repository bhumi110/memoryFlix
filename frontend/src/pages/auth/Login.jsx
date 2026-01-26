import { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";
import "../../styles/auth.css";
import Aurora from "../../components/Modals/Aurora";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi({ email, password });
      console.log("LOGIN RESPONSE:", res.data);
      console.log("LOGGED IN USER:", res.data.user);
      console.log("TOKEN:", res.data.token);

      login(res.data.token, res.data.user);
      navigate("/profiles");
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div className="auth-page">
      {/* Aurora background behind card */}

      <Aurora
        colorStops={["#990008", "#f94c39", "#e70808"]}
        blend={0.6}
        amplitude={0.65}
        speed={0.6}
      />
      {/* <div className="aurora-overlay" /> */}
      <div className="auth-logo" onClick={() => navigate("/")}>
        MEMORYFLIX
      </div>
      <div className="auth-wrapper">
        {/* Auth Card */}
        <Paper elevation={10} className="auth-card">
          <h2>Sign In</h2>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="filled"
              label="Email"
              className="auth-input mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              type="password"
              variant="filled"
              label="Password"
              className="auth-input mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button fullWidth type="submit" className="auth-btn">
              Sign In
            </Button>
          </form>

          <div className="auth-divider">OR</div>

          <Button fullWidth className="google-btn">
            <i className="fa-brands fa-google"></i> Continue with Google
          </Button>

          <div className="auth-footer">
            New to Memoryflix?{" "}
            <span onClick={() => navigate("/signup")}>Sign up now</span>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Login;
