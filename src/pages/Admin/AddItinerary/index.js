// main
import { useState, useRef, useCallback, useEffect } from "react";
import { v4 as uuid } from "uuid";

// components
import AdminLayout from "../../../layout/AdminLayout";
import Title from "./Title";
import Time from "./Time";
import Paragraph from "./Paragraph";

// apis

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

  const test = () => {
    let imgUrls = [];
    images.forEach((item) => {
      imgUrls = [...imgUrls, ...item.files.map((x) => x.url)];
    });
    let textPlan = JSON.stringify(plan);
    imgUrls.forEach((item) => {
      console.log(item);
      textPlan = textPlan.replace(item, myUrl);
    });

    const newPlan = JSON.parse(textPlan);
    let html = "";
    newPlan.forEach((item) => {
      if (item.type === "time") {
        html += `<div><h2>${item.content.session}</h2><h2>${item.content.time}</h2></div>`;
      }

      if (item.type === "title") {
        html += `<h1>${item.content}</h1>`;
      }

      if (item.type === "para") {
        html += `<h1>${quillGetHTML(item.content)}</h1>`;
      }
    });
    document.getElementById("hehe").innerHTML = html;
  };

  return (
    <AdminLayout>
      <div className={styles.container}>
        {plan.map((item) => {
          if (item.type === "title") {
            return (
              <Title
                key={item.id}
                // onChange={changeHandler}
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
                // onChange={changeHandler}
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
                // onChange={changeHandler}
                id={item.id}
                type={item.type}
                isSubmit={isSubmit}
                onSubmit={submitHandler}
              />
            );
          }

          return null;
        })}

        <button onClick={() => addContentHandler("title")}>Add title</button>
        <button onClick={() => addContentHandler("time")}>Add time</button>
        <button onClick={() => addContentHandler("para")}>Add paragraph</button>

        <div className="submitBtn">
          <button onClick={() => setIsSubmit((prev) => prev + 1)}>
            Submit
          </button>

          <button onClick={() => console.log(plan, images)}>xxx</button>
          <button onClick={test}>test</button>
        </div>

        <div id="hehe"></div>
      </div>
    </AdminLayout>
  );
}

export default AddItinerary;
