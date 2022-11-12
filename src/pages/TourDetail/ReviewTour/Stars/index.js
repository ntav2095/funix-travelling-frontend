import { starSolid, starOutline } from "../../../../assets/svgs";

// css
import styles from "./Stars.module.css";

function Stars({ stars }) {
  return (
    <div className={styles.stars}>
      {new Array(5).fill(1).map((item, index) => {
        if (index < stars) {
          return <span key={index}>{starSolid}</span>;
        }
        return <span key={index}>{starOutline}</span>;
      })}
    </div>
  );
}

export default Stars;
