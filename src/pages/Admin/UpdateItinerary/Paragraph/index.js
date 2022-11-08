import { useRef, useEffect } from "react";
import Quill from "quill";

import "./Paragraph.css";

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

function Paragraph({ onChange, id, content }) {
  const editorRef = useRef();
  const quill = useRef();

  useEffect(() => {
    quill.current = new Quill(editorRef.current, {
      modules: modules,
      theme: "snow",
      placeholder: "Thêm đoạn văn ở đây...",
    });
    quill.current.setContents(content, "api");
    quill.current.on("text-change", () => {
      onChange(id, quill.current.getContents());
    });
  }, []);

  return <div className="addItinerary-editor" ref={editorRef}></div>;
}

export default Paragraph;
