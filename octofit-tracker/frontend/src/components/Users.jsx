import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : "http://localhost:8000";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE}/api/users/`)
      .then(res => res.json())
      .then(data => setUsers(Array.isArray(data) ? data : data.results || []))
      .catch(console.error);
  }, []);
  return <div><h2>Users</h2><ul>{users.map((u, i) => <li key={i}>{JSON.stringify(u)}</li>)}</ul></div>;
}
