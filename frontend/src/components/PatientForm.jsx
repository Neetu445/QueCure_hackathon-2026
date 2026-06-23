import { useState } from "react";
import api from "../services/api";
import { UserPlus } from "lucide-react";

function PatientForm({ refresh }) {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    phone: "",
    priority: "normal",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && !/^[A-Za-z\s]*$/.test(value)) {
      setError("Name can only contain letters");
      return;
    }
    setPatient({ ...patient, [name]: value });
    setError("");
  };

  const addPatient = async (e) => {
    e.preventDefault();

    if (!patient.name || !patient.age || !patient.phone) {
      setError("All fields are required");
      return;
    }
    const age = Number(patient.age);
    if (!age || age < 1 || age > 120) {
      setError("Age must be between 1 and 120");
      return;
    }
    if (!/^\d{10}$/.test(patient.phone)) {
      setError("Phone must be exactly 10 digits");
      return;
    }

    try {
      setLoading(true);
      await api.post("/patient", patient);
      setPatient({ name: "", age: "", phone: "", priority: "normal" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      refresh();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={addPatient} style={styles.form}>

      {/* Row 1 - Name and Age */}
      <div style={styles.row}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Patient Name</label>
          <input
            name="name"
            placeholder="Enter full name"
            value={patient.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Age</label>
          <input
            name="age"
            placeholder="Age"
            value={patient.age}
            onChange={handleChange}
            type="number"
            min="1"
            max="120"
            style={styles.input}
          />
        </div>
      </div>

      {/* Row 2 - Phone and Priority */}
      <div style={styles.row}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Phone Number</label>
          <input
            name="phone"
            placeholder="10-digit number"
            value={patient.phone}
            onChange={handleChange}
            type="tel"
            maxLength={10}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Priority</label>
          <select
            name="priority"
            value={patient.priority}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="normal"> Normal</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Messages */}
      {error && <p style={styles.error}> {error}</p>}
      {success && <p style={styles.success}> Patient added successfully!</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          ...styles.button,
          opacity: loading ? 0.7 : 1
        }}
      >
        <UserPlus size={16} />
        {loading ? "Adding..." : "Add Patient"}
      </button>

    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    padding: "11px 14px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#0f172a",
    outline: "none",
    background: "#f8fafc",
    width: "100%",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "13px",
    background: "linear-gradient(135deg, #0284c7, #0369a1)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(2,132,199,0.35)",
    marginTop: "4px",
  },
  error: {
    color: "#dc2626",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
  },
  success: {
    color: "#16a34a",
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
  },
};

export default PatientForm;