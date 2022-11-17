import { useEffect, useState } from "react";
import AdminLayout from "../../../layout/AdminLayout/index";
import { postsApi, adminApis } from "../../../services/apis";
import useAxios from "../../../hooks/useAxios";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./posts.module.css";
import Pagination from "rc-pagination";
import SpinnerModal from "../../../components/SpinnerModal";
import ErrorMessage from "../../../components/ErrorMessage";
import "./override.css";

const PAGE_SIZE = 6;

function Posts() {
  const [sendRequest, isLoading, deleted, error] = useAxios();
  const [fetchPost, isFetching, postsData, fetchingError] = useAxios();
  const [page, setPage] = useState(1);

  const deletePost = async (e, Id) => {
    await sendRequest(adminApis.article.delete(Id));
  };

  useEffect(() => {
    if (
      postsData?.metadata.page_count === page &&
      postsData.data.length === 1
    ) {
      setPage(postsData.metadata.page_count - 1);
    } else {
      fetchPost(postsApi.get({ page: page, page_size: PAGE_SIZE }));
    }
  }, [page, deleted]);

  useEffect(() => {
    if (error) {
      alert(`Có lỗi xảy ra khi xóa bài viết: ${error.message}`);
    }
  }, [error]);

  return (
    <>
      <SpinnerModal show={isLoading} />
      <AdminLayout
        title="Danh sách các bài viết"
        path="/admin/new-posts"
        text="New Posts"
      >
        <div className={styles.posts}>
          {postsData && postsData.data && postsData.data.length > 0 && (
            <>
              <table className={styles.table}>
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
                      <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
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

              <Pagination
                className={styles.pagination + " toursPagination"}
                current={page}
                pageSize={PAGE_SIZE}
                total={postsData.metadata.total_count}
                onChange={(current, pageSize) => {
                  setPage(current);
                }}
              />
            </>
          )}

          {postsData && postsData.data && postsData.data.length === 0 && (
            <h2>No articles</h2>
          )}

          {fetchingError && <ErrorMessage msg={fetchingError.message} />}
        </div>
      </AdminLayout>
    </>
  );
}

export default Posts;
