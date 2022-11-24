// main
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useParams, Link, useNavigate } from "react-router-dom";

// components
import AdminLayout from "../../../../layout/AdminLayout";
import SpinnerModal from "../../../../components/SpinnerModal";
import ErrorMessage from "../../../../components/ErrorMessage";

// apis
import useAxios from "../../../../hooks/useAxios";
import { adminApis, tourApi } from "../../../../services/apis";

// hooks
import usePageTitle from "../../../../hooks/usePageTitle";

// assets
import { xMark as closeSVG } from "../../../../assets/svgs";

// css
import styles from "./AddItinerary.module.css";
import Editor from "../../../../containers/Editor";

function UpdateItinerary() {
  const [plan, setPlan] = useState([]);
  const [lang, setLang] = useState("vi");
  const [goUpdate, updating, updated, updatingError] = useAxios();
  const [fetchTour, fetching, fetchedData, fetchingError] = useAxios();
  const { tourId } = useParams();

  // submit handler
  const submitHandler = async () => {
    const images_arr = plan.map((item) => ({
      id: item.id,
      images: item.images,
    }));

    const textPlan = plan.map((item) => ({
      id: item.id,
      day: item.day,
      destination: item.destination,
      content: item.content,
    }));

    const f = new FormData();
    images_arr.forEach((item, index) => {
      item.images.forEach((img) => {
        f.append(`plan${index}`, img);
      });
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

  usePageTitle("Cập nhật lộ tình tour | Admin | Travel Funix");

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
    console.log(id);
    if (window.confirm("Are you sure?")) {
      setPlan((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <SpinnerModal show={fetching || updating} />
      <AdminLayout
        title="Cập nhật lộ trình tour"
        path={`/admin/edit-tour/${tourId}`}
        text="Edit tour"
      >
        <div className={styles.container}>
          {fetchingError && <ErrorMessage msg={fetchingError.message} />}

          <label className="d-flex align-items-center mb-4">
            <h6 className="mb-0 me-2">Ngôn ngữ</h6>
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              {langs.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          {lang !== "vi" &&
            plan.length === 0 &&
            fetchedData.metadata.original.itinerary.length > 0 && (
              <div>
                <button
                  className={styles.copyOriginalPlanBtn}
                  onClick={() => {
                    setPlan(fetchedData.metadata.original.itinerary);
                  }}
                >
                  Copy nội dung bài gốc
                </button>
              </div>
            )}

          <button onClick={() => setPlan([])}>Clear all</button>

          {/* ============================ plan creator ================  */}
          <div className={styles.plan}>
            {!fetching &&
              plan.map((planItem) => (
                <div key={planItem.id} className={styles.planItem}>
                  <button
                    className={styles.toggleBtn}
                    onClick={() => removeHandler(planItem.id)}
                  >
                    {closeSVG}
                  </button>
                  <label>
                    <h6>Ngày</h6>
                    <input
                      type="text"
                      value={planItem.day}
                      onChange={(e) =>
                        changeHandler("day", planItem.id, e.target.value)
                      }
                    />
                  </label>

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
                    />
                  </label>

                  {lang === "vi" && (
                    <>
                      <label>
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
                      </label>

                      <div className={styles.previewImages}>
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
        </div>
      </AdminLayout>
    </>
  );
}

export default UpdateItinerary;
