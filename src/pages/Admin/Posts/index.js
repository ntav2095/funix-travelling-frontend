import { useEffect, useState } from "react";
import AdminLayout from "../../../layout/AdminLayout/index";
import { postsApi } from "../../../services/apis";
import useAxios from "../../../hooks/useAxios";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import classes from "./posts.module.css";

function Posts() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [fetchPost, isFetching, postsData, fetchingError] = useAxios();
  const [page, setPage] = useState(1);

  const deletePost = async (e, Id) => {
    await sendRequest(postsApi.delete(Id));
    await sendRequest(postsApi.get());
  };

  useEffect(() => {
    fetchPost(postsApi.get());
  }, [page]);

  console.log(postsData);

  return (
    <AdminLayout
      title="Danh sách các bài viết"
      path="/admin/new-posts"
      text="New Posts"
    >
      <div className={classes.posts}>
        {postsData && postsData.data && postsData.data.length > 0 && (
          <table className={classes.table}>
            <thead>
              <tr>
                <td>
                  <div>STT</div>
                </td>
                <td style={{ width: "70%" }}>
                  <div>Title</div>
                </td>
                <td>
                  <div></div>
                </td>
              </tr>
            </thead>

            <tbody>
              {postsData.data.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>
                    <Link to={`/admin/edit-posts/${item._id}`}>
                      <Button variant="warning">Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={(event) => deletePost(event, item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {postsData && postsData.data && postsData.data.length === 0 && (
          <h2>No articles</h2>
        )}
      </div>
    </AdminLayout>
  );
}

export default Posts;
