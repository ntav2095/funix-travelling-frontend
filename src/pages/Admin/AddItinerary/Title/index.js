import { useRef, useEffect } from "react";

import styles from "./Title.module.css";

function Title({ onChange, type, id, isSubmit, onSubmit }) {
  const titleRef = useRef();

  useEffect(() => {
    if (isSubmit > 0) {
      onSubmit(type, id, titleRef.current.value);
    }
  }, [isSubmit]);

  return (
    <div className={styles.title}>
      <input ref={titleRef} type="text" placeholder="Title" />
    </div>
  );
}

export default Title;
