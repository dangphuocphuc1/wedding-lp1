import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { clearTestDataOnce } from "./lib/storage";
import "./styles.css";
import "./cover.css";
import "./theme.css";
import "./ornaments.css";
import "./watercolor.css";
import "./celebration-layout.css";
import "./photo-slider.css";
import "./fan-decor.css";
import "./cover-reference.css";

clearTestDataOnce();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
