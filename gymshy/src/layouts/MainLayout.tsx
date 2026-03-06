import { Outlet, NavLink } from "react-router-dom";
import Login from "../components/Login";

function MainLayout() {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/equipment", label: "Equipment" },
    { to: "/planner", label: "Plan Visit" },
    { to: "/progress", label: "Progress" },
    { to: "/toolkit", label: "Toolkit" },
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* Top navbar */}
      <nav className="bg-white shadow-sm px-4 py-3 d-flex align-items-center justify-content-between">
        <span className="fs-5 fw-bold text-success">Gymmy</span>
        <div className="d-flex align-items-center gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                isActive
                  ? "text-success fw-medium text-decoration-none small"
                  : "text-muted text-decoration-none small"
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="vr" />
          <Login />
        </div>
      </nav>

      {/* Page content */}
      <main className="container-xl mx-auto px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
