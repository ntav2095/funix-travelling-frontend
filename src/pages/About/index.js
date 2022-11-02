import { aboutCompany } from "../../assets/images";
import Layout from "../../layout/Default";

import styles from "./About.module.css";

function About() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.sidebar}>ccc</div>

        <div className={styles.about}>
          <div className={styles.image}>
            <img src={aboutCompany} alt="About Company" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
