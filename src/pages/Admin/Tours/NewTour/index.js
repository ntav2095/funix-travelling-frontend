import {
  useState,
  useEffect,
  AdminLayout,
  SpinnerModal,
  TourForm,
  ErrorMessage,
  useAxios,
  adminApis,
  usePageTitle,
  initialValues,
  dataPacker,
} from "./import";
import styles from "./NewTour.module.css";

function NewTour() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [fetchCat, isFetchingCat, cat, fetchingCatError] = useAxios();
  const [formKey, setFormKey] = useState(1);

  const submitHandler = (values) => {
    const formData = dataPacker(values);
    sendRequest(adminApis.tour.add(formData));
  };

  useEffect(() => {
    if (data) {
      alert("Tạo tour mới thành công.");
      setFormKey((prev) => prev + 1); // re-render form mới
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(`Có lỗi xảy ra: ${error.message}`);
    }
  }, [error]);

  useEffect(() => {
    fetchCat(adminApis.category.get());
  }, []);

  usePageTitle("Tạo tour mới | Admin | Travel Funix");
  return (
    <>
      <SpinnerModal show={isLoading || isFetchingCat} />

      <AdminLayout>
        {fetchingCatError && <ErrorMessage msg={fetchingCatError.message} />}

        <div className={styles.container}>
          {cat && (
            <TourForm
              key={formKey}
              initialValues={initialValues}
              onSubmit={submitHandler}
              cat={cat.data}
            />
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default NewTour;
