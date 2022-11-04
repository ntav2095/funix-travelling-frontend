// main
import { useRef } from "react";
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
  const quill = useRef();

  const quillHandler = () => {
    const x = quill.current.root.innerHTML;
    console.log(x);
  };

  useEffect(() => {
    quill.current = new Quill("#editor", {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    });
  }, []);
  return (
    <div className="admin__initerary">
      <button type="button" onClick={quillHandler}>
        xxxxxxxxx
      </button>
      <div id="editor"></div>
    </div>
  );
}

export default Initerary;
