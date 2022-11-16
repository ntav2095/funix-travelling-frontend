// main
import { useEffect } from "react";

// components
import AdminLayout from "../../../layout/AdminLayout";
import SpinnerModal from "../../../components/SpinnerModal";

// hooks
import useAxios from "../../../hooks/useAxios";
import { adminApis, categoryApi } from "../../../services/apis";
// main
import { useRef } from "react";

// css
import styles from "./Category.module.css";
//
function Category() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [add, adding, result, addingError] = useAxios();
  const codeRef = useRef();
  const typeRef = useRef();
  const parentRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    add(
      adminApis.category.add({
        type: typeRef.current.value,
        code: codeRef.current.value,
        parent: parentRef.current.value,
      })
    );
  };

  useEffect(() => {
    sendRequest(categoryApi.get());
  }, []);

  useEffect(() => {
    if (result) {
      alert("thanh cong");
    }
  }, [result]);

  useEffect(() => {
    if (addingError) {
      alert("that bai");
    }
  }, [addingError]);
  return (
    <>
      <SpinnerModal show={isLoading} />
      <AdminLayout title="Category">
        <div className={styles.container}>
          {error && <p>{error.message}</p>}

          {data && (
            <table>
              <thead>
                <tr>
                  <th>type</th>
                  <th>code</th>
                  <th>parent</th>
                </tr>
              </thead>

              <tbody>
                {data.data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.type}</td>
                    <td>{item.code}</td>
                    <td>{item.parent?.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <form onSubmit={submitHandler} className={styles.textForm}>
            <input ref={typeRef} type="text" placeholder="category type" />
            <input ref={codeRef} type="text" placeholder="category code" />
            <select ref={parentRef}>
              <option value="">Không</option>
              {data &&
                data.data.map((catItem, index) => (
                  <option key={index} value={catItem._id}>
                    {catItem.type}: {catItem.code}
                  </option>
                ))}
            </select>
            <br />
            <button className="mt-4">Add</button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
}

export default Category;
