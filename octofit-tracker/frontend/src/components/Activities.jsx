import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : "http://localhost:8000";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE}/api/activities/`) // -8000.app.github.dev/api/activities
      .then(res => res.json())
      .then(data => setActivities(Array.isArray(data) ? data : data.results || []))
      .catch(console.error);
  }, []);
  return <div><h2>Activities</h2><ul>{activities.map((a, i) => <li key={i}>{JSON.stringify(a)}</li>)}</ul></div>;
}
