import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router/Router";
import { CssBaseline } from "@mui/material";
import { CustomThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import './i18n/config';
import './index.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CustomThemeProvider>
            <LanguageProvider>
                <CssBaseline />
                <Router />
            </LanguageProvider>
        </CustomThemeProvider>
    </React.StrictMode>
);