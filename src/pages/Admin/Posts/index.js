import { useEffect, useState } from "react";
import AdminLayout from "../../../layout/AdminLayout/index";
import { postsApi, adminApis } from "../../../services/apis";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router-dom";
import styles from "./posts.module.css";
import Pagination from "../../../containers/Pagination";
import SpinnerModal from "../../../components/SpinnerModal";
import ErrorMessage from "../../../components/ErrorMessage";
import usePageTitle from "../../../hooks/usePageTitle";
import "./override.css";
import StatusBar from "../../../layout/AdminLayout/StatusBar";
import ArticlesFilter from "./ArticlesFilter";

const checkCircle = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

const checkMark = <span className={styles.checkSVG}>{checkCircle}</span>;

const PAGE_SIZE = 6;

function Posts() {
  const [sendRequest, isLoading, deleted, error] = useAxios();
  const [fetchPost, isFetching, postsData, fetchingError] = useAxios();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    category: "all",
    search: "",
    banner: "",
  });

  const deletePost = async (e, Id) => {
    await sendRequest(adminApis.article.delete(Id));
  };

  useEffect(() => {
    const reqQueries = { page, page_size: PAGE_SIZE };
    if (filter.category !== "all") {
      reqQueries.cat = filter.category;
    }

    if (filter.search.trim()) {
      reqQueries.search = filter.search.trim();
    }

    if (filter.banner) {
      reqQueries.banner = filter.banner;
    }

    fetchPost(postsApi.get(reqQueries));
  }, [page, deleted, filter]);

  useEffect(() => {
    if (error) {
      alert(`Có lỗi xảy ra khi xóa bài viết: ${error.message}`);
    }
  }, [error]);

  useEffect(() => {
    if (deleted) {
      alert(`Xóa thành công.`);
    }
  }, [deleted]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  usePageTitle("Danh sách bài viết | Admin | Travel Funix");

  const categoryDisplayer = (category) => {
    let textArr = [];
    if (category.includes("diem-den")) {
      textArr.push("Điểm đến hấp dẫn");
    }

    if (category.includes("cam-nang")) {
      textArr.push("Cẩm nang du lịch");
    }

    if (category.includes("trai-nghiem")) {
      textArr.push("Trải nghiệm");
    }

    if (category.includes("nhat-ky")) {
      textArr.push("Nhật ký hành trình");
    }

    return textArr.join(" - ");
  };

  return (
    <>
      <SpinnerModal show={isLoading || isFetching} />
      <AdminLayout>
        <StatusBar title="Guides">
          <Link to="/admin/new-posts" className="btn btn-sm btn-primary">
            Tạo bài viết mới
          </Link>
        </StatusBar>

        <div className={styles.posts}>
          <ArticlesFilter setFilter={setFilter} filter={filter} />

          {postsData && postsData.data && postsData.data.length > 0 && (
            <>
              <table className="table table-bordered">
                <thead className="bg-dark text-light">
                  <tr>
                    <th rowSpan={2}>
                      <div>STT</div>
                    </th>
                    <th rowSpan={2}>
                      <div>ID</div>
                    </th>
                    <th rowSpan={2} style={{ width: "70%" }}>
                      <div>Tiêu đề</div>
                    </th>
                    <th rowSpan={2} style={{ width: "70%" }}>
                      <div>Danh mục</div>
                    </th>
                    <th colSpan={5}>
                      <div>Banner</div>
                    </th>
                    <th rowSpan={2}>
                      <div>Hành động</div>
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <div>Guides</div>
                    </th>
                    <th>
                      <div>Cẩm nang</div>
                    </th>
                    <th>
                      <div>Nhật ký</div>
                    </th>
                    <th>
                      <div>Điểm đến</div>
                    </th>
                    <th>
                      <div>Trải nghiệm</div>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-light">
                  {postsData.data.map((item, index) => (
                    <tr key={item._id}>
                      <td>
                        <div>{(page - 1) * PAGE_SIZE + index + 1}</div>
                      </td>
                      <td>
                        <div>{item._id}</div>
                      </td>
                      <td>
                        <div>{item.title}</div>
                      </td>
                      <td>
                        <div>{categoryDisplayer(item.category)}</div>
                      </td>
                      <td>
                        <div>{item.layout.includes("guides") && checkMark}</div>
                      </td>
                      <td>
                        <div>
                          {item.layout.includes("cam-nang") && checkMark}
                        </div>
                      </td>
                      <td>
                        <div>
                          {item.layout.includes("nhat-ky") && checkMark}
                        </div>
                      </td>
                      <td>
                        <div>
                          {item.layout.includes("diem-den") && checkMark}
                        </div>
                      </td>
                      <td>
                        <div>
                          {item.layout.includes("trai-nghiem") && checkMark}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-nowrap">
                          <Link
                            className="btn btn-warning me-2"
                            to={`/admin/edit-posts/${item._id}`}
                          >
                            Sửa
                          </Link>
                          <button
                            className="btn btn-danger me-2"
                            onClick={(event) => deletePost(event, item._id)}
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                bgGreen
                current={page}
                pageSize={PAGE_SIZE}
                total={postsData.metadata.total_count}
                onChange={(current) => {
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
