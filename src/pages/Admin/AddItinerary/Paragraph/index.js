import { useRef, useState, useEffect, useCallback } from "react";

import useEditor from "../../../../hooks/useEditor";

function Paragraph({ onChange, type, id, isSubmit, onSubmit }) {
  const editorRef = useRef();
  const [quill, files, clearQuill] = useEditor(editorRef);

  useEffect(() => {
    if (isSubmit > 0) {
      onSubmit(type, id, { delta: quill.current.getContents(), files: files });
    }
  }, [isSubmit, files, id, quill, type, onSubmit]);

  return <div ref={editorRef}></div>;
}

export default Paragraph;
