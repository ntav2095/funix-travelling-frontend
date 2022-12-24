// main
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// components
import AdminLayout from "../../../../layout/AdminLayout";
import SpinnerModal from "../../../../components/SpinnerModal";
import StatusBar from "../../../../layout/AdminLayout/StatusBar";
import RatingModal from "./RatingModal";

// apis
import useAxios from "../../../../hooks/useAxios";
import { tourApis } from "../../../../services/apis/admin.apis";

// css
import styles from "./Rating.module.css";

function Rating() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [goDelete, isDeleting, deleted, deletingError] = useAxios();
  const [modal, setModal] = useState({
    isShow: false,
    mode: "create", // create | edit
    ratingId: "",
  });
  const { tourId } = useParams();

  const tour = data ? data.data : null;
  const ratingItems = tour ? tour.rating : [];

  const deleteRatingItemHandler = (ratingId) => {
    goDelete(tourApis.deleteRatingItem({ tourId: tour?._id, ratingId }));
  };

  const fetchTour = () => {
    sendRequest(tourApis.getSingle(tourId));
  };

  useEffect(() => {
    fetchTour();
  }, [tourId, deleted]);

  let average =
    ratingItems.length > 0
      ? ratingItems.reduce((p, c) => p + c.stars, 0) / ratingItems.length
      : 0;

  if (average > Math.floor(average) && average <= Math.floor(average) + 0.5) {
    average = Math.floor(average) + 0.5;
  }

  if (average > Math.floor(average) + 0.5 && average <= Math.ceil(average)) {
    average = Math.ceil(average);
  }

  return (
    <>
      <SpinnerModal show={isLoading || isDeleting} />

      <AdminLayout>
        <StatusBar title={`Đánh giá tour: ${data?.data.code || ""}`}>
          <button
            onClick={() =>
              setModal({
                isShow: true,
                mode: "create",
                ratingId: "",
              })
            }
            className="btn btn-primary btn-sm"
            to="/admin/new-tour"
          >
            Thêm đánh giá
          </button>
        </StatusBar>

        {/* {fetchingCatError && <ErrorMessage msg={fetchingCatError.message} />} */}

        <div className={styles.container}>
          {data && ratingItems.length === 0 && (
            <h5>Hiện không có đánh giá nào</h5>
          )}

          {data && ratingItems.length > 0 && (
            <>
              <h5>Điểm trung bình: {average}</h5>

              <table className="table table-bordered bg-light">
                <thead className="bg-dark text-light text-center">
                  <tr>
                    <th>
                      <div>STT</div>
                    </th>
                    <th>
                      <div>ID</div>
                    </th>
                    <th>
                      <div>Tên</div>
                    </th>
                    <th>
                      <div>Số sao</div>
                    </th>
                    <th>
                      <div>Nội dung</div>
                    </th>
                    <th>
                      <div>Actions</div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {ratingItems
                    .sort((a, b) => a.stars - b.stars)
                    .map((item, index) => (
                      <tr key={item._id}>
                        <td>
                          <div className="text-center">{index + 1}</div>
                        </td>
                        <td>
                          <div>{item._id}</div>
                        </td>
                        <td>
                          <div>{item.name}</div>
                        </td>
                        <td>
                          <div>{item.stars}</div>
                        </td>
                        <td>
                          <div>{item.content}</div>
                        </td>
                        <td>
                          <div>
                            <button
                              onClick={() =>
                                setModal({
                                  isShow: true,
                                  ratingId: item._id,
                                  mode: "edit",
                                })
                              }
                              className="btn btn-warning mx-1"
                            >
                              Sửa
                            </button>
                            <button
                              onClick={() => deleteRatingItemHandler(item._id)}
                              className="btn btn-danger mx-1"
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </AdminLayout>

      {data && (
        <RatingModal
          show={modal.isShow}
          onHide={() =>
            setModal({
              isShow: false,
              ratingId: "",
              mode: "",
            })
          }
          mode={modal.mode}
          ratingId={modal.ratingId}
          tour={data.data}
          fetchTour={fetchTour}
        />
      )}
    </>
  );
}

export default Rating;
