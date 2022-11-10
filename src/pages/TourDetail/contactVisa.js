import { Col, Row } from "react-bootstrap";


function ContactVisa() {
  

  return(
    <div className="background-contact">
      <Row>
      <div className=" col-12 col-sm-8 col-md-8 col-lg-8">
        <p className="contact-visa-title">Điền thông tin liên hệ</p>
        <form className="form-contact-visa">
          <label>Họ và tên</label>
          <input type='text' />
          <Row>
          <div className=" col-12 col-sm-7 col-md-7 col-lg-7">
          <label>Email</label>
          <input type='email' /></div>
          <div className=" col-12 col-sm-5 col-md-5 col-lg-5">
          <label>Số điện thoại</label>
          <input type='number'  /></div>
          </Row>
          <label>Địa chỉ liên hệ</label>
          <input type='text' />
          <label>Yêu cầu đặt biệt</label>
          <input type='text' />
          <button>Đặt Visa</button>
        </form>
      </div>
      <div className=" col-12 col-sm-4 col-md-4 col-lg-4">
        <p className="contact-visa-title">Thông tin đơn hàng</p>
        <div>
          <p>Xin Visa đi ý</p>
          <p>{'Visa Ý Du Lịch, Công Tác & thăm Thân(Người lớn)' }</p>
          <Row>
          <span> Ngày Nhập cảnh</span>
          <span>29/11/2022</span>
          </Row>
          <Row>
          <span> Số khách  x1</span>
          <span>5.800.000 VNĐ</span>
          </Row>
          <div className='border-top'>
          <Row>
          <span> Tổng tiền</span>
          <span>5.800.000 VNĐ</span>
          </Row>
          </div>
          <p>hoàn hủy miễn phí</p>
          <div>Gọi <strong>19003498</strong> để được hỗ trợ 24/7</div>
        </div>
      </div>
      </Row>
    </div>
  )
}
