import { useRef, useEffect } from "react";

import styles from "./Time.module.css";

function Time({ id, type, isSubmit, onSubmit }) {
  const sessionRef = useRef();
  const timeRef = useRef();

  useEffect(() => {
    console.log(type);
    console.log(isSubmit);
    if (isSubmit > 0) {
      onSubmit(type, id, {
        session: sessionRef.current.value,
        time: timeRef.current.value,
      });
    }
  }, [isSubmit, id, type, onSubmit]);

  return (
    <div className={styles.session}>
      <input type="text" placeholder="Date Session" ref={sessionRef} />
      <input type="text" placeholder="Time" ref={timeRef} />
    </div>
  );
}

export default Time;
