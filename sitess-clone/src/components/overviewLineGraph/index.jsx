"use client";
import Styles from "./styles.module.css";

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import { Cookie, Eye, Mouse } from "lucide-react";

const OverviewLineGraph = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={Styles.tooptipContainer}>
          {payload.map((el, i) => {
            return (
              <div className={Styles.tooltipItem}>
                {i === 0 && <Eye color="#c90227" size={18} />}
                {i === 1 && <Cookie color="#911089" size={18} />}
                {i === 2 && <Mouse color="#37b3c3" size={18} />}
                {`${el.value}`}
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={Styles.lineGraphContainer}>
      <div className={Styles.lineGraphTitle}>Overview</div>
      <div className={Styles.lineGraphInfoContainer}>
        <div className={Styles.lineGraphInfoItem}>
          <Eye color="#c90227" size={18} />
          <div>Visits</div>
        </div>
        <div className={Styles.lineGraphInfoItem}>
          <Cookie color="#911089" size={18} />
          <div>Hits</div>
        </div>
        <div className={Styles.lineGraphInfoItem}>
          <Mouse color="#37b3c3" size={18} />
          <div>Clicks</div>
        </div>
      </div>
      <div className={Styles.lineGraph}>
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ fontSize: "14px", color: "#fafafa !important" }}
        >
          <LineChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              stroke="#fafafa"
            />
            <YAxis axisLine={false} tickLine={false} stroke="#fafafa" />
            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="visits"
              stroke="#c90227"
              strokeWidth={3}
              activeDot={{ r: 3 }}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#911089"
              strokeWidth={3}
              activeDot={{ r: 3 }}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="hits"
              stroke="#37b3c3"
              strokeWidth={3}
              activeDot={{ r: 3 }}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewLineGraph;
