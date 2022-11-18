import styles from "./Banner.module.css";
import { hearder as bannerImg } from "../../assets/images";

function Banner() {
  return (
    <div className={styles.banner}>
      <img src={bannerImg} className="img-fluid w-100" alt="banner" />
    </div>
  );
}

export default Banner;
