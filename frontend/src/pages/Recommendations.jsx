import React,
{
  useEffect,
  useState
}
from "react";

import axios from "axios";

const Recommendations = () => {

  const [data,setData] =
  useState([]);

  useEffect(()=>{

    axios
      .get(
        "http://127.0.0.1:5000/recommendations"
      )
      .then(res=>{

        setData(
          res.data
        );

      });

  },[]);

  return (

    <div>

      <h1>
        Inventory Recommendations
      </h1>

      {data.map((item,index)=>(

        <div
          key={index}
          style={{
            background:"#fff",
            padding:"20px",
            marginBottom:"15px",
            borderRadius:"12px"
          }}
        >

          <h3>
            {item.category}
          </h3>

          <p>
            Forecast:
            {item.forecast}
          </p>

          <p>
            Recommendation:
            {item.recommendation}
          </p>

        </div>

      ))}

    </div>

  );

};

export default Recommendations;