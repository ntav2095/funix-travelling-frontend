
// useEffect(()=>{
//     sendRequestPostsID(postsApi.getSingleArticle(PostsID));
// },[]) const {PostsID}=useParams()sendRequest(
        // postsApi.edit(formdata)
        // );

import {  useEffect, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import useAxios from "../../../../hooks/useAxios"
import AdminLayout from "../../../../layout/AdminLayout"
import style from './editposts.module.css'
import { postsApi } from "../../../../services/apis"
import { useNavigate, useParams } from "react-router-dom"
import  Quill  from "quill"

const toolbarContainer = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
];

const modules = {
    toolbar: toolbarContainer,
};

function NewPosts(){
    const navigation= useNavigate()
    const quill = useRef();
    const editorRef = useRef();
    const {postsId}=useParams()
    const [stateTitle,setStateTitle]=useState()
    const [sendRequest, isLoading, data, error]=useAxios()
    const [sendRequestPostsID, Loading, dataPostsID, errorPostsID]=useAxios()
console.log('PostsID',postsId)
console.log('dataPostsID',data)
    const hanldleSubmit= async () => {
       await sendRequest(
            postsApi.edit({
                postsId,
                title:stateTitle,
                content:JSON.stringify(quill.current.getContents())
            })
        );
       
        }

        const changeTitle=(e)=>{
           setStateTitle(e.target.value)
        }
    useEffect(()=>{
        sendRequestPostsID(postsApi.getSingleArticle(postsId));
    },[])

    useEffect(()=>{
        if(data){
            alert(data.message.vi)
            navigation('/admin/posts')
        }
    },[data])

    useEffect(() => {
        if(dataPostsID){ setStateTitle(dataPostsID.article.title)
        quill.current.setContents({ops:dataPostsID.article.content}, "api");}
    }, [dataPostsID])
    

    useEffect(() => {
        quill.current = new Quill(editorRef.current, {
        modules: modules,
        theme: "snow",
        placeholder: "Thêm đoạn văn ở đây...",
        });
        }, []);

return(
    <AdminLayout>
        <div className={style.newposts}>
            <h1>Chỉnh sửa bài viết {dataPostsID?dataPostsID.article.title:''}</h1>
            <label>Tiêu đề bài viết</label>
            <input type='text'  placeholder="Title" value={stateTitle} onChange={changeTitle} required></input>
            <label>Nội dung bài viết</label>
            <div className="addItinerary-editor" ref={editorRef}></div>
            <Button onClick={hanldleSubmit}>Submit</Button>
        </div>
    </AdminLayout>
)
}

export default NewPosts
