"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./temperature.css";

export default function TemperaturePage() {
  const [droneInfo, setDroneInfo] = useState({
    drone_id: "-",
    drone_name: "-",
    light: "-",
    country: "-",
  });
  const [temperature, setTemperature] = useState("");
  const [mounted, setMounted] = useState(false); // ✅ สำคัญ: ป้องกัน Hydration error
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("droneInfo");
    if (stored) {
      try {
        setDroneInfo(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing droneInfo:", err);
      }
    }
    setMounted(true); // ✅ บอกว่าพร้อม render แล้ว
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!temperature) {
      alert("⚠️ Please enter a temperature.");
      return;
    }

    const fullData = {
      ...droneInfo,
      temperature,
      created_at: new Date().toISOString(),
    };

    localStorage.setItem("tempLog", JSON.stringify(fullData));
    alert("✅ Submission successful!");
  };

  if (!mounted) return null; // ✅ ป้องกัน hydration mismatch

  return (
    <>
      <header>
        <h1>WEB CLIENT</h1>
        <nav>
          <a href="/" className={pathname === "/" ? "active" : ""}>
            View Config
          </a>
          <a href="/temperature" className={pathname === "/temperature" ? "active" : ""}>
            Temperature Log Form
          </a>
          <a href="/result" className={pathname === "/result" ? "active" : ""}>
            View Logs
          </a>
        </nav>
      </header>

      <main className="main">
        <div className="center-box">
          <h2 className="title">SUBMIT TEMPERATURE </h2>
          <div className="config-box">
            <div className="data-item">Drone ID : {droneInfo.drone_id}</div>
            <div className="data-item">Drone Name : {droneInfo.drone_name}</div>
            <div className="data-item">Light : {droneInfo.light}</div>
            <div className="data-item">Country : {droneInfo.country}</div>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Enter Temperature (°C)"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="input-box"
            />

            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
