import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App1 from "app1/App";
import App2 from "app2/App";
import App3 from "app3/App";
import App4 from "app4/App";

const App = () => (
  <div className="container">
    <App1 />
    <App2 />
    <App3 />
    <App4 />
  </div>
);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);

export default App;
