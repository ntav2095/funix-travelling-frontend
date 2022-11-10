import classes from './posts.module.css'
import AdminLayout from '../../../layout/AdminLayout/index'
import { postsApi } from '../../../services/apis'
import useAxios from '../../../hooks/useAxios'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Posts() {
    const [sendRequest, isLoading, data, error]=useAxios()
    const navigation=useNavigate()
    const deletePost=(e,Id)=>{
        sendRequest(postsApi.delete(Id))
        // navigation('/')
    }

    useEffect(() => {
    sendRequest(postsApi.get())
    }, [])
    console.log('data',data)
    return(
        <AdminLayout>
            <div className={classes.posts}>
                <h1>Danh sách các bài viết</h1>
            {data && data.items&&data.items.length > 0 && (
                <table className={classes.table} >
                    <thead>
                    <tr>
                        <td>
                        <div>STT</div>
                        </td>
                        <td style={{width:'70%'}}>
                        <div>Title</div>
                        </td>
                        <td>
                        <div></div>
                        </td>
                    </tr>
                    </thead>

                    <tbody>
                    {data.items.map((item,index) => (
                        <tr key={item._id}>
                        <td>{index+1}</td>
                        <td>{item.title}</td>
                        <td>
                            <Link to={`/admin/edit-posts/${item._id}`}><Button variant="warning">Edit</Button></Link>
                            <Button variant="danger" onClick={(event)=>deletePost(event,item._id)}>Delete</Button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                )}
                <Link to={`/admin/new-posts`}><Button>New Posts</Button></Link>
            </div>
        </AdminLayout>
    )

}

export default Posts