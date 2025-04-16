"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link"; // ✅ เพิ่ม Link
import './re.css';

export default function ResultPage() {
  const [logs, setLogs] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://project-deployment-0e9c.onrender.com/logs/3001");
        const apiLogs = await res.json();

        const localLog = localStorage.getItem("tempLog");
        const parsedLocal = localLog ? JSON.parse(localLog) : null;

        const allLogs = parsedLocal ? [parsedLocal, ...apiLogs] : apiLogs;
        setLogs(allLogs);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    }

    fetchData();
  }, []);

  const formatDate = (log) => {
    const dateString = log.created || log.created_at || "";
    const d = new Date(dateString);
    return isNaN(d.getTime())
      ? ""
      : d.toLocaleString("th-TH", { dateStyle: "short", timeStyle: "short" });
  };

  const formatTemp = (log) => {
    return log.celsius !== undefined
      ? log.celsius
      : log.temperature !== undefined
      ? log.temperature
      : "";
  };

  return (
    <>
      <header>
        <h1>WEB CLIENT</h1>
        <nav>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            View Config
          </Link>
          <Link href="/temperature" className={pathname === "/temperature" ? "active" : ""}>
            Temperature Log Form
          </Link>
          <Link href="/result" className={pathname === "/result" ? "active" : ""}>
            View Logs
          </Link>
        </nav>
      </header>

      <main className="main">
        <div className="center-box">
          <h2 className="title">DRONE LOGS</h2>

          {logs.length === 0 ? (
            <p className="no-data">No submitted logs found.</p>
          ) : (
            <div className="table-container">
              <table className="log-table">
                <thead>
                  <tr>
                    <th>Created</th>
                    <th>Country</th>
                    <th>Drone ID</th>
                    <th>Drone Name</th>
                    <th>Celsius</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={index}>
                      <td>{formatDate(log)}</td>
                      <td>{log.country}</td>
                      <td>{log.drone_id}</td>
                      <td>{log.drone_name}</td>
                      <td style={{ color: "#00cfff", textAlign: "right" }}>
                        {formatTemp(log)}&#8451;
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
