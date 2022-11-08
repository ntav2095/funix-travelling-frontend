import {  useEffect, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import useAxios from "../../../../hooks/useAxios"
import useEditor from "../../../../hooks/useEditor"
import AdminLayout from "../../../../layout/AdminLayout"

import { v4 as uuid } from "uuid";

import style from './newPost.module.css'
import { postsApi } from "../../../../services/apis"
import { useNavigate } from "react-router-dom"
import axios from "axios"


function NewPosts(){
    const navigation=useNavigate()
    const editorRef = useRef();
    const title=useRef()
    const [sendRequest, isLoading, data, error]=useAxios()
    const [state,setState]=useState({}) 
    const [images,setImages]=useState({}) 
    const [quill, files, clearQuill] = useEditor(editorRef);
    

    
    console.log(state,images)
    const hanldleSubmit= async ()=>{
      try {
        let text = JSON.stringify(state);
        let imgCurrent = images.files?images.files.filter((item) => text.includes(item.url)):[];
        if(imgCurrent.length>0){
        const promises = imgCurrent.map((item) => {
          const formData = new FormData();
          formData.append("image", item.file);
          return axios("http://localhost:5000/api/file/single", {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: formData,
            method: "POST",
          });
        });
        const serverUrls = await Promise.all(promises);
        console.log(serverUrls,images.files)
        let urls = serverUrls.map((item, index) => ({
          newUrl: item.data,
          oldUrl: images.files[index].url,
        }));
        urls.forEach((item) => {
          text = text.replace(item.oldUrl, item.newUrl);
        });
      }
        // const content=JSON.parse(text)
        console.log(text,typeof text)
        // const formdata= new FormData()
        // formdata.append('title',title.current.value)
        // formdata.append('authorId',uuid())
        // formdata.append('content',content)

        sendRequest(
          postsApi.add({
            title:title.current.value,
            content:text
          })
          );
          
          
        } catch (error) {
          console.log(error)
        }
        setTimeout(() => {
          navigation('/admin/posts')
        }, 1000);
        }

 

    useEffect(() => {
        quill.current.on("text-change", () => {
        setImages({...images,files:files})
        setState({...state, delta: quill.current.getContents()});
        });
      }, [files]);
  

return(
    <AdminLayout>
        <div className={style.newposts}>
            <h1>New Posts</h1>
            <label>Tiêu đề bài viết</label>
            <input type='text' placeholder="Title" ref={title} required></input>
            <label>Nội dung bài viết</label>
            <div className="addItinerary-editor" ref={editorRef}></div>
            <Button onClick={hanldleSubmit}>Submit</Button>
        </div>
    </AdminLayout>
)
}

export default NewPosts
