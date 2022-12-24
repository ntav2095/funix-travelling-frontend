import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// components
import AdminLayout from "../../../layout/AdminLayout/index";
import Pagination from "../../../containers/Pagination";
import SpinnerModal from "../../../components/SpinnerModal";
import ErrorMessage from "../../../components/ErrorMessage";
import StatusBar from "../../../layout/AdminLayout/StatusBar";
import ArticlesFilter from "./ArticlesFilter";
import NotifyModal from "../../../components/NotifyModal";

// apis
import { articleApis } from "../../../services/apis/admin.apis";
import useAxios from "../../../hooks/useAxios";

// other
import usePageTitle from "../../../hooks/usePageTitle";
import * as svg from "../../../assets/svgs";

// css
import styles from "./Articles.module.css";
import "./Articles.override.css";

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

const checkMark = <span className={styles.checkSVG}>{svg.checkCircle}</span>;

const PAGE_SIZE = 6;

function Articles() {
  const [sendDelete, deleting, deleted, deleteError, resetDelete] = useAxios();
  const [fetchArticles, isFetching, data, fetchingError] = useAxios();
  const [confirmDelete, setConfirmDelete] = useState(null); // null | { articleId }
  const [filter, setFilter] = useState({
    category: "",
    search: "",
    banner: "",
    page: 1,
  });

  const query = { page: filter.page, page_size: PAGE_SIZE };
  if (filter.category) {
    query.cat = filter.category;
  }

  if (filter.search.trim()) {
    query.search = filter.search.trim();
  }

  if (filter.banner) {
    query.banner = filter.banner;
  }

  useEffect(() => {
    fetchArticles(articleApis.get(query));
  }, [filter]);

  useEffect(() => {
    if (deleted || deleteError) {
      fetchArticles(articleApis.get(query));
    }
  }, [deleted, deleteError]);

  // nếu xóa tour xong mà bị tụt 1 trang
  useEffect(() => {
    if (data && deleted) {
      if (data.metadata.page_count < filter.page) {
        setFilter((prev) => ({ ...prev, page: data.metadata.page_count }));
      }
    }
  }, [data, filter, deleted]);

  usePageTitle("Danh sách bài viết | Admin | Travel Funix");

  // handle notification modal
  let notify = {};
  if (confirmDelete) {
    notify = {
      show: confirmDelete,
      type: "normal",
      message: `Bạn có chắc muốn xóa bài viết ${confirmDelete.articleId} không?`,
      leftBtn: {
        text: "Có",
        component: "button",
        cb: () => {
          sendDelete(articleApis.delete(confirmDelete.articleId));
          setConfirmDelete(null);
        },
      },
      rightBtn: {
        text: "Không",
        component: "button",
        cb: () => {
          setConfirmDelete(null);
        },
      },
    };
  }

  if (deleted) {
    notify = {
      show: deleted,
      type: "success",
      message: `Xóa thành công`,
      btn: {
        text: "OK",
        cb: () => {
          resetDelete();
        },
        component: "button",
      },
      onHide: () => {
        resetDelete();
      },
      time: 2000,
    };
  }

  if (deleteError) {
    notify = {
      show: deleteError,
      type: "error",
      message: deleteError.message,
      btn: {
        text: "OK",
        cb: () => {
          resetDelete();
        },
        component: "button",
      },
      onHide: () => {
        resetDelete();
      },
    };
  }

  return (
    <>
      <NotifyModal {...notify} />

      <SpinnerModal show={deleting || isFetching} />

      <AdminLayout>
        <StatusBar title="Guides">
          <Link to="/admin/new-article" className="btn btn-sm btn-primary">
            Tạo bài viết mới
          </Link>
        </StatusBar>

        <div className={styles.posts}>
          <ArticlesFilter setFilter={setFilter} filter={filter} />

          {data && data.data && data.data.length > 0 && (
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
                  {data.data.map((item, index) => (
                    <tr key={item._id}>
                      <td>
                        <div>{(filter.page - 1) * PAGE_SIZE + index + 1}</div>
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
                            to={`/admin/edit-article/${item._id}`}
                          >
                            Sửa
                          </Link>
                          <button
                            className="btn btn-danger me-2"
                            onClick={() =>
                              setConfirmDelete({ articleId: item._id })
                            }
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
                current={filter.page}
                pageSize={PAGE_SIZE}
                total={data.metadata.total_count}
                onChange={(current) => {
                  setFilter((prev) => ({ ...prev, page: current }));
                }}
              />
            </>
          )}

          {data && data.data && data.data.length === 0 && <h2>No articles</h2>}

          {fetchingError && <ErrorMessage msg={fetchingError.message} />}
        </div>
      </AdminLayout>
    </>
  );
}

export default Articles;
