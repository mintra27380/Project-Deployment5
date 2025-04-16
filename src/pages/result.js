"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./re.css";

export default function ResultPage() {
  const [logs, setLogs] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchData() {
      try {
        // ดึงข้อมูลจาก API (ให้แน่ใจว่า endpoint นี้ส่ง JSON ในรูปแบบ array)
        const res = await fetch("https://project-deployment-0e9c.onrender.com/logs/3001");
        const apiLogs = await res.json();

        // ดึงข้อมูล log ที่เพิ่ง submit จาก localStorage (เก็บในหน้า 2 ด้วย key "tempLog")
        const localLog = localStorage.getItem("tempLog");
        const parsedLocal = localLog ? JSON.parse(localLog) : null;

        // ผนวกข้อมูล ทั้ง API และ local (ถ้ามี)
        const allLogs = parsedLocal ? [parsedLocal, ...apiLogs] : apiLogs;
        setLogs(allLogs);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    }

    fetchData();
  }, []);

  // ฟังก์ชั่นแปลงวันที่ (ใช้ฟิลด์ "created" หรือ "created_at")
  const formatDate = (log) => {
    const dateString = log.created || log.created_at || "";
    const d = new Date(dateString);
    return isNaN(d.getTime())
      ? ""
      : d.toLocaleString("th-TH", { dateStyle: "short", timeStyle: "short" });
  };

  // ฟังก์ชั่นแปลงค่าอุณหภูมิ (ใช้ฟิลด์ "celsius" หรือ "temperature")
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
          <a href="/" className={pathname === "/" ? "active" : ""}>
            View Config
          </a>
          <a
            href="/temperature"
            className={pathname === "/temperature" ? "active" : ""}
          >
            Temperature Log Form
          </a>
          <a
            href="/result"
            className={pathname === "/result" ? "active" : ""}
          >
            View Logs
          </a>
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
                      <td>
                        {formatDate(log)}
                      </td>
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
