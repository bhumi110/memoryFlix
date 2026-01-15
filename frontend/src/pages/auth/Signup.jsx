import { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../../api/auth.api";
import "../../styles/auth.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirm) {
    console.warn("PASSWORD MISMATCH");
    return alert("Passwords do not match");
  }

  try {
    const res = await signupApi({ name,email, password });
    console.log("SIGNUP RESPONSE:", res.data);
    console.log("CREATED USER:", res.data.user);

    navigate("/profiles");
  } catch (err) {
    console.error("SIGNUP ERROR:", err.response?.data || err.message);
  }
};



  return (
    <div className="auth-page">
      <div className="auth-logo" onClick={() => navigate("/")}>MEMORYFLIX</div>

      <Paper elevation={10} className="auth-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
            <TextField
            fullWidth
            variant="filled"
            label="Name"
            className="auth-input mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            className="auth-input mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            variant="filled"
            label="Confirm Password"
            className="auth-input mb-4"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <Button fullWidth type="submit" className="auth-btn">
            Get Started
          </Button>
        </form>

        <div className="auth-divider">OR</div>

        <Button fullWidth className="google-btn">
          Continue with Google
        </Button>

        <div className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </div>
      </Paper>
    </div>
  );
};

export default Signup;
