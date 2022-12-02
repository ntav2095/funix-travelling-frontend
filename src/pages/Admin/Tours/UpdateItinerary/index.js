// main
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";

// components
import AdminLayout from "../../../../layout/AdminLayout";
import SpinnerModal from "../../../../components/SpinnerModal";
import ErrorMessage from "../../../../components/ErrorMessage";
import Editor from "../../../../containers/Editor";

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
      setPlan(fetchedData.data.itinerary);
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

  const langs = fetchedData ? fetchedData.metadata.available_lang : [];

  const addDayHandler = () => {
    setPlan((prev) => [
      ...prev,
      { id: uuid(), day: "", destination: "", content: null, images: [] },
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
    if (window.confirm("Are you sure?")) {
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

  return (
    <>
      <SpinnerModal show={fetching || updating} />
      <AdminLayout
        title="Cập nhật lộ trình tour"
        path={`/admin/edit-tour/${tourId}`}
        text="Edit tour"
      >
        {fetchingError && <ErrorMessage msg={fetchingError.message} />}

        {/* select languages  */}
        <div className="d-flex justify-content-between align-items-center pb-4">
          <label className="d-flex align-items-center">
            <h6 className="mb-0 me-2 text-nowrap">Phiên bản ngôn ngữ</h6>
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              {langs.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <span
              title="Bạn cần tạo tour phiên bản tiếng Anh trước để tạo được lộ trình tiếng Anh"
              className={styles.questionMark}
            >
              {questionSVG}
            </span>
          </label>

          {plan.length > 0 && (
            <button className="btn btn-danger" onClick={() => setPlan([])}>
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

        {/* ============================ plan creator ================  */}
        <div className={styles.plan}>
          {!fetching &&
            plan.map((planItem) => (
              <div key={planItem.id} className={styles.planItem}>
                {/* remove item btn  */}
                <button
                  title="Xóa ngày này"
                  className={styles.removeDayBtn}
                  onClick={() => removeHandler(planItem.id)}
                >
                  {closeSVG}
                </button>

                {/* day  */}
                <label>
                  <h6>Ngày</h6>
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
                      changeHandler("destination", planItem.id, e.target.value)
                    }
                    value={planItem.destination}
                    placeholder="Paris - Vatican..."
                  />
                </label>

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
                          onClick={(e) => removeImagesHandler(planItem.id, e)}
                        >
                          Xóa hết hình của ngày này
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

                {/* content  */}
                <div>
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
              </div>
            ))}
        </div>

        <div className={styles.addBtns}>
          <button onClick={addDayHandler} className="btn btn-primary mb-4">
            add item
          </button>
        </div>

        <div className={styles.submitBtn}>
          <button onClick={submitHandler} className="btn btn-success">
            Submit
          </button>
        </div>
      </AdminLayout>
    </>
  );
}

export default UpdateItinerary;
