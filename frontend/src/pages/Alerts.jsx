import React,
{
  useEffect,
  useState
}
from "react";

import axios from "axios";

const Alerts = () => {

  const [alerts,
    setAlerts] =
      useState([]);

  useEffect(() => {

    loadAlerts();

  }, []);

  const loadAlerts =
    async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/alerts"
        );

      setAlerts(
        response.data.data
      );

    } catch(error) {

      console.log(error);

    }
  };

  return (

    <div className="card">

      <h1>
        Smart Alert Center
      </h1>

      <br/>

      {
        alerts.length === 0
        ? (
          <p>
            No Alerts Found
          </p>
        )
        : (

          alerts.map(
            (
              alert,
              index
            ) => (

            <div
              key={index}
              style={{

                background:"#F8F4EE",

                padding:"20px",

                marginBottom:"15px",

                borderRadius:"12px"

              }}
            >

              <h3>
                ⚠️
                {alert.severity}
              </h3>

              <p>
                {alert.message}
              </p>

              <p>
                Forecast:
                {" "}
                ₹
                {
                  Number(
                    alert.predicted_sales
                  ).toFixed(2)
                }
              </p>

              <p>
                {alert.timestamp}
              </p>

            </div>

          ))
        )
      }

    </div>
  );
};

export default Alerts;