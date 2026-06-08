import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";
import jsPDF from "jspdf";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

import {
  TrendingUp,
  AlertTriangle,
  Package,
  MapPin
} from "lucide-react";

const COLORS = [
  "#D6C6B8",
  "#A38F7B",
  "#6E6259",
  "#3A3A3A",
  "#8A7A6A"
];

const Analytics = () => {

  const [analytics, setAnalytics] =
    useState({
      category_sales: [],
      region_sales: [],
      risk_sales: []
    });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/analytics"
      );

      setAnalytics(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const exportPDF = () => {

const doc =
new jsPDF();

doc.text(
"SmartStock Analytics Report",
20,
20
);

doc.save(
"analytics_report.pdf"
);

};

<button
onClick={exportPDF}
>
Export Report
</button>

  const totalPredictions =
    analytics.category_sales.reduce(
      (sum, item) => sum + item.value,
      0
    );

  return (

    <div
      style={{
        padding: "30px",
        background: "#F5EFE6",
        minHeight: "100vh"
      }}
    >

      <h1
        style={{
          color: "#2F2F2F",
          marginBottom: "30px"
        }}
      >
        SmartStock Analytics
      </h1>

      {/* KPI CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "35px"
        }}
      >

        <Card
          icon={<Package />}
          title="Total Predictions"
          value={totalPredictions}
        />

        <Card
          icon={<TrendingUp />}
          title="Categories"
          value={
            analytics.category_sales.length
          }
        />

        <Card
          icon={<MapPin />}
          title="Regions"
          value={
            analytics.region_sales.length
          }
        />

        <Card
          icon={<AlertTriangle />}
          title="Risk Levels"
          value={
            analytics.risk_sales.length
          }
        />

      </div>

      {/* CHART GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "25px"
        }}
      >

        {/* REGION BAR */}

        <div className="chartCard">

          <h3>
            Region Distribution
          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart
              data={
                analytics.region_sales
              }
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="value"
                radius={[8,8,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* CATEGORY PIE */}

        <div className="chartCard">

          <h3>
            Category Breakdown
          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={
                  analytics.category_sales
                }
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >

                {
                  analytics.category_sales.map(
                    (_, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                    )
                  )
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* RISK LEVELS */}

        <div className="chartCard">

          <h3>
            Risk Distribution
          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={
                  analytics.risk_sales
                }
                dataKey="value"
                outerRadius={110}
                label
              >

                {
                  analytics.risk_sales.map(
                    (_, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                    )
                  )
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* TOP CATEGORIES */}

        <div className="chartCard">

          <h3>
            Demand by Category
          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart
              data={
                analytics.category_sales
              }
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[8,8,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

const Card = ({
  icon,
  title,
  value
}) => (

  <div
    style={{
      background: "#2F2F2F",
      color: "white",
      borderRadius: "18px",
      padding: "25px"
    }}
  >

    <div
      style={{
        marginBottom: "10px"
      }}
    >
      {icon}
    </div>

    <h4>{title}</h4>

    <h2>{value}</h2>

  </div>

);

export default Analytics;