import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import useAxios from "../../../../hooks/useAxios";
import AdminLayout from "../../../../layout/AdminLayout";
import style from "./newPost.module.css";
import { adminApis } from "../../../../services/apis";
import Editor from "../../../../containers/Editor";

function NewPosts() {
  const [content, setContent] = useState(null);
  const [sendRequest, isLoading, data, error] = useAxios();

  const titleRef = useRef();
  const authorRef = useRef();
  const originRef = useRef();
  const leadRef = useRef();
  const thumbRef = useRef();

  const hanldleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("author", authorRef.current.value);
    formData.append("origin", originRef.current.value);
    formData.append("lead", leadRef.current.value);
    formData.append("content", JSON.stringify(content));
    formData.append("image", thumbRef.current.files[0]);
    await sendRequest(adminApis.article.add(formData));
  };

  useEffect(() => {
    if (data) {
      alert("Thành công");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert("Thất bại");
    }
  }, [error]);

  return (
    <AdminLayout>
      <div className={style.newpost}>
        <h1>New Post</h1>
        <p>Ngôn ngữ mặc định: Tiếng Việt</p>

        <input type="text" placeholder="Tiêu đề" ref={titleRef} required />
        <input type="text" placeholder="Tác giả" ref={authorRef} required />
        <input type="text" placeholder="Nguồn" ref={originRef} />
        <input type="text" placeholder="Mở đầu" ref={leadRef} />
        <Editor
          placeholder="Nội dung"
          onChange={(delta) => setContent(delta)}
        />

        <input type="file" ref={thumbRef} />

        <label>Nội dung bài viết</label>
        <Button onClick={hanldleSubmit}>Submit</Button>
      </div>
    </AdminLayout>
  );
}

export default NewPosts;
