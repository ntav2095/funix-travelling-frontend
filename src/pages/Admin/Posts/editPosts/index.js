import {  useEffect, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import useAxios from "../../../../hooks/useAxios"
import useEditor from "../../../../hooks/useEditor"
import AdminLayout from "../../../../layout/AdminLayout"

import { v4 as uuid } from "uuid";

import style from './editposts.module.css'
import { postsApi } from "../../../../services/apis"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"


function EditPosts(){
    const navigation=useNavigate()
    const editorRef = useRef();
    const title=useRef()
    const id=uuid()
    const {articleId}=useParams()
    const [sendRequest, isLoading, data, error]=useAxios()
    const [sendRequestArticleId, Loading, dataArticle, err]=useAxios()
    const [state,setState]=useState({}) 
    const [images,setImages]=useState({}) 
    const [quill, files, clearQuill] = useEditor(editorRef);
    

    console.log(dataArticle)
    console.log(state,images)
    const hanldleSubmit= async ()=>{
        console.log('id',id)
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
        let urls = serverUrls.map((item, index) => ({
          newUrl: item.data,
          oldUrl: images.files[index].url,
        }));
        urls.forEach((item) => {
          text = text.replace(item.oldUrl, item.newUrl);
        });
      }
      
      const formdata= new FormData()
      formdata.append('title',title.current.value)
      formdata.append('authorId',uuid())
      formdata.append('content',JSON.parse(text))
      sendRequest(
        postsApi.edit(formdata)
        );
        
          setTimeout(() => {
            navigation('/admin/posts')
          }, 1000);
          
        } catch (error) {
          console.log(error)
        }
          
        }
    useEffect(()=>{
        sendRequestArticleId(postsApi.getSingleArticle(articleId));
    },[])
    useEffect(() => {
        quill.current.on("text-change", () => {
        setImages({...images,files:files})
        setState({...state, delta: quill.current.getContents()});
        });
      }, [files]);
  
    useEffect(()=>{
        quill.current.setContents('content', "api")
        title.current.value='toan'
    },[dataArticle])
return(
    <AdminLayout>
        <div className={style.newposts}>
            <h1>Chỉnh sửa bài viết</h1>
            <label>Tiêu đề bài viết</label>
            <input type='text' placeholder="Title" ref={title} required></input>
            <label>Nội dung bài viết</label>
            <div className="addItinerary-editor" ref={editorRef}></div>
            <Button onClick={hanldleSubmit}>Submit</Button>
        </div>
    </AdminLayout>
)
}

export default EditPosts
