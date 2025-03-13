import { StrictMode } from 'react'
import App from './App.tsx'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import './index.css'

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);

