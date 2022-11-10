import axios from "axios";
import { useRef } from "react";
import { phoneNumber } from "../../assets/images";
import styles from "./ContactTable.module.css";

function ContactTable({ primary }) {
  const phone=useRef()
  let classes = styles.contact;
  if (primary) {
    classes += " " + styles.primary;
  }
  const handleClick= async(e)=>{
    if(phone.current.value){
      const form =new FormData()
      form.append('title','Gọi lại ngay')
      form.append('phone',phone.current.value)
      await axios.post('https://formspree.io/f/mgeqpdao',form)
    .then(d=>d.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  }
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

      <input type="number" placeholder="Số điện thoại của tôi là" ref={phone} minLength='9' required />

      <button onClick={handleClick}>YÊU CẦU GỌI LẠI</button>
    </div>
  );
}

export default ContactTable;
