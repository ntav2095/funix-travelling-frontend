import styles from "./Placeholder.module.css";

function Placeholder({ col, height, width, rounded }) {
  let classes = "placeholder bg-secondary";

  if (col) {
    classes += ` col-${col}`;
  }

  if (rounded) {
    classes += ` rounded`;
  }

  let style = {};

  if (height) {
    style.height = height;
  }

  if (width) {
    style.width = width;
  }

  return <span style={style} className={classes}></span>;
}

export default Placeholder;
