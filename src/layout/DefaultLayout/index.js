import { Outlet } from "react-router-dom";
import Banner from "../../components/Banner";
import styles from "./Layout.module.css";

function DefaultLayout({ banner, sidebar, children }) {
  return (
    <>
      {banner && <Banner />}

      {!sidebar && <div className={"container-lg "}>{children}</div>}

      {sidebar && (
        <div className="row container-lg mx-auto ">
          <div className="col-12 col-lg-9">{children}</div>

          <div className="col-12 col-lg-3">
            <p>sidebar</p>
          </div>
        </div>
      )}
    </>
  );
}

export default DefaultLayout;
