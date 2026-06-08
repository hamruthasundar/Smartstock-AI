import React from "react";

import {
  Package,
  TrendingUp,
  AlertTriangle,
  IndianRupee
} from "lucide-react";

const KPICards = ({ data }) => {

  const cards = [
    {
      title: "Total Predictions",
      value: data.total_predictions || 0,
      icon: <Package />
    },

    {
      title: "Average Forecast",
      value: data.average_prediction || 0,
      icon: <TrendingUp />
    },

    {
      title: "Total Forecast",
      value: data.total_forecast || 0,
      icon: <IndianRupee />
    },

    {
      title: "High Risk",
      value: data.high_risk_count || 0,
      icon: <AlertTriangle />
    }
  ];

  return (
    <div
      className="grid grid-4"
      style={{
        marginBottom: "25px"
      }}
    >
      {
        cards.map((card, index) => (
          <div
            key={index}
            className="card"
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between"
              }}
            >
              <div>
                <h4>{card.title}</h4>

                <h2
                  style={{
                    marginTop: "10px"
                  }}
                >
                  {card.value}
                </h2>
              </div>

              {card.icon}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default KPICards;