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

function Layout() {
  const [cookies] = useCookies(["cookieConsent"]);
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      {!cookies.cookieConsent && <CookiesModal />}
    </>
  );
}

export default function App() {
  return (
    <>
      <AppProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </>
  );
}
