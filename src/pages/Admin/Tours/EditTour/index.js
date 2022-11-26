import {
  useState,
  useEffect,
  useParams,
  format,
  AdminLayout,
  SpinnerModal,
  TourForm,
  useAxios,
  adminApis,
  ErrorMessage,
  styles,
  formPacker,
  usePageTitle,
} from "./import";

function EditTour() {
  const [goEdit, editing, isSuccess, editingError] = useAxios();
  const [fetchTour, fetching, fetchedData, fetchingError] = useAxios();
  const [tour, setTour] = useState(null);
  const [lang, setLang] = useState("vi");
  const { tourId } = useParams();

  // lấy các ngôn ngữ hiện có (trong category type = language)
  const langs = fetchedData
    ? fetchedData.metadata.categories
        .filter((item) => item.type === "language")
        .map((item) => item.code)
    : null;

  const submitHandler = (values) => {
    const formData = formPacker(values, tourId);
    goEdit(adminApis.tour.edit(formData));
  };

  useEffect(() => {
    fetchTour(adminApis.tour.getSingle(tourId, lang));
  }, [lang]);

  useEffect(() => {
    if (fetchedData) {
      setTour(fetchedData.data);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (isSuccess) {
      alert(`Thành công`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (editingError) {
      alert(`Có lỗi xảy ra: ${editingError.message}`);
    }
  }, [editingError]);

  const initialValues = tour
    ? {
        ...tour,
        removedImages: [],
        departureDates: tour.departureDates
          .map((item) => format(new Date(item), "dd/MM/yyyy"))
          .join("\n"),
        highlights: tour.highlights,

        days: tour.duration.days,
        nights: tour.duration.nights,

        priceIncludes: tour.price_policies.includes,
        priceExcludes: tour.price_policies.excludes,
        priceOther: tour.price_policies.other,

        cancellationPolicy: tour.terms.cancellation,
        registrationPolicy: tour.terms.registration,
        notes: tour.terms.notes,
        paymentPolicy: tour.terms.payment,

        language: lang,
      }
    : null;

  usePageTitle("Cập nhật tour | Admin | Travel Funix");

  return (
    <>
      <SpinnerModal show={editing || fetching} />

      <AdminLayout
        title={`Cập nhật tour ${tourId}`}
        path={`/admin/update-itinerary/${tourId}`}
        text="Cập nhật lộ trình tour"
      >
        <div className={styles.editPost}>
          {langs && (
            <label className={styles.langSelect}>
              <span>Ngôn ngữ</span>
              <select value={lang} onChange={(e) => setLang(e.target.value)}>
                {langs.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          )}

          {initialValues && !fetching && fetchedData && (
            <div className={styles.container}>
              <TourForm
                key={lang}
                initialValues={initialValues}
                onSubmit={submitHandler}
                cat={fetchedData.metadata.categories}
              />
            </div>
          )}

          {!initialValues && !fetchingError && fetchedData && (
            <div>
              <h6>Hiện chưa có version ngôn ngữ "{lang}" của tour này</h6>
              <button
                className={styles.addLangBtn}
                onClick={() => setTour(fetchedData.metadata.original)}
              >
                Thêm version tiếng "{lang}"
              </button>
            </div>
          )}

          {fetchingError && <ErrorMessage msg={fetchingError.message} />}
        </div>
      </AdminLayout>
    </>
  );
}

export default EditTour;
