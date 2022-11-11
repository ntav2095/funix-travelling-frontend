import { placeholder } from "../../../assets/images";
import styles from "./CardPlaceholder.module.css";

function CardPlaceholder() {
  return (
    <div className={styles.card + " card"} aria-hidden="true">
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${placeholder})` }}
      ></div>
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder  bg-secondary col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder bg-secondary col-7"></span>
          <span className="placeholder bg-secondary col-4"></span>
          <span className="placeholder bg-secondary col-4"></span>
          <span className="placeholder bg-secondary col-6"></span>
          <span className="placeholder bg-secondary col-8"></span>
        </p>
      </div>
    </div>
  );
}

export default CardPlaceholder;
