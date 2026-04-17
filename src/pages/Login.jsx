import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [hasAdmin, setHasAdmin] = useState(null);

  const checkAdminExists = async () => {
    try {
      const response = await api.get("/auth/check-admin");
      setHasAdmin(response.data.hasAdmin);
    } catch (err) {
      console.error("Error checking admin:", err);
      setHasAdmin(true); // Assume ada admin jika error
    }
  };

  // Check apakah ada admin saat component mount
  useEffect(() => {
    checkAdminExists();
  }, []);

  // Show loading screen while checking admin
  if (hasAdmin === null) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to bottom right, #f0f9ff, #e0e7ff)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
          <p style={{ color: "#1f2937", fontWeight: "500" }}>Memuat...</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Username dan password harus diisi");
      return;
    }

    try {
      await login(formData.username, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login gagal");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to bottom right, #f0f9ff, #e0e7ff)" }}>
      <div style={{ width: "100%", maxWidth: "448px" }}>
        <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", padding: "32px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" }}>
              CROSCEK KEHADIRAN
            </h1>
            <p style={{ color: "#4b5563" }}>Sistem Absensi &amp; Cek Kehadiran</p>
          </div>

          {/* Banner jika belum ada admin */}
          {hasAdmin === false && (
            <div style={{ background: "#fef3c7", border: "1px solid #fcd34d", color: "#92400e", padding: "16px", borderRadius: "8px", marginBottom: "24px" }}>
              <p style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 8px 0" }}>⚠️ Belum Ada Admin!</p>
              <p style={{ fontSize: "13px", margin: "0 0 12px 0" }}>Sistem belum memiliki akun admin. Buat akun admin terlebih dahulu.</p>
              <button
                onClick={() => navigate("/register-admin")}
                style={{
                  background: "#f59e0b",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "13px"
                }}
              >
                Buat Admin Sekarang
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", padding: "12px 16px", borderRadius: "8px" }}>
                <p style={{ fontSize: "14px", fontWeight: "500" }}>{error}</p>
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                style={{
                  width: "100%",
                  padding: "8px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  outline: "none",
                  transition: "all 0.2s"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                style={{
                  width: "100%",
                  padding: "8px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  outline: "none",
                  transition: "all 0.2s"
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
              <label htmlFor="rememberMe" style={{ marginLeft: "8px", fontSize: "14px", color: "#4b5563", cursor: "pointer" }}>
                Ingat saya
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "#d1d5db" : "#2563eb",
                color: "white",
                fontWeight: "600",
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s"
              }}
            >
              {loading ? "Sedang Login..." : "Login"}
            </button>
          </form>

          <div style={{ marginTop: "32px", paddingTop: "32px", borderTop: "1px solid #e5e7eb" }}>
            <p style={{ fontSize: "12px", color: "#4b5563", textAlign: "center", marginBottom: "16px", fontWeight: "500" }}>
              Demo Credentials (Development Only)
            </p>
            <div style={{ fontSize: "12px", color: "#374151", background: "#f9fafb", padding: "16px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <p style={{ fontWeight: "600", color: "#1d4ed8" }}>Admin Account:</p>
                <p>Username: stafsariater2026</p>
                <p>Password: staf12345</p>
              </div>
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#4b5563", fontSize: "14px", marginTop: "24px" }}>
          © 2026 Sari Ater Hot Spring. Hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
}
