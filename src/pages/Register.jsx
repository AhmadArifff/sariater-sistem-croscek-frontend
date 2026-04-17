import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [hasAdmin, setHasAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nama: "",
  });

  // STEP 1: Check apakah sudah ada admin
  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    try {
      const response = await api.get("/auth/check-admin");
      setHasAdmin(response.data.hasAdmin);
      setLoading(false);

      // Jika sudah ada admin, redirect ke login setelah 3 detik
      if (response.data.hasAdmin) {
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.error("Error checking admin:", err);
      setError("Error memeriksa status admin");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error saat user mengetik
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username tidak boleh kosong");
      return false;
    }

    if (!/^[a-zA-Z0-9_-]{3,20}$/.test(formData.username)) {
      setError("Username harus 3-20 karakter, hanya a-z, 0-9, _, -");
      return false;
    }

    if (!formData.password.trim()) {
      setError("Password tidak boleh kosong");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password minimal 8 karakter");
      return false;
    }

    if (!formData.nama.trim()) {
      setError("Nama tidak boleh kosong");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setRegistering(true);
    setError("");

    try {
      const response = await api.post("/auth/register-admin", formData);

      setSuccess(response.data.message);
      setFormData({ username: "", password: "", nama: "" });

      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.error || "Gagal membuat admin user"
      );
    } finally {
      setRegistering(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>🔄 Memeriksa Status Admin...</h1>
          <p>Silakan tunggu sebentar...</p>
        </div>
      </div>
    );
  }

  // Jika sudah ada admin, tampilkan pesan
  if (hasAdmin) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>✅ Admin Sudah Ada!</h1>
          <p className="success-message">
            Sistem sudah memiliki admin user. 
          </p>
          <p className="info-message">
            Silakan login dengan akun admin atau hubungi admin untuk membuat user baru.
          </p>
          <p className="redirect-message">
            Mengalihkan ke halaman login dalam 3 detik...
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Ke Halaman Login
          </button>
        </div>
      </div>
    );
  }

  // Form register admin (hanya muncul jika belum ada admin)
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🔐 Setup Admin Pertama Kali</h1>
          <p className="subtitle">Buat akun admin untuk sistem Croscek Absen</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Contoh: admin"
              disabled={registering}
            />
            <small className="form-hint">3-20 karakter, hanya a-z, 0-9, _, -</small>
          </div>

          <div className="form-group">
            <label htmlFor="nama">Nama Lengkap</label>
            <input
              id="nama"
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Contoh: Administrator"
              disabled={registering}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 8 karakter"
              disabled={registering}
            />
            <small className="form-hint">
              ✅ Minimal 8 karakter, sebaiknya kombinasi huruf, angka, simbol
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={registering}
          >
            {registering ? "🔄 Membuat Admin..." : "Buat Admin User"}
          </button>
        </form>

        <div className="info-box">
          <h3>⚠️ Penting:</h3>
          <ul>
            <li>Form ini hanya bisa diakses SEKALI (saat belum ada admin)</li>
            <li>Setelah admin dibuat, form tidak akan muncul lagi</li>
            <li>User baru ditambah via admin panel setelah login</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
