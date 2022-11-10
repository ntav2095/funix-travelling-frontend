import styles from "./Title.module.css";

function Title({ content, onChange, id }) {
  const changeHandler = (e) => {
    onChange(id, e.target.value);
  };

  return (
    <div className={styles.title}>
      <input
        type="text"
        placeholder="Nhập tiêu đề ở đây..."
        onChange={changeHandler}
        value={content}
      />
    </div>
  );
}

export default Title;
