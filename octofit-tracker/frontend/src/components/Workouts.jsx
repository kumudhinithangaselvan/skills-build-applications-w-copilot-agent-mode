import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : "http://localhost:8000";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE}/api/workouts/`) // -8000.app.github.dev/api/workouts
      .then(res => res.json())
      .then(data => setWorkouts(Array.isArray(data) ? data : data.results || []))
      .catch(console.error);
  }, []);
  return <div><h2>Workouts</h2><ul>{workouts.map((w, i) => <li key={i}>{JSON.stringify(w)}</li>)}</ul></div>;
}
