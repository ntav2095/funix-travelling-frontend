import quillGetHTML from "../../../services/helpers/quillGetHTML";
import { useEffect, useRef } from "react";
import "./QuillReader.css";
function QuillReader({ delta }) {
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.innerHTML = quillGetHTML(delta);
  }, []);
  return <div className="quillReader" ref={containerRef}></div>;
}

export default QuillReader;
