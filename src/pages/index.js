"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link"; // ✅ เพิ่มการ import
import "./Droneconfig.css";

const DroneConfig = () => {
  const [droneData, setDroneData] = useState(null);
  const pathname = usePathname(); // ✅ สำหรับตรวจ path

  useEffect(() => {
    fetch("https://project-deployment-0e9c.onrender.com/configs/3001")
      .then((res) => res.json())
      .then((data) => {
        setDroneData(data);
        localStorage.setItem("droneInfo", JSON.stringify(data));
      })
      .catch((err) => console.error("Error fetching drone config:", err));
  }, []);

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
          <h2 className="title">DRONE CONFIG</h2>
          {droneData ? (
            <div className="config-box">
              <div className="data-item">Drone ID : {droneData?.drone_id ?? '-'}</div>
              <div className="data-item">Drone Name : {droneData?.drone_name ?? '-'}</div>
              <div className="data-item">Light : {droneData?.light ?? '-'}</div>
              <div className="data-item">Country : {droneData?.country ?? '-'}</div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </>
  );
};

export default DroneConfig;
