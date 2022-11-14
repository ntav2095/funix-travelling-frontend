import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import useAxios from "../../../../hooks/useAxios";
import AdminLayout from "../../../../layout/AdminLayout";
import style from "./newPost.module.css";
import { postsApi } from "../../../../services/apis";
import { useNavigate } from "react-router-dom";
import Quill from "quill";

const toolbarContainer = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image"],
  ["clean"],
];

const modules = {
  toolbar: toolbarContainer,
};

function NewPosts() {
  const [language, setLanguage] = useState("vie");
  const navigation = useNavigate();
  const quill = useRef();
  const editorRef = useRef();
  const title = useRef();
  const [sendRequest, isLoading, data, error] = useAxios();

  const hanldleSubmit = async () => {
    await sendRequest(
      postsApi.add({
        title: title.current.value,
        content: JSON.stringify(quill.current.getContents()),
        language,
      })
    );
  };

  useEffect(() => {
    if (data) {
      alert(data.message.vi);
      navigation("/admin/posts");
    }
  }, [data]);

  useEffect(() => {
    quill.current = new Quill(editorRef.current, {
      modules: modules,
      theme: "snow",
      placeholder: "Thêm đoạn văn ở đây...",
    });
  }, []);

  return (
    <AdminLayout>
      <div className={style.newposts}>
        <h1>New Posts</h1>
        <label>
          <p>Ngôn ngữ</p>
          <select
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="vie">Tiếng Việt</option>
            <option value="eng">English</option>
          </select>
        </label>
        <label>Tiêu đề bài viết</label>
        <input type="text" placeholder="Title" ref={title} required></input>
        <label>Nội dung bài viết</label>
        <div className="addItinerary-editor" ref={editorRef}></div>
        <Button onClick={hanldleSubmit}>Submit</Button>
      </div>
    </AdminLayout>
  );
}

export default NewPosts;
