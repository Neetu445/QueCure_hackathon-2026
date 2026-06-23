import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "../services/api";
import { Clock, Users, Stethoscope } from "lucide-react";

function WaitingRoom() {
  const [queue, setQueue] = useState([]);
  const [serving, setServing] = useState(null);
  const [time, setTime] = useState(new Date());

  const loadQueue = async () => {
    const res = await api.get("/patient");
    setQueue(res.data.waiting);
    setServing(res.data.serving);
  };

  useEffect(() => {
    loadQueue();

    const socket = io("http://localhost:5000");
    socket.on("queueUpdated", loadQueue);

    // Live clock
    const timer = setInterval(() => setTime(new Date()), 1000);

    return () => {
      socket.disconnect();
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={styles.page}>

      {/* ---- HEADER ---- */}
      <div style={styles.header}>
        <div style={styles.logoArea}>
          <div style={styles.logoIcon}>
            <Stethoscope size={20} color="white" />
          </div>
          <div>
            <h1 style={styles.logoText}>Queue Cure</h1>
            <p style={styles.logoSub}>Patient Waiting Room</p>
          </div>
        </div>

        {/* Live Clock */}
        <div style={styles.clock}>
          {time.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      </div>

      {/* ---- BODY ---- */}
      <div style={styles.content}>

        {/* LEFT - Now Serving */}
        <div>
          <p style={styles.sectionLabel}>🩺 NOW SERVING</p>
          <div style={styles.servingCard}>
            {serving ? (
              <>
                <div style={styles.tokenBig}>#{serving.tokenNumber}</div>
                <h2 style={styles.servingName}>{serving.name}</h2>
                <span style={styles.servingBadge}>
                  Currently with Doctor
                </span>
              </>
            ) : (
              <>
                <div style={{ fontSize: "60px" }}>👨‍⚕️</div>
                <p style={styles.servingName}>Doctor is free</p>
                <span style={styles.servingBadge}>
                  Waiting for next patient
                </span>
              </>
            )}
          </div>
        </div>

        {/* RIGHT - Queue List */}
        <div style={styles.rightSide}>

          {/* Stats */}
          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <Users size={20} color="#0284c7" />
              <div>
                <p style={styles.statNum}>{queue.length}</p>
                <p style={styles.statLbl}>Waiting</p>
              </div>
            </div>
            <div style={styles.statBox}>
              <Clock size={20} color="#7c3aed" />
              <div>
                <p style={styles.statNum}>{queue.length * 6} min</p>
                <p style={styles.statLbl}>Est. Wait</p>
              </div>
            </div>
          </div>

          
          <div style={styles.queueBox}>
            <p style={styles.sectionLabel}>📋 UPCOMING PATIENTS</p>

            {queue.length === 0 ? (
              <div style={styles.emptyBox}>
                <p style={{ fontSize: "48px" }}>🎉</p>
                <p style={styles.emptyText}>No patients waiting</p>
              </div>
            ) : (
              queue.map((p, i) => (
                <div
                  key={p._id}
                  style={{
                    ...styles.queueCard,
                    ...(i === 0 ? styles.nextCard : {}),
                  }}
                >
                  <div style={styles.queueLeft}>
                    <span style={{
                      ...styles.posNum,
                      background: i === 0 ? "#0284c7" : "#e2e8f0",
                      color: i === 0 ? "white" : "#64748b",
                    }}>
                      {i + 1}
                    </span>
                    <div>
                      <p style={styles.queueName}>{p.name}</p>
                      <p style={styles.queueToken}>
                        Token #{p.tokenNumber}
                      </p>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    {i === 0 && (
                      <span style={styles.nextBadge}>NEXT UP</span>
                    )}
                    <p style={styles.waitTime}>{i * 6} min</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4f8",
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  logoIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #0284c7, #7c3aed)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "white",
    fontSize: "20px",
    fontWeight: "800",
    margin: 0,
  },
  logoSub: {
    color: "#7dd3fc",
    fontSize: "12px",
  },
  clock: {
    color: "white",
    fontSize: "24px",
    fontWeight: "700",
    fontFamily: "monospace",
    background: "rgba(255,255,255,0.1)",
    padding: "10px 20px",
    borderRadius: "12px",
    letterSpacing: "2px",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    padding: "32px 40px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  sectionLabel: {
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2px",
    color: "#64748b",
    marginBottom: "12px",
  },
  servingCard: {
    background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
    borderRadius: "24px",
    padding: "48px 32px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 12px 32px rgba(2,132,199,0.25)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    minHeight: "320px",
  },
  tokenBig: {
    fontSize: "80px",
    fontWeight: "900",
    color: "#7dd3fc",
    lineHeight: 1,
  },
  servingName: {
    fontSize: "24px",
    fontWeight: "700",
    color: "white",
    margin: 0,
  },
  servingBadge: {
    background: "rgba(2,132,199,0.3)",
    color: "#7dd3fc",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    border: "1px solid rgba(2,132,199,0.4)",
  },
  rightSide: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  statBox: {
    background: "white",
    borderRadius: "14px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    border: "1px solid #f1f5f9",
  },
  statNum: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },
  statLbl: {
    fontSize: "12px",
    color: "#64748b",
    margin: 0,
  },
  queueBox: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: "1px solid #f1f5f9",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  queueCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  },
  nextCard: {
    background: "#eff6ff",
    border: "1.5px solid #bfdbfe",
  },
  queueLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  posNum: {
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "14px",
    flexShrink: 0,
  },
  queueName: {
    fontWeight: "700",
    color: "#0f172a",
    fontSize: "15px",
    margin: 0,
  },
  queueToken: {
    color: "#64748b",
    fontSize: "12px",
    margin: 0,
  },
  nextBadge: {
    background: "#0284c7",
    color: "white",
    padding: "3px 8px",
    borderRadius: "6px",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    display: "inline-block",
    marginBottom: "4px",
  },
  waitTime: {
    color: "#64748b",
    fontSize: "13px",
    margin: 0,
    fontWeight: "500",
  },
  emptyBox: {
    textAlign: "center",
    padding: "40px",
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: "16px",
    marginTop: "10px",
  },
};

export default WaitingRoom;