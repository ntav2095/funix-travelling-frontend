import { Row, Col } from "react-bootstrap";

// css
import styles from "./Welcome.module.css";

function Welcome() {
  return (
    <div className={styles.welcome}>
      <div>
        <h2>Hãy chọn Travel Go</h2>
        <p className="mini">
          1.000 lý do tại sao bạn nên chọn đến với chung tôi Travel Go, có 1 thế
          giới tuyệt đẹp quanh ta hãy đến với chúng tôi.
        </p>
        <p className="large">
          Với hơn 16 năm kinh nghiệm tổ chức và triển khai các tour du lịch
          trong và ngoài nước, chúng tôi cam kết đem lại cho khách hàng những
          hành trình tuyệt vời và ấn tượng nhất thông qua những dịch vụ chuyên
          nghiệp mà chúng tôi thực hiện như:
        </p>

        <div className={styles.advantages}>
          <p>
            <i className="fa fa-fighter-jet"></i> Chuyến bay đẳng cấp
          </p>
          <p>
            <i className="fa fa-university"></i> Khách sạn tiện nghi
          </p>

          <p>
            <i className="fa fa-ship"></i> Hành trình hấp dẫn
          </p>
          <p>
            <i className="fa fa-check"></i> Chất lượng đỉnh cao
          </p>

          <p>
            <i className="fa fa-history"></i> Quản lý chặt chẽ
          </p>
          <p>
            <i className="fa fa-globe"></i> Hơn 100 tours quốc tế
          </p>
        </div>
      </div>

      <div className={styles.image}>
        <img
          width="590"
          height="477"
          src="asscets/img/about.png"
          data-src="https://dulich4.dichvuweb.biz/wp-content/uploads/2018/12/about.png"
          className="lazy-load attachment-large size-large"
          alt=""
          loading="lazy"
          srcSet=""
          data-srcset="https://dulich4.dichvuweb.biz/wp-content/uploads/2018/12/about.png 590w, https://dulich4.dichvuweb.biz/wp-content/uploads/2018/12/about-510x412.png 510w, https://dulich4.dichvuweb.biz/wp-content/uploads/2018/12/about-495x400.png 495w"
          sizes="(max-width: 590px) 100vw, 590px"
        />
      </div>
    </div>
  );
}

export default Welcome;
