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
} from "./import";

function EditTour() {
  const [goEdit, editing, isSuccess, editingError] = useAxios();
  const [fetchTour, fetching, fetchedData, fetchingError] = useAxios();
  const [tour, setTour] = useState(null);
  const [lang, setLang] = useState("vi");
  const { tourId } = useParams();

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
        highlights: tour.highlights.join("\n"),
        priceIncludes: tour.priceIncludes.join("\n"),
        priceExcludes: tour.priceExcludes.join("\n"),
        cancellationPolicy: tour.cancellationPolicy.join("\n"),
        language: lang,
      }
    : null;

  return (
    <>
      <SpinnerModal show={editing || fetching} />

      <AdminLayout title={`Cập nhật tour ${tourId}`}>
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
