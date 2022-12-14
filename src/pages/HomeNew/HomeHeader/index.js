import React from "react";
import styles from "./hearder.module.css";
import { hearder } from "../../../assets/images/index";
import { home1 } from "../../../assets/images/index";
import { home2 } from "../../../assets/images/index";
import { home4 } from "../../../assets/images/index";
import i18next from "i18next";
function HomeHearder() {
  return (
    <div className={styles.hearder}>
      <div className={styles.container}>
        <div className={styles.about}>
          <div className="col-12 col-md-4 col-lg-4">
            <img src={home1} />
            <h6>{i18next.t("homeMain.title1")}</h6>
            <p>{i18next.t("homeMain.session1")}</p>
          </div>
          <div className="col-12 col-md-4 col-lg-4">
            <img src={home2} />
            <h6>{i18next.t("homeMain.title2")}</h6>
            <p>{i18next.t("homeMain.session2")}</p>
          </div>
          <div className="col-12 col-md-4 col-lg-4">
            <img src={home4} />
            <h6>{i18next.t("homeMain.title3")}</h6>
            <p>{i18next.t("homeMain.session3")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeHearder;
