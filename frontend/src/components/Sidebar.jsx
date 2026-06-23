import { LayoutDashboard, Users, BarChart2, Stethoscope } from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Patients",  icon: <Users size={18} /> },
    { label: "Analytics", icon: <BarChart2 size={18} /> },
  ];

  return (
    <aside style={styles.sidebar}>

      {/* Logo */}
      <div style={styles.logoBox}>
        <div style={styles.logoIcon}>
          <Stethoscope size={22} color="white" />
        </div>
        <div>
          <h2 style={styles.logoText}>QueCure</h2>
          <p style={styles.logoSub}>Smart Clinic</p>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Menu */}
      <nav>
        <p style={styles.menuLabel}>MENU</p>

        {menuItems.map((item) => (
          <div
            key={item.label}
            style={{
              ...styles.menuItem,
              ...(active === item.label ? styles.menuItemActive : {}),
            }}
            onClick={() => setActive(item.label)}
          >
            <span>{item.icon}</span>
            {item.label}
          </div>
        ))}

      </nav>

      {/* Bottom Badge */}
      <div style={styles.bottomBadge}>
        <div style={styles.badgeDot} />
        <div>
          <p style={styles.badgeTitle}>System Online</p>
          <p style={styles.badgeSub}>Real-time sync active</p>
        </div>
      </div>

    </aside>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    flexShrink: 0,
    height: "100vh",
    position: "sticky",
    top: 0,
    background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    gap: "8px",
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 4px",
    marginBottom: "8px",
  },
  logoIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #0284c7, #7c3aed)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  logoText: {
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    margin: 0,
  },
  logoSub: {
    color: "#64748b",
    fontSize: "11px",
    marginTop: "2px",
  },
  divider: {
    height: "1px",
    background: "#334155",
    margin: "8px 0 16px",
  },
  menuLabel: {
    color: "#475569",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    padding: "0 12px",
    marginBottom: "8px",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 14px",
    borderRadius: "10px",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "4px",
  },
  menuItemActive: {
    background: "linear-gradient(90deg, #0284c7, #0369a1)",
    color: "white",
    boxShadow: "0 4px 12px rgba(2,132,199,0.3)",
  },
  bottomBadge: {
    marginTop: "auto",
    background: "#1e3a2f",
    borderRadius: "12px",
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid #166534",
  },
  badgeDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#22c55e",
    flexShrink: 0,
    boxShadow: "0 0 6px #22c55e",
  },
  badgeTitle: {
    color: "#86efac",
    fontSize: "13px",
    fontWeight: "600",
  },
  badgeSub: {
    color: "#4ade80",
    fontSize: "11px",
    opacity: 0.7,
  },
};

export default Sidebar;