import {
  useEffect,
  AdminLayout,
  SpinnerModal,
  useAxios,
  adminApis,
  TourForm,
  initialValues,
  dataPacker,
} from "./import";
import { useState } from "react";
import ErrorMessage from "../../../../components/ErrorMessage";

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
      setFormKey((prev) => prev + 1);
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
  return (
    <>
      <SpinnerModal show={isLoading || isFetchingCat} />

      <AdminLayout title="Tạo tour mới">
        {fetchingCatError && <ErrorMessage msg={fetchingCatError.message} />}
        {cat && (
          <TourForm
            key={formKey}
            initialValues={initialValues}
            onSubmit={submitHandler}
            cat={cat.data}
          />
        )}
      </AdminLayout>
    </>
  );
}

export default NewTour;
