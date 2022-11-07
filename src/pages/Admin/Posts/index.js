import classes from './posts.module.css'
import AdminLayout from '../../../layout/AdminLayout/index'
import { postsApi } from '../../../services/apis'
import useAxios from '../../../hooks/useAxios'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function Posts() {
    const [sendRequest, isLoading, data, error]=useAxios()

    const deletePost=(authorId)=>{
        sendRequest(postsApi.delete(authorId))
    }



    useEffect(() => {
    sendRequest(postsApi.get())
    }, [])

    return(
        <AdminLayout>
            <div className={classes.posts}>
            {data && data.items.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <td>
                        <div>STT</div>
                        </td>
                        <td>
                        <div>Title</div>
                        </td>
                        <td>
                        <div></div>
                        </td>
                    </tr>
                    </thead>

                    <tbody>
                    {data.items.map((item,index) => (
                        <tr key={item.authorId}>
                        <td>{index}</td>
                        <td>{item.title}</td>
                        <td>
                            <Link to={`/admin/edit-posts/${item.authorId}`}><Button>Edit</Button></Link>
                            <Button onClick={()=>deletePost(item.authorId)}>Delete</Button>
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