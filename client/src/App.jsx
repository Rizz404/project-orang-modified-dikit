import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material"; // css reset
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LoginPage from "./scenes/loginPage/LoginPage";
import HomePage from "./scenes/homePage/HomePage";
import ProfilePage from "./scenes/profilePage/ProfilePage";

function App() {
  // mengambil state awal mode dari slice
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* karena tidak bisa memakai useNavigate di element maka menggunakan komponen Navigate sama saja */}
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
