// main
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
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

// css
import styles from "./AddItinerary.module.css";

function UpdateItinerary() {
  const [plan, setPlan] = useState([]);
  const [images, setImages] = useState([]);
  const [uploadingImgs, setUploadingImgs] = useState(false);
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
  const changeHandler = (type, id, content) => {
    if (type === "para") {
      setPlan((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, content: content.delta } : item
        )
      );

      setImages((prev) => {
        let newImages = [];
        content.files.forEach((fileObj) => {
          if (!prev.find((item) => item.url === fileObj.url)) {
            newImages.push(fileObj);
          }
        });

        return [...prev, ...newImages];
      });
    }

    if (type === "title" || type === "time") {
      setPlan((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, content: content } : item
        )
      );
    }
  };

  // submit handler
  const submitHandler = async () => {
    try {
      if (uploadingImgs || isLoading) {
        alert("Đang loading. Vui lòng đợi");
        return;
      }
      let textPlan = JSON.stringify(plan);

      // loại các item hình không có trong plan (người dùng add vào rồi xóa chẳng hạn)
      let imgUrls = images.filter((item) => textPlan.includes(item.url));
      // tải ảnh lên server, lấy url ảnh tương ứng do server trả về
      const promises = imgUrls.map((item) => {
        const formData = new FormData();
        formData.append("image", item.file);
        return axios("https://funixxx.herokuapp.com/api/file/single", {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
          method: "POST",
        });
      });
      setUploadingImgs(true);
      const serverUrls = await Promise.all(promises);
      let urls = serverUrls.map((item, index) => ({
        newUrl: item.data,
        oldUrl: imgUrls[index].url,
      }));
      urls.forEach((item) => {
        textPlan = textPlan.replace(item.oldUrl, item.newUrl);
      });

      sendRequest(
        tourApi.updateItinerary({
          tourId: tourId,
          itinerary: JSON.parse(textPlan),
        })
      );
    } catch (error) {
      console.error(error);
    }
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
      setUploadingImgs(false);
      alert("Cập nhật lộ trình tour thành công");
      navigate("/admin/tours");
    }
  }, [updated]);

  useEffect(() => {
    if (updatingError) {
      alert("Cập nhật lộ trình tour thất bại: ", updatingError.message.vi);
      navigate("/admin/tours");
    }
  }, [updatingError]);

  useEffect(() => {
    console.log("images: ", images);
  }, [images]);
  return (
    <>
      <SpinnerModal show={isLoading || fetchingTour || uploadingImgs} />
      <AdminLayout title={title}>
        <div className={styles.container}>
          {plan.map((item) => {
            if (item.type === "title") {
              return (
                <Title
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  content={getContent(item.id)}
                  onChange={changeHandler}
                />
              );
            }

            if (item.type === "time") {
              return (
                <Time
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  content={getContent(item.id)}
                  onChange={changeHandler}
                />
              );
            }

            if (item.type === "para") {
              return (
                <Paragraph
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  content={getContent(item.id)}
                  onChange={changeHandler}
                />
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
