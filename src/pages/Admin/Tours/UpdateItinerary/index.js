import {
  // main
  useState,
  useEffect,
  uuid,
  useParams,
  Link,
  Accordion,

  // components
  AdminLayout,
  SpinnerModal,
  ErrorMessage,
  Editor,
  StatusBar,
  NotifyModal,

  // apis
  useAxios,
  tourApis,

  // other
  usePageTitle,
  closeSVG,
  questionSVG,
  formDataPacker,
  planValidator,

  // css
  styles,
} from "./UpdateItinerary.import";
import "./UpdateItinerary.override.css";

function UpdateItinerary() {
  const [plan, setPlan] = useState([]);
  const [planErrors, setPlanErrors] = useState(null);
  const [language, setLanguage] = useState("vi");
  const [goUpdate, updating, updated, updatingError, updatingReset] =
    useAxios();
  const [fetchTour, fetching, fetchedData, fetchingError] = useAxios();
  const { tourId } = useParams();

  // submit handler
  const submitHandler = async () => {
    const errors = planValidator(plan);
    if (errors) {
      setPlanErrors(errors);
      return;
    }

    const formData = formDataPacker(plan, tourId, language);
    goUpdate(tourApis.updateItinerary.update(formData));
  };

  // fetch tour
  useEffect(() => {
    fetchTour(tourApis.getSingle(tourId, language));
  }, [language]);

  // set plan
  useEffect(() => {
    if (fetchedData) {
      if (fetchedData.data) {
        setPlan(fetchedData.data.itinerary);
      } else {
        setPlan([]);
      }
    }
  }, [fetchedData]);

  const addDayHandler = () => {
    setPlan((prev) => [
      ...prev,
      {
        id: uuid(),
        day: "NGÀY MỚI",
        destination: "NGÀY MỚI",
        content: null,
        images: [],
      },
    ]);
  };

  const changeHandler = (type, id, payload) => {
    setPlan((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          item[type] = payload;
        }

        return item;
      })
    );
  };

  const removeHandler = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa ngày này không?")) {
      setPlan((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const removeImagesHandler = (id, e) => {
    const fileInput = e.target.parentElement.querySelector("input");
    fileInput.value = "";
    setPlan((prev) =>
      prev.map((item) => (item.id === id ? { ...item, images: [] } : item))
    );
  };

  useEffect(() => {
    const scrollingElement = document.getElementById("admin__content");
    scrollingElement.scroll({
      top: scrollingElement.scrollHeight,
      behavior: "smooth",
    });
  }, [plan]);

  usePageTitle("Cập nhật lộ tình tour | Admin | Travel Funix");

  // handle show notification submit status
  let notify = {};
  if (updated) {
    notify = {
      type: "success",
      message: "Cập nhật lộ trình tour thành công",
      time: 1500,
      leftBtn: {
        text: "OK",
        cb: () => {
          updatingReset();
        },
        component: "button",
      },
      rightBtn: {
        text: "Về trang danh sách tours",
        to: `/admin/tours`,
        component: Link,
      },
      onHide: () => {
        updatingReset();
      },
    };
  }

  if (updatingError) {
    notify = {
      type: "error",
      message: updatingError.message,
      btn: {
        text: "OK",
        component: "button",
        cb: () => {
          updatingReset();
        },
      },
    };
  }

  if (planErrors) {
    notify = {
      type: "error",
      message: planErrors,
      btn: {
        text: "OK",
        component: "button",
        cb: () => {
          setPlanErrors(null);
        },
      },
    };
  }

  const isShowNotify = updated || updatingError || planErrors;
  const titleAttr = `Các phiên bản ngôn ngữ hiện có: ${fetchedData?.metadata.available_lang
    .map((item) => item.name)
    .join(", ")}`;

  return (
    <>
      <SpinnerModal show={fetching || updating} />
      <NotifyModal show={isShowNotify} {...notify} />

      <AdminLayout>
        {fetchingError && <ErrorMessage msg={fetchingError.message} />}

        <StatusBar
          title={`Cập nhật lộ trình tour: ${
            fetchedData?.metadata.original.code || ""
          }`}
        >
          <Link className="btn btn-secondary" to={`/admin/edit-tour/${tourId}`}>
            Sửa tour
          </Link>

          <button onClick={addDayHandler} className="btn btn-info  btn-sm">
            Thêm item
          </button>

          {plan.length > 0 && (
            <button onClick={submitHandler} className="btn btn-primary btn-sm">
              Xác nhận
            </button>
          )}
        </StatusBar>

        <div className={styles.container + " pb-5"}>
          {/* select languages  */}

          <div className="d-flex justify-content-between align-items-center pb-4">
            {fetchedData && (
              <label className="d-flex align-items-center">
                <h6 className="mb-0 me-2 text-nowrap">
                  Chọn phiên bản ngôn ngữ
                </h6>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {fetchedData.metadata.available_lang.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                  {/* <option value="en">Tiếng Anh</option> */}
                </select>
                <span
                  title={`Bạn cần tạo tour ngôn ngữ tướng ứng trước để tạo được lộ trình ngôn ngữ đó.\n${titleAttr}`}
                  className={styles.questionMark}
                >
                  {questionSVG}
                </span>
              </label>
            )}

            {plan.length > 0 && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setPlan([])}
              >
                Xóa hết
              </button>
            )}
          </div>

          {language !== "vi" && // không phải tiếng Việt
            plan.length === 0 && // plan đang trống
            fetchedData.metadata.original.itinerary.length > 0 && ( // đã có lộ trình tiếng Việt
              <div>
                <button
                  className="btn btn-secondary mb-4"
                  onClick={() => {
                    setPlan(fetchedData.metadata.original.itinerary);
                  }}
                >
                  Copy nội dung bài gốc
                </button>
              </div>
            )}

          {/* ============================ accordion ================  */}

          <div className={styles.plan + " updateItinerary__accordion"}>
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              {!fetching &&
                plan.map((planItem) => (
                  <Accordion.Item eventKey={planItem.id} key={planItem.id}>
                    <Accordion.Header>
                      <div className={styles.accordionHeader}>
                        <h6>{planItem.day}</h6>
                        <h5>{planItem.destination}</h5>
                        <span
                          title="Xóa"
                          className={styles.removeDayBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeHandler(planItem.id);
                          }}
                        >
                          {closeSVG}
                        </span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div key={planItem.id} className={styles.planItem}>
                        {/* day  */}
                        <label>
                          <h6>Tiêu đề</h6>
                          <input
                            type="text"
                            value={planItem.day}
                            onChange={(e) =>
                              changeHandler("day", planItem.id, e.target.value)
                            }
                            placeholder="Ngày 1 - 2..."
                          />
                        </label>

                        {/* destination  */}
                        <label>
                          <h6>Địa điểm</h6>
                          <input
                            type="text"
                            onChange={(e) =>
                              changeHandler(
                                "destination",
                                planItem.id,
                                e.target.value
                              )
                            }
                            value={planItem.destination}
                            placeholder="Paris - Vatican..."
                          />
                        </label>

                        {/* content  */}
                        <div className="pb-3">
                          <h6>Nội dung</h6>
                          <div className={styles.editor}>
                            <Editor
                              placeholder="nhập nội dung ở đây..."
                              onChange={(delta) =>
                                changeHandler("content", planItem.id, delta)
                              }
                              initialValue={planItem.content}
                            />
                          </div>
                        </div>

                        {/* images  */}
                        {language === "vi" && (
                          <>
                            <div>
                              <h6>Hình ảnh</h6>
                              <input
                                type="file"
                                multiple
                                onChange={(e) =>
                                  changeHandler(
                                    "images",
                                    planItem.id,
                                    Array.from(e.target.files)
                                  )
                                }
                              />
                              {planItem.images.length > 0 && (
                                <button
                                  className="btn btn-outline-danger btn-sm  ms-4"
                                  onClick={(e) =>
                                    removeImagesHandler(planItem.id, e)
                                  }
                                >
                                  Xóa hình
                                </button>
                              )}
                            </div>

                            <div className={styles.previewImages + " mt-3"}>
                              {planItem.images.map((img, index) => (
                                <div key={index} className={styles.image}>
                                  <img
                                    src={
                                      typeof img === "string"
                                        ? img
                                        : URL.createObjectURL(img)
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
            </Accordion>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default UpdateItinerary;
