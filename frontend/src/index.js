

// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import { AuthProvider } from "./context/AuthContext";
// import { GeneralContextProvider } from "./dashboard/GeneralContext";
// import "./index.css";

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <AuthProvider>
//       <GeneralContextProvider>
//         <App />
//       </GeneralContextProvider>
//     </AuthProvider>
//   </React.StrictMode>
// );






import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { GeneralContextProvider } from "./dashboard/GeneralContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GeneralContextProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} /> {/* ✅ Moved here */}
      </GeneralContextProvider>
    </AuthProvider>
  </React.StrictMode>
);