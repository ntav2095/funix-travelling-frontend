import {
  useEffect,
  AdminLayout,
  SpinnerModal,
  useAxios,
  adminApis,
  categoryApi,
  useRef,
  CatGroup,
  styles,
} from "./import";

function Category() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [add, adding, result, addingError] = useAxios();
  const codeRef = useRef();
  const typeRef = useRef();
  const parentRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const type = typeRef.current.value;
    const code = codeRef.current.value;
    const parent = parentRef.current.value;
    if (!type || !code) {
      alert("Thiếu trường");
      return;
    }

    add(
      adminApis.category.add({
        type,
        code,
        parent,
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
      <SpinnerModal show={isLoading || adding} />
      <AdminLayout title="Category">
        <div className={styles.container}>
          {error && <p>{error.message}</p>}

          {data && <CatGroup type="continent" cat={data.data} />}
          {data && <CatGroup type="language" cat={data.data} />}
          {data && <CatGroup type="country" cat={data.data} />}
          {data && <CatGroup type="city" cat={data.data} />}

          <form onSubmit={submitHandler} className={styles.textForm}>
            <input ref={typeRef} type="text" placeholder="type" />
            <input ref={codeRef} type="text" placeholder="code" />
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
