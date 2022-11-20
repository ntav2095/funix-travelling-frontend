import {
  useEffect,
  useNavigate,
  AdminLayout,
  SpinnerModal,
  useAxios,
  adminApis,
  TourForm,
  initialValues,
  dataPacker,
} from "./import";

function NewTour() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [fetchCat, isFetchingCat, cat, fetchingCatError] = useAxios();

  const navigate = useNavigate();

  const submitHandler = (values) => {
    const formData = dataPacker(values);
    sendRequest(adminApis.tour.add(formData));
  };

  useEffect(() => {
    if (data) {
      alert("Tạo tour mới thành công. Bạn sẽ được chuyển đến tranng tours.");
      navigate("/admin/tours");
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
      <SpinnerModal show={isLoading} />

      <AdminLayout title="Tạo tour mới">
        {cat && (
          <TourForm
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
