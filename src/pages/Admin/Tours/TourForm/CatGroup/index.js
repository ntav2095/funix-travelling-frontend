import { useState } from "react";
import styles from "./CatGroup.module.css";

function CatGroup({
  cat,
  type,
  values,
  setFieldValue,
  setFieldTouched,
  touched,
}) {
  const [filter, setFilter] = useState("");

  const changeHandler = (code) => {
    const newCat = values.category.includes(code)
      ? values.category.filter((item) => item !== code)
      : [...values.category, code];

    setFieldValue("category", newCat);
    if (!touched.category) setFieldTouched("category", true, false);
  };

  const filteredCat = cat.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <p className={styles.title}>{type}</p>
      {type === "City" && (
        <input
          className="p-1 mb-1"
          type="text"
          values={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="lọc (tiếng việt có dấu)"
        />
      )}

      <div className={styles.catItems}>
        {filteredCat.map((catItem) => (
          <label
            key={catItem._id}
            className={
              values.category.includes(catItem.code) ? styles.active : undefined
            }
          >
            <span>{catItem.name || catItem.code}</span>
            <input
              type="checkbox"
              value={catItem.code}
              checked={values.category.includes(catItem.code)}
              onChange={() => changeHandler(catItem.code)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default CatGroup;
