// main
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// components
import ReviewModal from "./ReviewModal";
import Stars from "./Stars";

// assets
import {
  chatBubble,
  check,
  starOutline,
  starSolid,
  thumbUpOutline,
} from "../../../assets/svgs";

// css
import styles from "./ReviewTour.module.css";

const stats = [
  {
    rating: 5,
    count: 50,
  },
  {
    rating: 4,
    count: 10,
  },
  {
    rating: 3,
    count: 20,
  },
  {
    rating: 2,
    count: 20,
  },
  {
    rating: 1,
    count: 0,
  },
];

function ReviewTour({ tour }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className={styles.review}>
        <h2 className={styles.title}>Đánh giá {tour.name}</h2>

        <div className={styles.overview}>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <div className={styles.averageRating}>
                <p>Đánh giá trung bình</p>
                <p>3</p>
                <Stars stars={3} />
                <p>100 đánh giá</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <div className={styles.stats}>
                {stats.map((item) => (
                  <div key={item.rating} className={styles.statsItem}>
                    <span>{item.rating}</span>
                    {starSolid}
                    <div className={styles.bar}>
                      <div
                        style={{ width: `${item.count}%` }}
                        className={styles.barInner}
                      ></div>
                    </div>
                    <span>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12 col-md-4 mt-4 mt-md-0 d-flex align-items-center justify-content-center">
              <div className={styles.sendReview}>
                <p>Bạn đã dùng sản phẩm này?</p>
                <button onClick={() => setModalShow(true)}>Gửi đánh giá</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.filterBar}>
          <span>Lọc theo: </span>
          <button>{check} Có hình ảnh</button>
          <button>{check} 5 sao</button>
          <button>{check} 4 sao</button>
          <button>{check} 3 sao</button>
          <button className={styles.active}>{check} 2 sao</button>
          <button>{check} 1 sao</button>
        </div>

        <div className={styles.reviewItem}>
          <p className={styles.reviewUsername}>Thương</p>
          <Stars stars={2} />
          <p className={styles.reviewContent}>Ok tốt trong tầm giá</p>

          <div className={styles.reviewReactBtns}>
            <button>{thumbUpOutline} Hữu ích</button>
            <button>{chatBubble} Thảo luận</button>
          </div>
        </div>

        <div className={styles.reviewItem}>
          <p className={styles.reviewUsername}>Thương</p>
          <Stars stars={2} />
          <p className={styles.reviewContent}>Ok tốt trong tầm giá</p>

          <div className={styles.reviewReactBtns}>
            <button>{thumbUpOutline} Hữu ích</button>
            <button>{chatBubble} Thảo luận</button>
          </div>
        </div>

        {/* -------------------- pagination -----------------------  */}
        <div className={styles.pagination}>
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </div>
      </div>

      {/* -------------------- modal -----------------------  */}
      <ReviewModal
        tour={tour}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ReviewTour;
