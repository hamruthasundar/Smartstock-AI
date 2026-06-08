import React from "react";
import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  BarChart3,
  History,
  Bot,
  Truck,
  Bell
} from "lucide-react";



const Navbar = () => {

      const role =
      localStorage.getItem(
        "role"
      );

      return (
    <nav
      style={{
        background: "#2F2F2F",
        color: "white",
        padding: "18px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "16px",
        marginBottom: "25px"
      }}
    >
      <div>
        <h2>SmartStock AI</h2>

        <p
          style={{
            margin:"4px 0",
            fontSize:"14px"
          }}
        >
          Logged in as:
          <b> {role}</b>
        </p>

        <small>
          Inventory Forecasting &
          Warehouse Assistant
        </small>
      </div>

      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center"
        }}
      >

        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <LayoutDashboard size={18}/>
          Dashboard
        </Link>

        <Link
          to="/forecast"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <Bot size={18}/>
          Forecast
        </Link>

        <Link
          to="/analytics"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <BarChart3 size={18}/>
          Analytics
        </Link>

        <Link
          to="/history"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <History size={18}/>
          History
        </Link>

        <Link
          to="/assistant"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <Bot size={18}/>
          AI Assistant
        </Link>
        
        <Link
        to="/suppliers"
        style={{
          color: "white",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "5px"
        }}
      >
        <Truck size={18}/>
        Suppliers
      </Link>

              <Link
        to="/alerts"
        style={{
          color:"white",
          textDecoration:"none"
        }}
      >
        <span
          style={{
            display:"flex",
            alignItems:"center",
            gap:"5px"
          }}
        >
          <Bell size={18}/>
          Alerts
        </span>
      </Link>

      <button
  onClick={() => {

    localStorage.clear();

    window.location.href =
      "/login";

  }}

style={{
  background:"transparent",
  color:"white",
  border:"none",
  cursor:"pointer",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  fontSize:"16px",
  padding:"0",
  margin:"0",
  lineHeight:"1"
}}
>

  Logout

</button>
      </div>
    </nav>

    
  );
};



export default Navbar;