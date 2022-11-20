import { Link } from "react-router-dom";
import { barsArrowDown, barsArrowUp } from "../../../../assets/svgs";
import styles from "./CatGroup.module.css";
import { useState } from "react";

const CatGroup = ({ type, cat, onDelete }) => {
  const [show, setShow] = useState(false);
  const data = cat ? cat.filter((item) => item.type === type) : [];

  const deleteHandler = (catId) => {
    if (window.confirm("Bạn có chắc muốn xóa category item này không?")) {
      onDelete(catId);
    }
  };
  return (
    <div className={styles.catGroup}>
      <div className={styles.header}>
        <h6>{type}</h6>
        <label className={styles.displayMenu}>
          {show ? barsArrowUp : barsArrowDown}
          <input onChange={() => setShow((prev) => !prev)} type="checkbox" />
        </label>
      </div>

      {show && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Code</th>
              <th>Parent</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.type}</td>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>{item.parent?.code}</td>
                <td>
                  <Link
                    to={`/admin/category/edit-cat/${item._id}`}
                    state={{
                      isShowModal: true,
                      catItem: item,
                      categories: cat,
                    }}
                  >
                    Edit
                  </Link>
                  <button onClick={() => deleteHandler(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CatGroup;
