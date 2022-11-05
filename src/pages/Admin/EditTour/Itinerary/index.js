// main
import { useRef, useState } from "react";
import Quill from "quill";

// css
import "./Initerary.css";
import { useEffect } from "react";

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

  //   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ align: [] }],

  ["image", "clean"], // remove formatting button
];

function Initerary() {
  const [files, setFiles] = useState([]);

  const quill = useRef();
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],

      handlers: {
        image: async function () {
          const editor = this.quill;
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.addEventListener("change", (e) => {
            const url = URL.createObjectURL(e.target.files[0]);
            const range = editor.getSelection(true);
            console.log(url.slice(5));
            console.log(url);
            const Image = Quill.import("formats/image");
            Image.sanitize = (url) => url;

            editor.insertEmbed(range.index, "image", url);
            editor.setSelection(range.index + 1);
            setFiles((prev) => [...prev, url]);
          });
        },
      },
    },
  };

  const quillHandler = () => {
    const x = quill.current.root.innerHTML;
    var delta = quill.current.getContents();
    console.log(delta);
    console.log(files);
  };

  useEffect(() => {
    quill.current = new Quill("#editor", {
      modules: modules,
      theme: "snow",
    });
  }, []);

  return (
    <div className="admin__initerary">
      <button type="button" onClick={quillHandler}>
        xxxxxxxxx
      </button>

      <div id="editor"></div>
      <img src="" alt="" id="hehe" />
    </div>
  );
}

export default Initerary;
