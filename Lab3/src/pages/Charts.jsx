import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "../styles/charts.css";
import competitors from "../scripts/market_data";

function Charts() {
  const [type, setType] = useState("revenue");
  const [data, setData] = useState([]);

  useEffect(() => {
    const parsed = competitors.map((item) => {
      const value =
        type === "revenue"
          ? parseFloat(item.revenue.replace("$", "").replace("M", ""))
          : type === "expenses"
          ? parseFloat(item.expenses.replace("$", "").replace("M", ""))
          : parseInt(item.employees);

      const modelValue = type === "employees" ? value + 100 : value * 1.1;

      return {
        name: item.name,
        real: value,
        model: Math.round(modelValue),
        diff: Math.round(modelValue - value),
      };
    });
    setData(parsed);
  }, [type]);

  return (
    <main className="charts-page">
      <div className="charts-container">
        <div className="charts-header">
          <h2>Аналіз доходів, витрат і персоналу</h2>
          <div className="btns">
            {["revenue", "expenses", "employees"].map((t) => (
              <button
                key={t}
                className={type === t ? "active" : ""}
                onClick={() => setType(t)}
              >
                {t === "revenue"
                  ? "Доходи"
                  : t === "expenses"
                  ? "Витрати"
                  : "Працівники"}
              </button>
            ))}
          </div>
        </div>

        <div className="charts-layout">
          <div className="chart-section">
            <div className="chart-inner">
            <ResponsiveContainer width="100%" height={400}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" />
    <XAxis
      dataKey="name"
      tick={{ fill: "#ffffff", fontSize: 12, fontWeight: 600 }}
    />
    <YAxis
      tick={{ fill: "#ffffff", fontSize: 12, fontWeight: 600 }}
    />
    <Tooltip />
    <Bar dataKey="real" fill="#3498db" name="Реальне значення" />
    <Bar dataKey="model" fill="#2ecc71" name="Змодельоване значення" />
  </BarChart>
</ResponsiveContainer>

            </div>

            <div className="chart-legend">
              <span className="legend-box blue"></span> Реальне значення
              <span className="legend-box green"></span> Змодельоване значення
            </div>
          </div>

          <div className="table-section">
            <table>
              <thead>
                <tr>
                  <th>Компанія</th>
                  <th>Реальне</th>
                  <th>Змодельоване</th>
                  <th>Різниця</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.real}</td>
                    <td>{row.model}</td>
                    <td className={row.diff >= 0 ? "positive" : "negative"}>
                      {row.diff >= 0 ? "+" : ""}
                      {row.diff}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Charts;
