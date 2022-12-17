import QuillReader from "../../../components/QuillReader";
import StatusBar from "../../../layout/AdminLayout/StatusBar";
import { AdminLayout, useEffect } from "../Category/import";
import useAxios from "../../../hooks/useAxios";
import usePageTitle from "../../../hooks/usePageTitle";
import styles from "./AboutManager.module.css";
import Editor from "../../../containers/Editor";
import { useState } from "react";

function AboutManager() {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const [update, updating, updated, updatingError] = useAxios();
  const [content, setContent] = useState(null);
  const [language, setLanguage] = useState("vi");
  const [editorKey, setEditorKey] = useState(0);

  const changeHandler = (delta) => {
    setContent(delta);
  };

  const submitHandler = () => {
    update({
      method: "PUT",
      url: "http://localhost:5000/admin/about",
      data: { language, content },
    });
  };

  useEffect(() => {
    sendRequest({
      method: "GET",
      url: "http://localhost:5000/admin/about",
    });
  }, []);

  useEffect(() => {
    if (data) {
      setContent(() => {
        if (language === "vi") {
          return data.data.content;
        } else {
          return (
            data.data.translation.find((item) => item.language === language)
              ?.content || null
          );
        }
      });
      setEditorKey(1);
    }
  }, [data]);

  useEffect(() => {
    if (data && editorKey > 0) {
      setContent(() => {
        if (language === "vi") {
          return data.data.content;
        } else {
          return (
            data.data.translation.find((item) => item.language === language)
              ?.content || null
          );
        }
      });
      setEditorKey((prev) => prev + 1);
    }
  }, [language]);

  usePageTitle("Quản lý about | Admin | Joya");

  return (
    <AdminLayout>
      <StatusBar title="Quản lý about">
        <button onClick={submitHandler} className="btn btn-primary">
          Update
        </button>
      </StatusBar>
      <div className={styles.container}>
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="vi">Tiếng Việt</option>
          <option value="en">Tiếng Anh</option>
        </select>

        {data && !isLoading && (
          <Editor
            key={editorKey}
            placeholder="Nhập nội dung..."
            initialValue={content}
            onChange={changeHandler}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default AboutManager;
