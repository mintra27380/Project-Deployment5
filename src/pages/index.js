"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Droneconfig.css";

const DroneConfig = () => {
  const [droneData, setDroneData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("https://project-deployment-0e9c.onrender.com/configs/3001")
      .then((res) => res.json())
      .then((data) => {
        setDroneData(data);
        localStorage.setItem("droneInfo", JSON.stringify(data)); // ✅ save to localStorage
      })
      .catch((err) => console.error("Error fetching drone config:", err));
  }, []);

  return (
    <>
      <header>
        <h1>WEB CLIENT</h1>
        <nav>
          <a className="active" href="#">View Config</a>
          <a href="/temperature">Temperature Log Form</a>
          <a href="#">View Logs</a>
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
