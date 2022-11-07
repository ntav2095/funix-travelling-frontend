import { useCallback, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import useAxios from "../../../../hooks/useAxios"
import useEditor from "../../../../hooks/useEditor"
import AdminLayout from "../../../../layout/AdminLayout"
import Paragraph from "../../AddItinerary/Paragraph"
import { v4 as uuid } from "uuid";

import style from './newPost.module.css'


function NewPosts(){
    const [sendRequest, isLoading, data, error]=useAxios()
    const [isSubmit,setIsSubmit]=useState(0)
    const [state,setState]=useState('') 
    const title=useRef()
    const content=useCallback((type,id,content)=>{
        setState({id:uuid(),content})
    },[])
    console.log(state,isSubmit)
    if(state && isSubmit){
      setIsSubmit(prev=>prev -1)  
      
    }
    if(isSubmit&&state){
        try {
            


        } catch (error) {
            console.log(error)
        }
    }

return(
    <AdminLayout>
        <div className={style.newposts}>
            <h2>New Posts</h2>
            <label>Tiêu đề bài viết</label>
            <input type='text' placeholder="Title" ref={title}></input>
            <label>Nội dung bài viết</label>
            <Paragraph  
                id=''
                type={'cam nang'}
                isSubmit={isSubmit}
                onSubmit={content}/>
            <Button onClick={()=> setIsSubmit(prev=>prev+1)}>Submit</Button>
        </div>
    </AdminLayout>
)
}

export default NewPosts
