import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : "http://localhost:8000";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE}/api/leaderboard/`) // -8000.app.github.dev/api/leaderboard
      .then(res => res.json())
      .then(data => setLeaderboard(Array.isArray(data) ? data : data.results || []))
      .catch(console.error);
  }, []);
  return <div><h2>Leaderboard</h2><ul>{leaderboard.map((l, i) => <li key={i}>{JSON.stringify(l)}</li>)}</ul></div>;
}
