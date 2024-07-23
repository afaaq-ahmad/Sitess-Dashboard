import React from "react";
import Image from "next/image";
import Styles from "./styles.module.css";
import { Contact, Clock1, Activity, User } from "lucide-react";

const LiveHitsTable = ({ data }) => {
  const columns = [
    { title: "User", icon: "/assets/icons/lanyard.png" },
    { title: "Time", icon: "/assets/icons/clock.png" },
    { title: "Balance", icon: "/assets/icons/1153610976650870814.webp" },
    { title: "Summary", icon: "/assets/icons/pulse.png" },
    { title: "Rap", icon: "/assets/icons/1106196402754830448.webp" },
    { title: "Hitter", icon: "/assets/icons/icons8-user-24.png" },
  ];

  return (
    <div className={Styles.tableContainer}>
      <table className={Styles.liveHitsTable}>
        <thead>
          <tr>
            <th>
              <div className={Styles.headerCell}>
                <span>User</span>
                <Contact
                  size={16}
                  color="#a1a1aa"
                  style={{ marginLeft: "15px" }}
                />
              </div>
            </th>
            <th>
              <div className={Styles.headerCell}>
                <span>Time</span>
                <Clock1
                  size={16}
                  color="#a1a1aa"
                  style={{ marginLeft: "5px" }}
                />
              </div>
            </th>
            <th>
              <div className={Styles.headerCell}>
                <span>Balance</span>
                <Image
                  src={"/assets/icons/1153610976650870814.webp"}
                  width={20}
                  height={20}
                  alt="hexa-icon"
                  style={{ marginLeft: "5px" }}
                />
              </div>
            </th>
            <th>
              <div className={Styles.headerCell}>
                <span>Summary</span>
                <Activity
                  size={16}
                  color="#a1a1aa"
                  style={{ marginLeft: "5px" }}
                />
              </div>
            </th>
            <th>
              <div className={Styles.headerCell}>
                <span>Rap</span>
                <Image
                  style={{ paddingLeft: "10px" }}
                  src={"/assets/icons/1106196402754830448.webp"}
                  width={20}
                  height={10}
                  alt="ltd-logo"
                />
              </div>
            </th>
            <th>
              <div className={Styles.headerCell}>
                <span>Hitter</span>
                <User size={16} color="#a1a1aa" style={{ marginLeft: "5px" }} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className={Styles.tableBodyContainer}>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className={Styles.tableBodyCell}>
                <div className={Styles.tableProfileRow}>
                  <Image
                    style={{ borderRadius: "50%" }}
                    src={row.userIcon}
                    alt={`${[row.user]}-icon`}
                    width={20}
                    height={20}
                  />
                  <span>{row.user}</span>
                </div>
              </td>
              <td className={Styles.tableCell}>
                <div
                  className={`${Styles.cellContent} ${
                    rowIndex % 2 === 1 && Styles.evenEntryStyle
                  }`}
                >
                  {row.time}
                </div>
              </td>
              <td className={Styles.tableCell}>
                <div
                  className={`${Styles.cellContent} ${
                    rowIndex % 2 === 1 && Styles.evenEntryStyle
                  }`}
                >
                  {row.balance}
                </div>
              </td>

              <td className={Styles.tableCell}>
                <div
                  className={`${Styles.cellContent} ${
                    rowIndex % 2 === 1 && Styles.evenEntryStyle
                  }`}
                >
                  {row.summary}
                </div>
              </td>
              <td className={Styles.tableCell}>
                <div
                  className={`${Styles.cellContent} ${
                    rowIndex % 2 === 1 && Styles.evenEntryStyle
                  }`}
                >
                  {row.rap}
                </div>
              </td>
              <td>
                <div className={Styles.tableProfileRow}>
                  <span>{row.hitter}</span>
                  <Image
                    style={{ borderRadius: "50%" }}
                    src={row.hitterIcon}
                    alt={`${[row.hitter]}-icon`}
                    width={20}
                    height={20}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveHitsTable;
