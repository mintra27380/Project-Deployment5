"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link"; // ✅ เพิ่มการ import Link
import './temperature.css';git init

export default function TemperaturePage() {
  const [droneInfo, setDroneInfo] = useState({
    drone_id: "-",
    drone_name: "-",
    light: "-",
    country: "-",
  });
  const [temperature, setTemperature] = useState("");
  const [mounted, setMounted] = useState(false);
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
    setMounted(true);
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

  if (!mounted) return null;

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
          <h2 className="title">SUBMIT TEMPERATURE</h2>
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
