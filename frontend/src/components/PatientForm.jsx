import { useState } from "react";
import api from "../services/api";

function PatientForm({ refresh }) {

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    phone: "",
    priority: "normal"
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
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


if (name === "name" && !/^[A-Za-z\s]*$/.test(value)) {
  setError("Name can only contain letters");
  return;
}

if (!/^\d{10}$/.test(patient.phone)) {
  setError("Phone must be exactly 10 digits");
  return;
}

    try {
      setLoading(true);

      const res = await api.post("/patient", patient);
      console.log(res.data);

      setPatient({
        name: "",
        age: "",
        phone: "",
        priority: "normal"
      });

      refresh();

    } catch (err) {
      console.log("ADD PATIENT ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={addPatient} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

    <input
  name="name"
  placeholder="Patient Name"
  value={patient.name}
  onChange={handleChange}
  type="text"
/>

     <input
  name="age"
  placeholder="Age"
  value={patient.age}
  onChange={handleChange}
  type="number"
  min="1"
  max="120"
/>


    <input
  name="phone"
  placeholder="Phone"
  value={patient.phone}
  onChange={handleChange}
  type="tel"
  maxLength={10}
/>

      {error && (
        <p style={{ color: "red", fontSize: "14px" }}>
          {error}
        </p>
      )}

      <button disabled={loading}>
        {loading ? "Adding..." : "Add Patient"}
      </button>

    </form>
  );
}

export default PatientForm;