// main
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

// components
import AdminLayout from "../../../../layout/AdminLayout";
import SpinnerModal from "../../../../components/SpinnerModal";
import ErrorMessage from "../../../../components/ErrorMessage";
import Editor from "../../../../containers/Editor";
import StatusBar from "../../../../layout/AdminLayout/StatusBar";

// apis
import useAxios from "../../../../hooks/useAxios";
import { adminApis } from "../../../../services/apis";

// hooks
import usePageTitle from "../../../../hooks/usePageTitle";

// assets
import {
  xMark as closeSVG,
  questionMark as questionSVG,
} from "../../../../assets/svgs";

// css
import styles from "./AddItinerary.module.css";
import "./AddItinerary.override.css";

function UpdateItinerary() {
  const [plan, setPlan] = useState([]);
  const [lang, setLang] = useState("vi");
  const [goUpdate, updating, updated, updatingError] = useAxios();
  const [fetchTour, fetching, fetchedData, fetchingError] = useAxios();
  const { tourId } = useParams();

  // submit handler
  const submitHandler = async () => {
    const sliders = plan.map((item) => item.images);

    const textPlan = plan.map((item) =>
      item.images.length > 0 && typeof item.images[0] === "string"
        ? item
        : { ...item, images: [] }
    );

    const f = new FormData();

    sliders.forEach((slider, index) => {
      if (slider.length > 0) {
        slider.forEach((img) => {
          f.append(`plan${index}`, img);
        });
      }
    });

    f.append("itinerary", JSON.stringify(textPlan));
    f.append("tourId", tourId);
    f.append("language", lang);

    goUpdate(adminApis.itinerary.update(f));
  };

  // fetch tour
  useEffect(() => {
    fetchTour(adminApis.tour.getSingle(tourId, lang));
  }, [lang]);

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

  useEffect(() => {
    if (updated) {
      alert("Thành công");
    }
  }, [updated]);

  useEffect(() => {
    if (updatingError) {
      alert("Thất bại");
    }
  }, [updatingError]);

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

  usePageTitle("Cập nhật lộ tình tour | Admin | Travel Funix");

  useEffect(() => {
    const scrollingElement = document.getElementById("admin__content");
    scrollingElement.scroll({
      top: scrollingElement.scrollHeight,
      behavior: "smooth",
    });
  }, [plan]);

  return (
    <>
      <SpinnerModal show={fetching || updating} />
      <AdminLayout
        title="Cập nhật lộ trình tour"
        path={`/admin/edit-tour/${tourId}`}
        text="Edit tour"
      >
        {fetchingError && <ErrorMessage msg={fetchingError.message} />}

        <StatusBar title="Cập nhật lộ trình tour">
          <button onClick={addDayHandler} className="btn btn-info  btn-sm">
            add item
          </button>

          <button onClick={submitHandler} className="btn btn-primary btn-sm">
            Submit
          </button>
        </StatusBar>

        <div className={styles.container + " pb-5"}>
          {/* select languages  */}

          <div className="d-flex justify-content-between align-items-center pb-4">
            <label className="d-flex align-items-center">
              <h6 className="mb-0 me-2 text-nowrap">Phiên bản ngôn ngữ</h6>
              <select value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="vi">Tiếng Việt</option>
                <option value="en">Tiếng Anh</option>
              </select>
              <span
                title="Bạn cần tạo tour phiên bản tiếng Việt trước để tạo được lộ trình tiếng Anh"
                className={styles.questionMark}
              >
                {questionSVG}
              </span>
            </label>

            {plan.length > 0 && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setPlan([])}
              >
                Xóa hết
              </button>
            )}
          </div>

          {lang !== "vi" && // không phải tiếng Việt
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
                  <Accordion.Item eventKey={planItem.id}>
                    <Accordion.Header>
                      <div className={styles.accordionHeader}>
                        <h6>{planItem.day}</h6>
                        <h5>{planItem.destination}</h5>
                        <button
                          title="Xóa"
                          className={styles.removeDayBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeHandler(planItem.id);
                          }}
                        >
                          {closeSVG}
                        </button>
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
                        {lang === "vi" && (
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
