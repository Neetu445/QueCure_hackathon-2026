import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Users, Clock, Bell, CheckCircle,
         ChevronRight, Check } from "lucide-react";
import api from "../services/api";
import PatientForm from "../components/PatientForm";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import QueueTable from "../components/QueueTable";

function Receptionist() {
  const [queue, setQueue] = useState([]);
  const [serving, setServing] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [avgTime, setAvgTime] = useState(6);

  const loadQueue = async () => {
    try {
      const res = await api.get("/patient");
      setQueue(res.data.waiting);
      setServing(res.data.serving);
      setCompleted(res.data.completed || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadQueue();
    const socket = io("http://localhost:5000");
    socket.on("queueUpdated", loadQueue);
    return () => socket.disconnect();
  }, []);

  const callNext = async () => {
    try {
      await api.patch("/patient/next");
      loadQueue();
    } catch (err) {
      console.log("CALL NEXT ERROR", err);
    }
  };

  const completePatient = async () => {
    try {
      await api.patch("/patient/complete");
      loadQueue();
    } catch (err) {
      console.log("COMPLETE ERROR", err);
    }
  };

  return (
    <div style={styles.app}>
      <Sidebar />

      <main style={styles.main}>

        {/* ---- TOP HEADER ---- */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>Receptionist Dashboard</h1>
            <p style={styles.pageSubtitle}>
              Manage patient queue in real-time
            </p>
          </div>
          <div style={styles.dateBox}>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* ---- STAT CARDS ---- */}
        <div style={styles.cards}>
          <StatCard
            icon={<Users size={24} />}
            title="Waiting"
            value={queue.length}
            color="#0284c7"
          />
          <StatCard
            icon={<Clock size={24} />}
            title="Avg Wait"
            value={`${queue.length * avgTime} min`}
            color="#7c3aed"
          />
          <StatCard
            icon={<Bell size={24} />}
            title="Serving"
            value={serving ? 1 : 0}
            color="#d97706"
          />
          <StatCard
            icon={<CheckCircle size={24} />}
            title="Completed"
            value={completed.length}
            color="#16a34a"
          />
        </div>

        {/* ---- MAIN GRID ---- */}
        <div style={styles.grid}>

          {/* LEFT SIDE */}
          <div style={styles.leftPanel}>

            {/* Add Patient Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Add New Patient</h2>
              <p style={styles.cardSub}>Register a patient to the queue</p>
              <div style={styles.divider} />
              <PatientForm refresh={loadQueue} />
            </div>

            {/* Avg Time Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Consultation Time</h2>
              <p style={styles.cardSub}>Average minutes per patient</p>
              <div style={styles.divider} />
              <div style={styles.avgTimeBox}>
                <input
                  type="number"
                  value={avgTime}
                  min="1"
                  onChange={(e) => setAvgTime(Number(e.target.value))}
                  style={styles.avgInput}
                />
                <span style={{ color: "#64748b", fontSize: "14px" }}>
                  minutes
                </span>
              </div>
            </div>

            {/* Action Buttons Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Queue Actions</h2>
              <p style={styles.cardSub}>Control the patient flow</p>
              <div style={styles.divider} />

              <button style={styles.callBtn} onClick={callNext}>
                <ChevronRight size={18} />
                Call Next Patient
              </button>

              <button style={styles.completeBtn} onClick={completePatient}>
                <Check size={18} />
                Complete Current Patient
              </button>
            </div>

          </div>

          {/* RIGHT SIDE - Now Serving */}
          <div style={styles.rightPanel}>
            <div style={styles.servingCard}>
              <p style={styles.servingLabel}>NOW SERVING</p>

              {serving ? (
                <>
                  <div style={styles.tokenDisplay}>
                    #{serving.tokenNumber}
                  </div>
                  <h2 style={styles.servingName}>{serving.name}</h2>
                  <div style={styles.servingDetails}>
                    <span style={styles.detail}>Age: {serving.age}</span>
                    <span style={{ color: "#475569" }}>•</span>
                    <span style={styles.detail}>
                      {serving.priority === "urgent"
                        ? " Urgent" : " Normal"}
                    </span>
                  </div>
                  <span style={styles.servingBadge}>
                    Currently with Doctor
                  </span>
                </>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "60px" }}></p>
                  <p style={styles.servingName}>Doctor is free</p>
                  <p style={{ color: "#475569", fontSize: "13px" }}>
                    Click "Call Next" to begin
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ---- QUEUE TABLE ---- */}
        <QueueTable queue={queue} />

      </main>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: "#f0f4f8",
  },
  main: {
    flex: 1,
    padding: "32px",
    overflowX: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "12px",
  },
  pageTitle: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },
  pageSubtitle: {
    color: "#64748b",
    fontSize: "14px",
    marginTop: "4px",
  },
  dateBox: {
    background: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "500",
    border: "1px solid #e2e8f0",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  leftPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  rightPanel: {
    display: "flex",
    flexDirection: "column",
  },
  card: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: "1px solid #f1f5f9",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
  },
  cardSub: {
    fontSize: "13px",
    color: "#94a3b8",
    marginTop: "4px",
  },
  divider: {
    height: "1px",
    background: "#f1f5f9",
    margin: "16px 0",
  },
  avgTimeBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avgInput: {
    padding: "10px 14px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "20px",
    fontWeight: "700",
    color: "#0284c7",
    width: "90px",
    background: "#f8fafc",
    outline: "none",
    textAlign: "center",
  },
  callBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "14px",
    background: "linear-gradient(135deg, #0284c7, #0369a1)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(2,132,199,0.35)",
    marginBottom: "10px",
  },
  completeBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "14px",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(22,163,74,0.35)",
  },
  servingCard: {
    background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
    borderRadius: "20px",
    padding: "36px 24px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 8px 24px rgba(2,132,199,0.25)",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    minHeight: "400px",
  },
  servingLabel: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2px",
    color: "#7dd3fc",
  },
  tokenDisplay: {
    fontSize: "80px",
    fontWeight: "900",
    color: "white",
    lineHeight: 1,
  },
  servingName: {
    fontSize: "22px",
    fontWeight: "700",
    color: "white",
    margin: 0,
  },
  servingDetails: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  detail: {
    fontSize: "14px",
    color: "#94a3b8",
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
};

export default Receptionist;