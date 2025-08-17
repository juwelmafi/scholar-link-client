import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Router.jsx";
import ReactQueryProvider from "./providers/ReactQueryProvider.jsx";
import { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AuthProvider from "./auth/AuthProvider.jsx";
import ThemeProvider from "./providers/ThemeProvider.jsx";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ReactQueryProvider>
        <AuthProvider>
          <Elements stripe={stripePromise}>
            <RouterProvider router={router} />
            <Toaster position="top-center" reverseOrder={false} />
          </Elements>
        </AuthProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  </StrictMode>
);
