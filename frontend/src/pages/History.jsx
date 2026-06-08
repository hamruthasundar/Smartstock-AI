import React, {
  useEffect,
  useState
} from "react";

import {
  getHistory
} from "../services/api";

const History = () => {

  const [records,
    setRecords] = useState([]);

  useEffect(() => {

    loadHistory();

  }, []);

  const loadHistory = async () => {

    try {

      const response =
        await getHistory();

      setRecords(
        response.data.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="card">

      <h2>
        Prediction History
      </h2>

<p>
  Total Records: {records.length}
</p>
      <br />

      <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
  }}
>

  <thead>

    <tr
      style={{
        background: "#F5E9D8"
      }}
    >

      <th
        style={{
          padding: "15px",
          textAlign: "left"
        }}
      >
        Sales
      </th>

      <th
        style={{
          padding: "15px",
          textAlign: "left"
        }}
      >
        Stock
      </th>

      <th
        style={{
          padding: "15px",
          textAlign: "left"
        }}
      >
        Risk
      </th>

      <th
        style={{
          padding: "15px",
          textAlign: "left"
        }}
      >
        Time
      </th>

    </tr>

  </thead>

  <tbody>

    {
      records.map(
        (row, index) => (

          <tr
            key={index}
            style={{
              borderBottom:
                "1px solid #ddd"
            }}
          >

            <td
              style={{
                padding: "15px"
              }}
            >
              ₹
              {Number(
                row.predicted_sales
              ).toFixed(2)}
            </td>

            <td
              style={{
                padding: "15px"
              }}
            >
              {row.recommended_stock}
            </td>

            <td
              style={{
                padding: "15px"
              }}
            >
              {row.risk_level}
            </td>

            <td
              style={{
                padding: "15px"
              }}
            >
              {row.timestamp}
            </td>

          </tr>

        )
      )
    }

  </tbody>

</table>

    </div>
  );
};

export default History;