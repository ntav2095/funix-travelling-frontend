import {
  // main
  useState,
  useRef,
  useEffect,
  Link,
  useParams,

  // components
  AdminLayout,
  SpinnerModal,
  StatusBar,
  TourForm,
  ErrorMessage,

  // apis
  useAxios,
  tourApis,

  // other
  formPacker,
  usePageTitle,

  // css
  styles,
} from "./import";

function EditTour() {
  const [goEdit, editing, isSuccess, editingError] = useAxios();
  const [fetchTour, fetching, fetchedData, fetchingError] = useAxios();
  const [tour, setTour] = useState(null);
  const [lang, setLang] = useState("vi");
  const { tourId } = useParams();
  const submitRef = useRef();

  const submitHandler = (values) => {
    const formData = formPacker(values, tourId);
    goEdit(tourApis.edit(formData));
  };

  useEffect(() => {
    fetchTour(tourApis.getSingle(tourId, lang));
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

  const images = tour
    ? tour.itinerary.reduce((p, c) => [...p, ...c.images], [])
    : [];

  const initialValues = tour
    ? {
        ...tour,
        removedImages: [],
        departureDates: tour.departureDates,
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
        price: tour.price.toLocaleString("en-US"),
        images,
      }
    : null;

  usePageTitle("Cập nhật tour | Admin | Travel Funix");

  return (
    <>
      <SpinnerModal show={editing || fetching} />

      <AdminLayout>
        <StatusBar
          title={`Cập nhật tour: ${fetchedData?.metadata.original.code || ""}`}
        >
          <Link
            className="btn btn-secondary"
            to={`/admin/update-itinerary/${tourId}`}
          >
            Sửa lộ trình tour
          </Link>

          <button
            type="button"
            onClick={() => {
              if (submitRef.current) {
                submitRef.current.click();
              }
            }}
            className="btn btn-primary btn-sm"
          >
            Cập nhật
          </button>
        </StatusBar>

        <div className={styles.container}>
          <label className={styles.langSelect}>
            <span>Ngôn ngữ</span>
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              <option value="vi">Tiếng Việt</option>
              <option value="en">Tiếng Anh</option>
            </select>
          </label>

          {initialValues && !fetching && fetchedData && (
            <TourForm
              ref={submitRef}
              key={lang}
              initialValues={initialValues}
              onSubmit={submitHandler}
              cat={fetchedData.metadata.categories}
            />
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
