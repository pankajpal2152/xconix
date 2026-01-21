import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../api/authApi";
import "./CreateUser.css";

export default function CreateUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const res = await signInUser(payload);

      const token =
        res.data?.token ||
        res.data?.accessToken ||
        res.data?.data?.token;

      if (!token) {
        alert("Login succeeded but token not returned");
        return;
      }

      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin error:", error.response?.data || error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="create-user-container">
      <h1>Sign In</h1>

      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Sign In
        </button>
      </form>
    </div>
  );
}
