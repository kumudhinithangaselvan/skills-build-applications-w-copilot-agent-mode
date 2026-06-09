import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : "http://localhost:8000";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE}/api/teams/`)
      .then(res => res.json())
      .then(data => setTeams(Array.isArray(data) ? data : data.results || []))
      .catch(console.error);
  }, []);
  return <div><h2>Teams</h2><ul>{teams.map((t, i) => <li key={i}>{JSON.stringify(t)}</li>)}</ul></div>;
}
