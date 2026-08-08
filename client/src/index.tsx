import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@/styles/index.css";
import { ClerkProvider } from "@clerk/react";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./providers/AuthProvider.tsx";

const PUBLISHER_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHER_KEY} afterSignOutUrl={"/"}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
);
