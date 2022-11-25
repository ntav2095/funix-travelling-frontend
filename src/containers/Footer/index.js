import styles from "./Footer.module.css";

export default function Footer() {
  
 
  return (
    <div className={styles.footer}>
      <div className="container-xl">
        <div className={styles.footer_colum + ' col-12 col-sm-6 col-md-6 col-lg-5'} >
          <div><li><span>CÔNG TY CỔ PHẦN JOYA</span></li></div>
          <li>Địa chỉ: Hoa Sữa 11-52 Vinhomes Riveside, Long Biên, Hà Nội.</li>
          <li>Điện thoại: 123456789 | Hotline : 123456789</li>
          <li>Email: info@joya.vn</li>
          <li>Website: joya.vn</li>
          <br/>
          <li>GIẤY PHÉP KINH DOANH DỊCH VỤ LỮ HÀNH QUỐC TẾ</li>
          <li>Số GP/No: 79-042/2022/TCDL-GP LHQT</li>
          <li>Do TCDL cấp ngày 30/10/2022</li>
        </div>
        <div className={styles.footer_colum + ' col-12 col-sm-6 col-md-6 col-lg-2'} >
          <div><li><span>DU LỊCH</span></li></div>
          <li>Du lịch châu Âu</li>
          <li>Du lịch trong nước</li>
          <li>Du lịch trong nước</li>
          <li>Guides</li>
          <li>Dịch vụ visa</li>
        </div>
        <div className={styles.footer_colum + ' col-12 col-sm-6 col-md-6 col-lg-3'} >
          <div><li><span>ĐIỀU KHOẢN</span></li></div>
          <li>Điều kiện đăng ký</li>
          <li>Điều kiện hủy đổi</li>
          <li>Thông tin cần lưu ý</li>
          <li>Phương thức thanh toán</li>
          <li>Bảo mật dữ liệu khách hàng</li>
        </div>
        <div className={styles.footer_colum + ' col-12 col-sm-6 col-md-6 col-lg-2 pe-1'} > 
          
            <div><li><span>LIÊN KẾT</span></li></div>
            <li><i class='fab fa-facebook'></i> Facebook</li>
            <li><i class='fab fa-instagram'></i> Instagram</li>
            <li><i class='fab fa-youtube'></i> Youtube</li>
          
          
          </div>
      </div>
      <div className="container-xl">
        <p className="m-0 p-1">Copyright Funix</p>
      </div>
    </div>
  );
}
