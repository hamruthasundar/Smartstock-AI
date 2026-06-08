import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Forecast = () => {

  const [metadata, setMetadata] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [predictionLoading, setPredictionLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [forecastHistory, setForecastHistory] =
  useState([]);  

  const [confidence, setConfidence] =
  useState(null);

  const [supplier, setSupplier] =
  useState(null);

  const [formData, setFormData] =
    useState({
      category: "",
      sub_category: "",
      region: "",
      segment: "",
      ship_mode: "",
      quantity: 1,
      discount: 0,
      year: 2026,
      month: 6,
      quarter: 2
    });

  useEffect(() => {

    loadMetadata();

  }, []);

  const loadMetadata = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/metadata"
        );

      setMetadata(
        response.data
      );

    } catch (error) {

      console.error(error);

      alert(
        "Metadata API failed"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setPredictionLoading(true);

    
    try {

      const response =
        await axios.post(
          "http://localhost:5000/predict",
          formData
        );

        const supplierResponse =
      await axios.get(
        "http://localhost:5000/recommended-supplier"
      );

      setResult(
        response.data
      );

      setSupplier(
      supplierResponse.data.data
    );

      setForecastHistory(prev => [
      {
        date: new Date().toLocaleTimeString(),
        value: response.data.predicted_sales
      },
      ...prev
    ].slice(0,10));

      setConfidence(
        response.data.confidence
      );
    } catch (error) {

      console.error(error);

      alert(
        "Prediction Failed"
      );

    } finally {

      setPredictionLoading(false);

    }
  };

  if (loading) {

    return (
      <div className="card">
        Loading Metadata...
      </div>
    );
  }

  return (

    <div
      className="card"
      style={{
        maxWidth: "1000px",
        margin: "auto"
      }}
    >

      <h1>
        SmartStock AI Forecast
      </h1>

      <p>
        Generate inventory demand
        predictions using AI.
      </p>

      <br />

      <form onSubmit={handleSubmit}>

        <label>
          Product Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >

          <option value="">
            Select Category
          </option>

          {metadata.categories.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}

        </select>

        <br />
        <br />

        <label>
          Product Type
        </label>

        <select
          name="sub_category"
          value={formData.sub_category}
          onChange={handleChange}
          required
        >

          <option value="">
            Select Product Type
          </option>

          {metadata.sub_categories.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}

        </select>

        <br />
        <br />

        <label>
          Region
        </label>

        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
        >

          <option value="">
            Select Region
          </option>

          {metadata.regions.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}

        </select>

        <br />
        <br />

        <label>
          Customer Segment
        </label>

        <select
          name="segment"
          value={formData.segment}
          onChange={handleChange}
          required
        >

          <option value="">
            Select Segment
          </option>

          {metadata.segments.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}

        </select>

        <br />
        <br />

        <label>
          Shipping Mode
        </label>

        <select
          name="ship_mode"
          value={formData.ship_mode}
          onChange={handleChange}
          required
        >

          <option value="">
            Select Shipping Mode
          </option>

          {metadata.ship_modes.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}

        </select>

        <br />
        <br />

        <label>
          Quantity
        </label>

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>
          Discount
        </label>

        <input
          type="number"
          step="0.01"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
        />

        <br />
        <br />

        <button
          type="submit"
        >

          {predictionLoading
            ? "Predicting..."
            : "Generate Forecast"}

        </button>

      </form>

      {result && (

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "12px",
            background: "#F6E7D8"
          }}
        >
          {forecastHistory.length > 0 && (

  <div
    style={{
      marginTop:"30px",
      background:"#fff",
      padding:"20px",
      borderRadius:"15px"
    }}
  >

    <h2>
      Forecast Trend
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <LineChart
        data={forecastHistory}
      >

        <XAxis dataKey="date" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="value"
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

)}

          <h2>
            Forecast Result
          </h2>

          <h1>
            ₹
            {Number(
              result.predicted_sales
            ).toFixed(2)}
          </h1>

          <p>
          <b>Risk Level:</b>
          {" "}
          {result.risk_level}
        </p>
            {
            supplier && (

            <div
              style={{
                marginTop:"20px",
                background:"#F8F4EE",
                padding:"20px",
                borderRadius:"12px"
              }}
            >

            <h2>
            Recommended Supplier
            </h2>

            <br/>

            <p>
            <b>Name:</b>
            {" "}
            {supplier.name}
            </p>

            <p>
            <b>Company:</b>
            {" "}
            {supplier.company}
            </p>

            <p>
            <b>Reliability:</b>
            {" "}
            {supplier.reliability}%
            </p>

            <p>
            <b>Lead Time:</b>
            {" "}
            {supplier.lead_time}
            days
            </p>

            </div>

            )
            }
        <p>
          <b>Recommended Inventory:</b>
          {" "}
          {result.recommended_stock}
        </p>

        <br />

        <div
          style={{
            background:"#fff",
            padding:"15px",
            borderRadius:"12px",
            marginTop:"15px"
          }}
        >

          <h3>
            Inventory Optimization Metrics
          </h3>

          <br />

      <p>
        🛡️ Safety Stock:
        {" "}
        <b>
          {result.safety_stock}
        </b>
      </p>

      <br />

      <p>
        📍 Reorder Point:
        {" "}
        <b>
          {result.reorder_point}
        </b>
      </p>

      <br />

      <p>
        📦 Recommended Order:
        {" "}
        <b>
          {result.recommended_order}
        </b>
      </p>

    </div>

    <br />

<h3>
AI Confidence Score
</h3>

<div
  style={{
    background:"#ddd",
    height:"22px",
    borderRadius:"20px",
    overflow:"hidden"
  }}
>

  <div
    style={{
      width:`${confidence}%`,
      height:"22px",
      background:
        confidence > 80
          ? "#28A745"
          : "#FFC107"
    }}
  />

</div>

<p>
  {confidence}% Confidence
</p>
        </div>

      )}

    </div>
  );
};

export default Forecast;