// main
import { useState, useRef, useCallback, useEffect } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useParams } from "react-router-dom";

// components
import AdminLayout from "../../../layout/AdminLayout";
import Title from "./Title";
import Time from "./Time";
import Paragraph from "./Paragraph";

// apis
import useAxios from "../../../hooks/useAxios";
import { tourApi } from "../../../services/apis";

// helpers
import quillGetHTML from "../../../services/helpers/quillGetHTML";

// css
import styles from "./AddItinerary.module.css";

const myUrl =
  "https://haycafe.vn/wp-content/uploads/2021/11/hinh-anh-hoat-hinh-de-thuong-cute-dep-nhat.jpg";

function AddItinerary() {
  const [plan, setPlan] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmit, setIsSubmit] = useState(0);
  const [sendRequest, isLoading, data, error] = useAxios();
  const { tourId } = useParams();

  const addContentHandler = (type) => {
    //
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
      setImages((prev) => [...prev, { id: newId, files: [] }]);
    }
  };

  const submitHandler = useCallback((type, id, content) => {
    if (type === "para") {
      setPlan((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, content: content.delta } : item
        )
      );

      setImages((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, files: content.files } : item
        )
      );
    }

    if (type === "title" || type === "time") {
      console.log(content);
      setPlan((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, content: content } : item
        )
      );
    }
  }, []);

  const test = async () => {
    try {
      let imgUrls = [];
      images.forEach((item) => {
        imgUrls = [
          ...imgUrls,
          ...item.files.map((x) => ({ url: x.url, file: x.file })),
        ];
      });

      let textPlan = JSON.stringify(plan);
      imgUrls = imgUrls.filter((item) => textPlan.includes(item.url));
      console.log(imgUrls);

      // get urls from server
      const promises = imgUrls.map((item) => {
        const formData = new FormData();
        formData.append("image", item.file);
        return axios("http://localhost:5000/api/file/single", {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
          method: "POST",
        });
      });

      const serverUrls = await Promise.all(promises);

      let urls = serverUrls.map((item, index) => ({
        newUrl: item.data,
        oldUrl: imgUrls[index].url,
      }));

      urls.forEach((item) => {
        textPlan = textPlan.replace(item.oldUrl, item.newUrl);
      });

      sendRequest(
        tourApi.addItinerary({
          tourId: tourId,
          itinerary: JSON.parse(textPlan),
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className={styles.container}>
        {plan.map((item) => {
          if (item.type === "title") {
            return (
              <Title
                key={item.id}
                id={item.id}
                type={item.type}
                isSubmit={isSubmit}
                onSubmit={submitHandler}
              />
            );
          }

          if (item.type === "time") {
            return (
              <Time
                key={item.id}
                id={item.id}
                type={item.type}
                isSubmit={isSubmit}
                onSubmit={submitHandler}
              />
            );
          }

          if (item.type === "para") {
            return (
              <Paragraph
                key={item.id}
                id={item.id}
                type={item.type}
                isSubmit={isSubmit}
                onSubmit={submitHandler}
              />
            );
          }

          return null;
        })}

        <div className={styles.addBtns}>
          <button onClick={() => addContentHandler("title")}>Add title</button>
          <button onClick={() => addContentHandler("time")}>Add time</button>
          <button onClick={() => addContentHandler("para")}>
            Add paragraph
          </button>
        </div>

        <div className="submitBtn">
          <button onClick={() => setIsSubmit((prev) => prev + 1)}>Done</button>

          <button onClick={test}>Submit</button>
        </div>

        <div id="hehe"></div>
      </div>
    </AdminLayout>
  );
}

export default AddItinerary;
