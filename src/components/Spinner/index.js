import styles from "./Spinner.module.css";

function Spinner({ small }) {
  let classes = styles["lds-ring"];
  if (small) {
    classes += " " + styles.small;
  }
  return (
    <div className={classes}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;
