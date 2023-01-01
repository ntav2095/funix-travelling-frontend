import {
  // main
  useEffect,
  useNavigate,
  useRef,

  // components
  AdminLayout,
  SpinnerModal,
  TourForm,
  ErrorMessage,
  NotifyModal,
  StatusBar,

  // apis
  useAxios,
  tourApis,
  categoryApis,

  // other
  usePageTitle,
  initialValues,
  dataPacker,

  // css
  styles,
} from "./import";

function NewTour() {
  const [create, creating, created, creatingError, resetCreating] = useAxios();
  const [fetchCat, isFetchingCat, cat, fetchingCatError] = useAxios();
  const navigate = useNavigate();
  const submitRef = useRef();

  const submitHandler = (values) => {
    const formData = dataPacker(values);
    create(tourApis.add(formData));
  };

  useEffect(() => {
    fetchCat(categoryApis.get());
  }, []);

  usePageTitle("Tạo tour mới | Admin | Travel Funix");

  const notifyType = created ? "success" : creatingError ? "error" : "";
  const showNotify = created || creatingError;
  const notifyMessage = created
    ? "Tạo tour mới thành công. Bạn sẽ được chuyển đến trang tạo lộ trình"
    : creatingError
    ? creatingError.message
    : "";

  return (
    <>
      <SpinnerModal show={creating || isFetchingCat} />
      <NotifyModal
        type={notifyType}
        show={showNotify}
        message={notifyMessage}
        time={1500}
        btn={{
          component: "button",
          text: "OK",
          cb:
            notifyType === "error"
              ? function () {
                  resetCreating();
                }
              : function () {
                  navigate(`/admin/update-itinerary/${created?.data?._id}`);
                },
        }}
      />

      <AdminLayout>
        {fetchingCatError && <ErrorMessage msg={fetchingCatError.message} />}
        <StatusBar title="Tạo tour mới">
          <button
            type="button"
            onClick={() => {
              if (submitRef.current) {
                submitRef.current.click();
              }
            }}
            className="btn btn-primary btn-sm"
          >
            Xác nhận
          </button>
        </StatusBar>

        <div className={styles.container}>
          {cat && (
            <TourForm
              ref={submitRef}
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
