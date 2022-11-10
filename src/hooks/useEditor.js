import Quill from "quill";
import { useState, useEffect, useRef } from "react";

const toolbarContainer = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image"],
  ["clean"],
];

const modules = {
  toolbar: {
    container: toolbarContainer,
  },
};

function useEditor(ref, placeholder) {
  const quill = useRef();

  const clearQuill = () => {
    quill.current.setContents([{ insert: "\n" }]);
  };

  const setQuillContent = (delta) => {
    quill.current.setContents(delta);
  };

  useEffect(() => {
    if (quill.current) {
      return;
    }

    if (ref.current) {
      quill.current = new Quill(ref.current, {
        modules: modules,
        theme: "snow",
        placeholder: placeholder || "Thêm đoạn văn ở đây...",
      });

      document
        .querySelector(".ql-toolbar")
        .addEventListener("click", function (e) {
          e.stopPropagation();
        });
    }
  }, [ref.current]);

  return [quill, setQuillContent, clearQuill];
}

export default useEditor;
