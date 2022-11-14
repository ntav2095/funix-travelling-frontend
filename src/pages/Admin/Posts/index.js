import classes from './posts.module.css'
import AdminLayout from '../../../layout/AdminLayout/index'
import { postsApi } from '../../../services/apis'
import useAxios from '../../../hooks/useAxios'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Posts() {
    const [sendRequest, isLoading, data, error]=useAxios()
    const deletePost= async (e,Id)=>{
        await sendRequest(postsApi.delete(Id))
        await sendRequest(postsApi.get())
    }

    return(
        <AdminLayout
            title='Danh sách các bài viết'
            path='/admin/new-posts'
            text='New Posts'
        >
            <div className={classes.posts}>
                
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
            </div>
        </AdminLayout>
    )

}

export default Posts