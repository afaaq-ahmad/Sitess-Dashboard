"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import LiveHitsTable from "../liveHitsTable";
import Styles from "./styles.module.css";

const LiveHits = () => {
  const defaultData = [
    {
      user: "Johnathan Doe",
      userIcon: "/assets/profile-picture.jpeg",
      time: "01:01PM",
      balance: 2,
      summary: "11.32K",
      rap: 0,
      hitter: "Jack Lee",
      hitterIcon: "/assets/profile-picture.jpeg",
    },
    {
      user: "Johnathan Doe ldkf",
      userIcon: "/assets/profile-picture.jpeg",
      time: "01:01PM",
      balance: 2,
      summary: "11.32K",
      rap: 0,
      hitter: "Jack Lee",
      hitterIcon: "/assets/profile-picture.jpeg",
    },
    {
      user: "Johnathan Doe ldkf",
      userIcon: "/assets/profile-picture.jpeg",
      time: "01:01PM",
      balance: 2,
      summary: "11.32K",
      rap: 0,
      hitter: "Jack Lee",
      hitterIcon: "/assets/profile-picture.jpeg",
    },
    {
      user: "Johnathan Doe ldkf",
      userIcon: "/assets/profile-picture.jpeg",
      time: "01:01PM",
      balance: 2,
      summary: "11.32K",
      rap: 0,
      hitter: "Jack Lee",
      hitterIcon: "/assets/profile-picture.jpeg",
    },
  ];

  const [liveHitsData, setLiveHitsData] = useState(defaultData);

  const fetchLiveHitsData = async () => {
    try {
      const response = await axios.get("https://example.com/api/liveHits");
      setLiveHitsData(response.data);
    } catch (error) {
      console.error("Error fetching live hits data:", error);
    }
  };

  useEffect(() => {
    fetchLiveHitsData();

    const interval = setInterval(fetchLiveHitsData, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={Styles.liveHitsContainer}>
      <div style={{ fontWeight: "600" }}>Live Hits</div>
      <div className={Styles.liveHitsTableContainer}>
        <LiveHitsTable data={liveHitsData} />
      </div>
    </div>
  );
};

export default LiveHits;
