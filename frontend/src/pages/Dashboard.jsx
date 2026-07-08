import React, {
  useEffect,
  useState
} from "react";

import KPICards from "../components/KPICards";

import { getDashboard } from "../services/api";

const Dashboard = () => {

  const [dashboard,
    setDashboard] = useState({});

  const [loading,
    setLoading] = useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const response =
        await getDashboard();

      setDashboard(
        response.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (
      <h2>
        Loading Dashboard...
      </h2>
    );
  }

  return (
    <>
      <KPICards
        data={dashboard}
      />

      <div
        className="card"
      >
        <h2>
          SmartStock AI Overview
        </h2>

        <br />

        <p>
          SmartStock AI predicts
          inventory demand,
          monitors warehouse
          forecasting trends,
          stores prediction history,
          and provides analytics
          powered by machine
          learning.
        </p>

        <br />

        <p>
          Connected to:
        </p>

        <ul>
          <li>
            Gradient Boosting Model
          </li>

          <li>
            MongoDB Atlas
          </li>

          <li>
            Flask Backend APIs
          </li>

          <li>
            React Frontend
          </li>
        </ul>
      </div>

      <br />

<div className="card">

  <h2>
    AI Business Insights
  </h2>

  <br />

  <div>

    <p>
      📈 Highest demand region:
      {" "}
      <b>
        {dashboard.top_region}
      </b>
    </p>

    <br />

    <p>
      📦 Most demanded category:
      {" "}
      <b>
        {dashboard.top_category}
      </b>
    </p>

    <br />

    <p>
      ⚠️ High Risk Forecasts:
      {" "}
      <b>
        {dashboard.high_risk_count}
      </b>
    </p>

  </div>

</div>

<br />

<div className="card">

  <h2>Reports Center</h2>

  <br />

  <button
    onClick={() =>
      window.open(
        "https://smartstock-api-qrr5.onrender.com/export/excel"
      )
    }
  >
    📊 Export Excel Report
  </button>

  <button
    onClick={() =>
      window.open(
        "https://smartstock-api-qrr5.onrender.com/export/pdf"
      )
    }
    style={{
      marginLeft:"15px"
    }}
  >
    📄 Executive PDF Report
  </button>

</div>

<div
  className="card"
  style={{
    marginTop: "25px"
  }}
>

  <h2>
    Inventory Alerts
  </h2>

  <br />

  {
    dashboard.high_risk_count > 0
    ? (
      <div>

        ⚠️

        {dashboard.high_risk_count}

        high risk inventory forecasts detected.

      </div>
    )
    : (
      <div>

        ✅ Inventory health looks good.

      </div>
    )
  }

</div>

      {/* Forecast Comparison */}

<div
  className="card"
  style={{
    marginTop: "25px"
  }}
>
  <h2>
    Forecast Comparison
  </h2>

  <br />

  <p>
    💰 Total Forecast:
    {" "}
    <b>
      ₹{dashboard.total_forecast}
    </b>
  </p>

  <br />

  <p>
    📊 Average Forecast:
    {" "}
    <b>
      ₹{dashboard.average_prediction}
    </b>
  </p>

</div>

<br />

{/* Recent Predictions */}

<div
  className="card"
  style={{
    marginTop: "25px"
  }}
>

  <h2>
    Recent Predictions
  </h2>

  <br />

  
  {
    dashboard.recent_predictions?.map(
      (
        item,
        index
      ) => (

        <div
          key={index}
          style={{
            padding: "15px",
            marginBottom: "15px",
            background: "#F8F4EE",
            borderRadius: "12px"
          }}
        >

          <p>
            <b>
              Forecast:
            </b>
            {" "}
            ₹
            {Number(
              item.predicted_sales
            ).toFixed(2)}
          </p>

          <p>
  <b>
    Risk:
  </b>
  {" "}
  {item.risk_level}
</p>

{
  item.safety_stock && (
    <p>
      <b>
        Safety Stock:
      </b>
      {" "}
      {item.safety_stock}
    </p>
  )
}

{
  item.reorder_point && (
    <p>
      <b>
        Reorder Point:
      </b>
      {" "}
      {item.reorder_point}
    </p>
  )
}

{
  item.recommended_order && (
    <p>
      <b>
        Recommended Order:
      </b>
      {" "}
      {item.recommended_order}
    </p>
  )
}

<p>
  <b>
    Time:
  </b>
  {" "}
  {item.timestamp}
</p>

        </div>

      )
    )
  }
</div>
</>
  );
};

export default Dashboard;