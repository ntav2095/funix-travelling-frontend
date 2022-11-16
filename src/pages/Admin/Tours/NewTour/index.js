import {
  useEffect,
  useNavigate,
  AdminLayout,
  SpinnerModal,
  useAxios,
  adminApis,
  stringToDate,
  TourForm,
  initialValues,
} from "./import";

function NewTour() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [fetchCat, isFetchingCat, cat, fetchingCatError] = useAxios();

  const navigate = useNavigate();

  const submitHandler = (values) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("journey", values.journey);
    formData.append("description", values.description);
    formData.append(
      "highlights",
      JSON.stringify(values.highlights.split("\n"))
    );

    formData.append("currentPrice", values.currentPrice);
    formData.append("oldPrice", values.oldPrice);
    formData.append(
      "priceIncludes",
      JSON.stringify(values.priceIncludes.split("\n"))
    );
    formData.append(
      "priceExcludes",
      JSON.stringify(values.priceExcludes.split("\n"))
    );

    formData.append(
      "departureDates",
      JSON.stringify(
        values.departureDates.split("\n").map((item) => stringToDate(item)[1])
      )
    );
    formData.append("days", values.days);
    formData.append("nights", values.nights);

    formData.append(
      "cancellationPolicy",
      JSON.stringify(values.cancellationPolicy.split("\n"))
    );

    values.slider.forEach((item) => {
      formData.append("slider", item);
    });

    formData.append("thumb", values.thumb);

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
  console.log(cat);
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
