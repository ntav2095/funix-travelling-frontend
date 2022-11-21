// main
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useParams, Link, useNavigate } from "react-router-dom";

// components
import AdminLayout from "../../../../layout/AdminLayout";
import Title from "./Title";
import Time from "./Time";
import Paragraph from "./Paragraph";
import SpinnerModal from "../../../../components/SpinnerModal";
import ErrorMessage from "../../../../components/ErrorMessage";

// apis
import useAxios from "../../../../hooks/useAxios";
import { adminApis, tourApi } from "../../../../services/apis";

// assets
import { xMark as closeSVG } from "../../../../assets/svgs";

// css
import styles from "./AddItinerary.module.css";

function UpdateItinerary() {
  const [plan, setPlan] = useState([]);
  const [lang, setLang] = useState("vi");
  const [goUpdate, updating, updated, updatingError] = useAxios();
  const [fetchTour, fetching, fetchedData, fetchingError] = useAxios();
  const { tourId } = useParams();

  // handle thêm title/thời gian/đoạn văn
  const addContentHandler = (type) => {
    if (type === "title") {
      setPlan((prev) => [...prev, { id: uuid(), type: "title", content: "" }]);
    }

    if (type === "time") {
      setPlan((prev) => [
        ...prev,
        {
          id: uuid(),
          type: "time",
          content: {
            time: "",
            duration: "",
          },
        },
      ]);
    }

    if (type === "para") {
      const newId = uuid();
      setPlan((prev) => [...prev, { id: newId, type: "para", content: {} }]);
    }
  };

  // handle lưu data vào plan mỗi khi người dùng nhập dữ liệu
  const changeHandler = (id, content) => {
    setPlan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, content: content } : item
      )
    );
  };

  const removePortionHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      setPlan((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // submit handler
  const submitHandler = () => {
    if (plan.length === 0) {
      alert("Bạn chưa điền nội dung");
      return;
    }
    goUpdate(
      adminApis.itinerary.update({
        tourId: tourId,
        itinerary: plan,
        language: lang,
      })
    );
  };

  const getContent = (id) => {
    return plan.find((item) => item.id === id).content;
  };

  useEffect(() => {
    fetchTour(adminApis.tour.getSingle(tourId, lang));
  }, [lang]);

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

          <div>
            {!fetching &&
              plan.map((item) => {
                if (item.type === "title") {
                  return (
                    <div key={item.id} className={styles.portion + " mt-4"}>
                      <Title
                        id={item.id}
                        content={getContent(item.id)}
                        onChange={changeHandler}
                      />
                      <button
                        className={styles.removeBtn}
                        onClick={() => removePortionHandler(item.id)}
                      >
                        {closeSVG}
                      </button>
                    </div>
                  );
                }

                if (item.type === "time") {
                  return (
                    <div key={item.id} className={styles.portion}>
                      <Time
                        id={item.id}
                        content={getContent(item.id)}
                        onChange={changeHandler}
                      />
                      <button
                        className={styles.removeBtn}
                        onClick={() => removePortionHandler(item.id)}
                      >
                        {closeSVG}
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <div key={item.id} className={styles.portion}>
                      <Paragraph
                        id={item.id}
                        content={item.content}
                        onChange={changeHandler}
                      />
                      <button
                        className={styles.removeBtn}
                        onClick={() => removePortionHandler(item.id)}
                      >
                        {closeSVG}
                      </button>
                    </div>
                  );
                }
              })}
          </div>

          <div className={styles.addBtns}>
            <button onClick={() => addContentHandler("title")}>
              Add title
            </button>
            <button onClick={() => addContentHandler("time")}>Add time</button>
            <button onClick={() => addContentHandler("para")}>
              Add paragraph
            </button>
          </div>

          <div className={styles.submitBtn}>
            <button onClick={submitHandler}>Submit</button>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default UpdateItinerary;
