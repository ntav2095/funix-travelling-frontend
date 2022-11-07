import { useRef, useState, useEffect, useCallback } from "react";

import useEditor from "../../../../hooks/useEditor";
import "./Paragraph.css";

function Paragraph({ onChange, type, id, content }) {
  const editorRef = useRef();
  const [quill, files, clearQuill] = useEditor(editorRef);

  useEffect(() => {
    quill.current.setContents(content, "api");
    quill.current.on("text-change", () => {
      onChange(type, id, { delta: quill.current.getContents(), files: files });
    });
  }, [files]);

  useEffect(() => {
    onChange(type, id, { delta: quill.current.getContents(), files: files });
  }, [files]);

  return <div className="addItinerary-editor" ref={editorRef}></div>;
}

export default Paragraph;
