import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL, DASHBOARD_URL } from "../../config";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await axios.post(`${API_URL}/signup`, form, {
        withCredentials: true,
      });
      if (data.success) {
        window.location.href = DASHBOARD_URL;
      } else {
        setMsg(data.message);
      }
    } catch (err) {
      setMsg("Could not reach the server");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", margin: "80px auto" }}>
      <h2 className="mb-4">Sign up</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Sign up
        </button>
      </form>
      {msg && <p className="text-danger mt-3">{msg}</p>}
      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}