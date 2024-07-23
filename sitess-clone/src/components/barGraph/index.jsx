"use client";
import { ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import Styles from "./styles.module.css";
import Image from "next/image";
import { Activity, Cookie, Eye, Mouse, Wallet } from "lucide-react";

const BarGraph = ({ props, title }) => {
  let transformedData = [];
  console.log("props: ", props);
  console.log("title: ", title);

  if (title !== "Stats") {
    transformedData = props.data.map((value) => ({
      value: value,
    }));
  }

  return (
    <div className={Styles.barGraphInnerContainer}>
      <div className={Styles.barGraphTitleContainer}>
        <div>Total {title}</div>
        {title === "Accounts" && <Cookie size={16} color="#a1a1aa" />}
        {title === "Visits" && <Eye size={16} color="#a1a1aa" />}
        {title === "Clicks" && <Mouse size={16} color="#a1a1aa" />}
        {title === "Stats" && <Wallet size={16} color="#a1a1aa" />}
      </div>

      {title !== "Stats" ? (
        <div className={Styles.totalValue}>{props?.totalValue}</div>
      ) : (
        <div className={Styles.statsContainer}>
          <div
            className={Styles.statusItem}
            style={{
              borderBottom: "1px solid #27272a",
              borderRight: "1px solid #27272a",
            }}
          >
            <div>{props?.summaryValue}</div>
            <Activity color="#a1a1aa" size={16} />
          </div>
          <div
            className={Styles.statusItem}
            style={{
              borderBottom: "1px solid #27272a",
              borderLeft: "1px solid #27272a",
            }}
          >
            <div>{props?.robuxValue}</div>
            <Image
              src={"/assets/icons/1153610976650870814.webp"}
              width={20}
              height={20}
              alt="hexa-icon"
            />
          </div>
          <div
            className={Styles.statusItem}
            style={{
              borderTop: "1px solid #27272a",
              borderRight: "1px solid #27272a",
            }}
          >
            <div>{props?.rapValue}</div>
            <Image
              src={"/assets/icons/hat.webp"}
              width={20}
              height={20}
              alt="hat-icon"
            />
          </div>
        </div>
      )}

      <div className={Styles.barGraphContainer}>
        <div className={Styles.barGraph}>
          {title !== "Stats" && (
            <ResponsiveContainer width="100%" height={100}>
              <BarChart
                data={transformedData}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <Bar dataKey="value" minPointSize={3} maxBarSize={50}>
                  {transformedData.map((index) => (
                    <Cell
                      cursor="pointer"
                      fill={"#10b981"}
                      key={`cell-${index}`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={Styles.totalValuePercentage}>
          <Image
            src="/assets/icons/icons8-up-14.png"
            width={16}
            height={16}
            alt="arrow-up"
          />
          <div style={{ marginLeft: "5px", fontSize: "14px" }}>
            {props?.percentValue}%
          </div>
        </div>
      </div>
      <div className={Styles.barGraphBottom}>
        +{props?.todayValue} today | Avg. {props?.todayAvg} day
      </div>
    </div>
  );
};

export default BarGraph;
