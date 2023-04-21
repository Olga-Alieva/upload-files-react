import { render } from "react-dom";
import { ErrorBoundary } from "../src/features/ErrorBoundary/ErrorBoundary";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  rootElement
);
