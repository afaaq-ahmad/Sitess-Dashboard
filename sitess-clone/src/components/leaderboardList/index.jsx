"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Styles from "./styles.module.css";
import LeaderboardListItem from "../leaderboardListItem";

const LeaderboardList = () => {
  const [activeOption, setActiveOption] = useState(1);

  const defaultData = [
    {
      username: "Anonymous User",
      imageURL: "/assets/profile-picture.jpeg",
      value: 1234,
    },
    {
      username: "Anonymous User",
      imageURL: "/assets/profile-picture.jpeg",
      value: 1234,
    },
    {
      username: "Anonymous User",
      imageURL: "/assets/profile-picture.jpeg",
      value: 1234,
    },
    {
      username: "Anonymous User",
      imageURL: "/assets/profile-picture.jpeg",
      value: 1234,
    },

    {
      username: "Anonymous User",
      imageURL: "/assets/profile-picture.jpeg",
      value: 1234,
    },
    {
      username: "Anonymous User",
      imageURL: "/assets/profile-picture.jpeg",
      value: 1234,
    },
    {
      username: "Anonymous User",
      imageURL: "/assets/profile-picture.jpeg",
      value: 1234,
    },
    {
      username: "Anonymous User",
      imageURL: "/assets/profile-picture.jpeg",
      value: 1234,
    },
    {
      username: "Anonymous User",
      imageURL: "/assets/profile-picture.jpeg",
      value: 1234,
    },
  ];
  const [leaderboardListItems, setLeaderBoardListItems] = useState(defaultData);

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get("https://example.com/api/leaderboard");
      setLeaderBoardListItems(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();

    const interval = setInterval(fetchLeaderboardData, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={Styles.leaderboardMainContainer}>
      <div className={Styles.leaderboardOptionsContainer}>
        <div
          className={`${Styles.leaderboardOption} ${
            activeOption === 1 ? Styles.leaderboardActiveOption : ""
          }`}
          onClick={() => {
            setActiveOption(1);
          }}
        >
          Leaderboard
        </div>
        <div
          className={`${Styles.leaderboardOption} ${
            activeOption === 2 ? Styles.leaderboardActiveOption : ""
          }`}
          onClick={() => {
            setActiveOption(2);
          }}
        >
          Recent Hits
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        {activeOption === 1 ? "Leaderboard" : "Recent Hits"}
      </div>
      {activeOption === 1 ? (
        <div className={Styles.leaderboardItemsContainer}>
          {leaderboardListItems.length > 0 ? (
            leaderboardListItems.map((item, index) => (
              <LeaderboardListItem key={index} props={item} />
            ))
          ) : (
            <div>No leaderboard items available</div>
          )}
        </div>
      ) : (
        <div className={Styles.leaderboardRecentHits}>No Result</div>
      )}
    </div>
  );
};

export default LeaderboardList;
