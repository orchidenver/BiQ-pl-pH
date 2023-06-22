import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

interface IRootRoute {
  outlet?: any;
}

export const RootRoute = (props: IRootRoute) => {
  return (
    <>
      {props.outlet ? (
        <>
          <NavBar />
          {props.outlet}
          <Footer />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};
