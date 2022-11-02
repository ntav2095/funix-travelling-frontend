import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import './modalBooking.css'
import { Row } from "react-bootstrap";

function BookingModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      
      <Modal.Body >
        <Form>
          <div className="form-tour">
            <p >THÔNG TIN TOUR</p>
            <input type="text"  />
                  
            <p>THÔNG TIN KHÁCH HÀNG</p>
            <div className="row">
              <div className=' large-4 '>
                <p className="form-label-input">Giới tính</p>
                <div classname='control-radio'>
                <input type="radio" name='radio' className="input"/>
                <span>Mr </span>
                <input type="radio" name='radio' className="input"/>
                <span>Mrs </span>
                <input type="radio" name='radio' className="input"/>
                <span>Miss </span>
              </div>
              </div>
              <div className=' large-4 col-md-4'>
                <p className="form-label-input">Họ tên</p>
                <input type="text" required />
              </div>
              <div className=' large-4 col-md-4'>
                <p className="form-label-input">Địa chỉ email</p>
                <input type="email" required />
              </div>
              <div className=' large-4 col-md-4'>
                <p className="form-label-input">Điện thoại</p>
                <input type="number" required />
              </div>
              <div className=' large-4 col-md-4'>
                <p className="form-label-input">Địa chỉ </p>
                <input type="text" required />
              </div>
              <div className=' large-4 col-md-4'>
                <p className="form-label-input">Thành phố</p>
                <input type="text" required />
              </div>
            </div>
            <p>THÔNG TIN ĐẶT TOUR</p>
            <div className='row'>
              <div className=' large-4 col-md-4'>
                <p className="form-label-input">Ngày khởi hành</p>
                <input type="date" required />
              </div>
              <div className=' large-4 col-md-4'>
                <p className="form-label-input">Số người lớn</p>
                <input type="number" required />
              </div>
              <div className=' large-4 col-md-4 '>
                <p className="form-label-input">Số trẻ em</p>
                <input type="number" required />
              </div>
              </div>
              <button type="submit" className="form-button">Đặt tour ngay</button>
          </div>
        </Form>
      </Modal.Body>
      <button title="Close (Esc)" onClick={props.onHide} type="button" class="mfp-close"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
    </Modal>
  );
}


export default BookingModal;
