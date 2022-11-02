import { phoneNumber } from "../../assets/images";
import styles from "./ContactTable.module.css";

function ContactTable({ primary }) {
  let classes = styles.contact;
  if (primary) {
    classes += " " + styles.primary;
  }
  return (
    <div className={classes}>
      <p className={styles.slogan}>Liên hệ càng sớm - Giá càng rẻ</p>
      <div className={styles.phoneNumber}>
        <img src={phoneNumber} alt="phone numbers" />
      </div>

      <p className={styles.alternative}>
        Hoặc để lại số điện thoại, chúng tôi sẽ gọi lại cho bạn sau ít phút !
      </p>

      <input type="number" placeholder="Số điện thoại của tôi là" />

      <button>YÊU CẦU GỌI LẠI</button>
    </div>
  );
}

export default ContactTable;
