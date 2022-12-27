import React from "react";
import styles from "./hearder.module.css";

import i18next from "i18next";
import { nhanVien } from "../../../assets/images";
function HearderVisa({content,image}) {
  return (
    <div className={styles.hearder}>
      <div className={styles.container}>
        <div className={styles.container__content}>
          <div className={styles.content}>
            {content}
            <h1>DỊCH VỤ VISA CHUYÊN NGHIỆP</h1>
            <p>
              Trải qua gần 10 năm tích lũy kinh nghiệm, JOYA Tín thấu hiểu được
              những khó khăn mà Quý khách thường gặp phải khi nộp các thủ tục
              tại cơ quan nhà nước. Với đội ngũ hơn 120 nhân viên chuyên nghiệp,
              tư vấn tận tình, cùng với mối quan hệ tốt đẹp với các Sở ban
              ngành, chúng tôi tự tin cung cấp đến Quý Khách hàng các dịch vụ
              trọn gói, lấy nhanh và cam kết giao đúng hạn. Đặc biệt, JOYA Uy
              Tín chuyên xử lý các hồ sơ khó, hồ sơ cần gấp với chi phí cực kỳ
              ưu đãi.
            </p>
          </div>
          <div className={styles.image}>
            <img src={image ? image : nhanVien} />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
export default HearderVisa;
