import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Forecast from "./pages/Forecast";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import AIAssistant from "./pages/AIAssistant";
import Recommendations from "./pages/Recommendations";
import Suppliers from "./pages/Suppliers";
import Alerts from "./pages/Alerts";


const AppContent = () => {

  const location = useLocation();

  return (

    <>
      {
        location.pathname !== "/login" &&
        <Navbar />
      }

      <div className="container">

        <Routes>

  <Route
    path="/login"
    element={<Login />}
  />

  <Route
    path="/"
    element={
      <ProtectedRoute
        allowedRoles={[
          "Admin",
          "Manager",
          "User"
        ]}
      >
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/forecast"
    element={
      <ProtectedRoute
        allowedRoles={[
          "Admin",
          "Manager",
          "User"
        ]}
      >
        <Forecast />
      </ProtectedRoute>
    }
  />

  <Route
    path="/history"
    element={
      <ProtectedRoute
        allowedRoles={[
          "Admin",
          "Manager",
          "User"
        ]}
      >
        <History />
      </ProtectedRoute>
    }
  />

  <Route
    path="/analytics"
    element={
      <ProtectedRoute
        allowedRoles={[
          "Admin",
          "Manager"
        ]}
      >
        <Analytics />
      </ProtectedRoute>
    }
  />

  <Route
    path="/assistant"
    element={
      <ProtectedRoute
        allowedRoles={[
          "Admin",
          "Manager"
        ]}
      >
        <AIAssistant />
      </ProtectedRoute>
    }
  />

  <Route
    path="/alerts"
    element={
      <ProtectedRoute
        allowedRoles={[
          "Admin",
          "Manager"
        ]}
      >
        <Alerts />
      </ProtectedRoute>
    }
  />

  <Route
    path="/suppliers"
    element={
      <ProtectedRoute
        allowedRoles={[
          "Admin"
        ]}
      >
        <Suppliers />
      </ProtectedRoute>
    }
  />
        </Routes>

      </div>
    </>
  );
};


const App = () => {

  return (

    <BrowserRouter>

      <AppContent/>

    </BrowserRouter>

  );
};

export default App;