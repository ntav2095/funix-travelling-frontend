// main
import { useRef, useState } from "react";
import Quill from "quill";
// css
import '../NewTour.css'
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

function Initerary(props) {
  console.log('props',props)
  const [files, setFiles] = useState([]);

  const quill = useRef();
  const day= useRef()
  const dayNumber= useRef()
  const dateSession=useRef()
  const dateTimeSession=useRef()

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
            setFiles((prev) => [...prev, {url,file:e.target.files[0]}]);
          });
        },
      },
    },
  };
 
  console.log('files',files)
  const addItinerary=()=>{
    console.log(files)
    props.file(files)
    props.quillContent({
      dayNumber:dayNumber.current.value,
      title:day.current.value,
      dateSession:dateSession.current.value,
      duration:dateTimeSession.current.value,
      content:quill.current.getContents().ops

    })
    
  }

  useEffect(() => {
    quill.current = new Quill("#editor", {
      modules: modules,
      theme: "snow",
    });
  }, []);

  return (
    <div className="admin__initerary">
      <label>
        <p className="newTour__label">Lộ trình Tour</p>
        <label >
          <p>Ngày</p>
        <input type='number' placeholder="Ngày 1: HÀ NỘI - PARIS"  ref={dayNumber} />
        </label>
        <label >
          <p>Title</p>
        <input type='text' placeholder="Ngày 1: HÀ NỘI - PARIS"  ref={day} />
        </label>
        <select placeholder="Buổi sáng"   ref={dateSession}>
          <option name='buổi sáng'> Buổi sáng</option>
          <option name='buổi trưa'> Buổi trưa</option>
          <option name='buổi tối'> Buổi tối</option>
          <option name='cả ngày'> Cả ngày</option>
        </select>
        <input type='text' placeholder="Thời gian Buổi sáng"   ref={dateTimeSession} />
      </label>
                  
      <div id="editor"></div>
      <img src="" alt="" id="hehe" />
      <button onClick={addItinerary}>add</button>
    </div>
  );
}

export default Initerary;
