import Sidebar from "../components/Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { isAuthenticated, loading } = useAuth();

  // Jika loading, tampilkan loading state
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "16px", color: "#4b5563" }}>Memuat...</p>
      </div>
    );
  }

  // Jika belum login, redirect ke login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      {/* Sidebar - Fixed/Sticky */}
      <div style={{ position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Main Content - Scrollable */}
      <main style={{ 
        flex: 1, 
        padding: "24px", 
        background: "#f3f4f6", 
        minHeight: "100vh",
        overflow: "auto",
        width: "100%"
      }}>
        <Outlet />
      </main>
    </div>
  );
}
