import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { AppProvider } from "./context/context";
import MainPage from "./pages/MainPage";
import Shop from "./pages/Shop";
import Page404 from "./pages/Page404";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Policy from "./pages/Policy";
import Cookies from "./pages/Cookies";
import CookiesModal from "./components/CookiesModal";
import { useCookies } from "react-cookie";

export default function App() {
  const [cookies] = useCookies(["cookieConsent"]);

  return (
    <>
      <AppProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <Footer />
          {!cookies.cookieConsent && <CookiesModal />}
        </Router>
      </AppProvider>
    </>
  );
}
