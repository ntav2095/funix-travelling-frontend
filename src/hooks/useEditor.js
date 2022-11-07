import Quill from "quill";
import { useState, useEffect, useRef } from "react";

const toolbarContainer = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image"],
  ["clean"],
];

function useEditor(ref) {
  const [files, setFiles] = useState([]);
  const quill = useRef();

  const modules = {
    toolbar: {
      container: toolbarContainer,

      handlers: {
        image: async function () {
          const editor = this.quill;
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.addEventListener("change", (e) => {
            const url = URL.createObjectURL(e.target.files[0]);
            setFiles((prev) => [...prev, { url, file: e.target.files[0] }]);
            const range = editor.getSelection(true);
            const Image = Quill.import("formats/image");
            Image.sanitize = (url) => url;
            editor.insertEmbed(range.index, "image", url);
            editor.setSelection(range.index + 1);
          });
        },
      },
    },
  };

  const clearQuill = () => {
    setFiles([]);
    quill.current.setContents([{ insert: "\n" }]);
  };

  useEffect(() => {
    quill.current = new Quill(ref.current, {
      modules: modules,
      theme: "snow",
      placeholder: "Thêm đoạn văn ở đây...",
    });
  }, []);

  return [quill, files, clearQuill];
}

export default useEditor;
