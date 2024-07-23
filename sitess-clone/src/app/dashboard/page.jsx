"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import BarGraph from "@/components/barGraph";
import OverviewLineGraph from "@/components/overviewLineGraph";
import Styles from "./styles.module.css";
import LeaderboardList from "@/components/leaderboardList";
import LiveHits from "@/components/liveHits";

const DashboardPage = () => {
  const titles = ["Accounts", "Visits", "Clicks"];

  // Default data for initial state
  const defaultBarGraphData = [
    {
      data: [323, 343, 600, 135, 556, 356, 0],
      totalValue: 45,
      todayValue: 10,
      todayAvg: 4,
      percentValue: 10,
    },
    {
      data: [123, 234, 345, 456, 567, 678, 789],
      totalValue: 30,
      todayValue: 15,
      todayAvg: 5,
      percentValue: 20,
    },
    {
      data: [111, 222, 333, 444, 555, 666, 777],
      totalValue: 25,
      todayValue: 20,
      todayAvg: 8,
      percentValue: 15,
    },
  ];

  const defaultStatsData = {
    summaryValue: 42,
    robuxValue: 34,
    rapValue: 22,
    todayValue: 10,
    todayAvg: 4,
    percentValue: 10,
  };

  const defaultLineGraphData = [
    {
      name: "Sun",
      visits: 0,
      clicks: 0,
      hits: 0,
    },
    {
      name: "Mon",
      visits: 0,
      clicks: 0,
      hits: 0,
    },
    {
      name: "Tue",
      visits: 0,
      clicks: 0,
      hits: 0,
    },
    {
      name: "Wed",
      visits: 0,
      clicks: 0,
      hits: 0,
    },
    {
      name: "Thu",
      visits: 0,
      clicks: 0,
      hits: 0,
    },
    {
      name: "Fri",
      visits: 0,
      clicks: 0,
      hits: 0,
    },
    {
      name: "Sat",
      visits: 0,
      clicks: 0,
      hits: 0,
    },
  ];

  const [barGraphData, setBarGraphData] = useState(defaultBarGraphData);
  const [statsData, setStatsData] = useState(defaultStatsData);
  const [lineGraphData, setLineGraphData] = useState(defaultLineGraphData);

  //--------------------Expected Data format (For 3 bar graph cards)---------------------
  // const barGraphdata = [
  //   {
  //     data: [323, 343, 600, 135, 556, 356, 0],
  //     totalValue: 45,
  //     todayValue: 10,
  //     todayAvg: 4,
  //     percentValue: 10,
  //   },... 2 more objects
  // ];
  const fetchBarGraphData = async () => {
    try {
      const response = await axios.get("https://example.com/api/barGraphData");
      setBarGraphData(response.data);
    } catch (error) {
      console.error("Error fetching bar graph data:", error);
    }
  };

  //--------------------Expected Data format (1 object for stats card)---------------------
  // const statsData = {
  //     summaryValue: 42,
  //     robuxValue: 34,
  //     rapValue: 22,
  //     todayValue: 10,
  //     todayAvg: 4,
  //     percentValue: 10,
  //   }

  const fetchStatsData = async () => {
    try {
      const response = await axios.get("https://example.com/api/statsData");
      setStatsData(response.data);
    } catch (error) {
      console.error("Error fetching stats data:", error);
    }
  };

  const fetchLineGraphData = async () => {
    try {
      const response = await axios.get("https://example.com/api/LineGraphData");
      setLineGraphData(response.data);
    } catch (error) {
      console.error("Error fetching stats data:", error);
    }
  };
  useEffect(() => {
    fetchBarGraphData();
    fetchStatsData();

    const barGraphInterval = setInterval(fetchBarGraphData, 15000);
    const statsDataInterval = setInterval(fetchStatsData, 15000);
    const lineGraphInterval = setInterval(fetchLineGraphData, 15000);

    return () => {
      clearInterval(barGraphInterval);
      clearInterval(statsDataInterval);
      clearInterval(lineGraphInterval);
    };
  }, []);
  return (
    <div className={Styles.dashboardContainer}>
      <h1 className={Styles.dashboardTitle}>Hi, Welcome back 👋</h1>
      <div className={Styles.barGraphMainContainer}>
        {barGraphData.map((graphData, index) => (
          <BarGraph key={index} props={graphData} title={titles[index]} />
        ))}
        <BarGraph props={statsData} title={"Stats"} />
      </div>
      <div className={Styles.lineGraphMainContainer}>
        <OverviewLineGraph data={lineGraphData} />
        <LeaderboardList />
      </div>
      <div className={Styles.liveHitsMainContainer}>
        <LiveHits />
      </div>
    </div>
  );
};

export default DashboardPage;
