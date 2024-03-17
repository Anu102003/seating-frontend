import "./App.css";
import React from "react";
import MainRoutes from "./routes/MainRoutes";
import NavBar from "./pages/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainRoutes />
    </div>
  );
}

export default App;
