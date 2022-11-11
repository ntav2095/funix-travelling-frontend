// main
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useParams, useNavigate } from "react-router-dom";

// components
import AdminLayout from "../../../layout/AdminLayout";
import Title from "./Title";
import Time from "./Time";
import Paragraph from "./Paragraph";
import SpinnerModal from "../../../components/SpinnerModal";

// apis
import useAxios from "../../../hooks/useAxios";
import { tourApi } from "../../../services/apis";

// assets
import { xMark as closeSVG } from "../../../assets/svgs";

// css
import styles from "./AddItinerary.module.css";

function UpdateItinerary() {
  const [plan, setPlan] = useState([]);
  const [sendRequest, isLoading, updated, updatingError] = useAxios();
  const [fetchTour, fetchingTour, fetchedTour, fetchingError] = useAxios();
  const { tourId } = useParams();
  const navigate = useNavigate();

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
    sendRequest(
      tourApi.updateItinerary({
        tourId: tourId,
        itinerary: plan,
      })
    );
  };

  const getContent = (id) => {
    return plan.find((item) => item.id === id).content;
  };

  useEffect(() => {
    fetchTour(tourApi.getSingleTour(tourId));
  }, []);

  useEffect(() => {
    if (fetchedTour) {
      setPlan(fetchedTour.item.itinerary);
    }
  }, [fetchedTour]);

  const title = fetchedTour
    ? `Cập nhật lộ trình tour: ${fetchedTour.item.name}`
    : "Cập nhật lộ trình tour";

  useEffect(() => {
    if (updated) {
      alert(
        "Cập nhật lộ trình tour thành công. Bạn sẽ được chuyển đến trang tours."
      );
      navigate("/admin/tours");
    }
  }, [updated]);

  useEffect(() => {
    if (updatingError) {
      alert(
        `Cập nhật lộ trình tour thất bại: ${
          updatingError.message?.vi || "Unknown error"
        }`
      );
    }
  }, [updatingError]);

  return (
    <>
      <SpinnerModal show={isLoading || fetchingTour} />
      <AdminLayout title={title}>
        <div className={styles.container}>
          {plan.map((item) => {
            if (item.type === "title") {
              return (
                <div className={styles.portion}>
                  <Title
                    key={item.id}
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
                <div className={styles.portion}>
                  <Time
                    key={item.id}
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

            if (item.type === "para") {
              return (
                <div className={styles.portion}>
                  <Paragraph
                    key={item.id}
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

            return null;
          })}

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
