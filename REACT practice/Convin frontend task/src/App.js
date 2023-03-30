import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Buckets } from "./Buckets";
import { useState } from "react";
import { History } from "./history";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./navbar";

export default function App() {
  const [historyData, setHistoryData] = useState([]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Buckets data={{ setHistoryData, historyData }} />}
        />
        <Route path="/history" element={<History data={historyData} />} />
      </Routes>
    </div>
  );
}
