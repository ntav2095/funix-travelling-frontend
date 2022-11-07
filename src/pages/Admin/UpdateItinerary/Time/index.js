import styles from "./Time.module.css";

function Time({ id, type, onChange, content }) {
  const changeHandler = (e, name) => {
    if (name === "time") {
      onChange(type, id, {
        session: content.session,
        time: e.target.value,
      });
    } else {
      onChange(type, id, {
        session: e.target.value,
        time: content.time,
      });
    }
  };

  const session = content?.session ? content.session : "";
  const time = content?.time ? content.time : "";

  return (
    <div className={styles.session}>
      <input
        type="text"
        placeholder="Nhập buổi trong ngày ở đây..."
        value={session}
        onChange={(e) => changeHandler(e, "session")}
      />
      <input
        type="text"
        placeholder="Nhập khoảng thời gian ở đây..."
        value={time}
        onChange={(e) => changeHandler(e, "time")}
      />
    </div>
  );
}

export default Time;
