import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./BookingModal.css";

function BookingModal(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tour = e.target[0].value;
    const maleFemale = e.target[1].checked
      ? "Mr"
      : e.target[2].checked
      ? "Mrs"
      : "Miss";
    const name = e.target[4].value;
    const email = e.target[5].value;
    const phone = e.target[6].value;
    const address = e.target[7].value;
    const city = e.target[8].value;
    const tourDate = e.target[9].value;
    const peoples = e.target[10].value;
    const kids = e.target[11].value;

    await axios
      .post("https://sheetdb.io/api/v1/31iln4h8j6ok8", {
        data: {
          tour: tour,
          maleFemale: maleFemale,
          name: name,
          email: email,
          phone: phone,
          address: address,
          city: city,
          startday: tourDate,
          adults: peoples,
          children: kids,
        },
      })
      .then((e) => e.json())
      .then((data) => data)
      .catch((err) => console.log(err));

    await axios
      .post("https://formspree.io/f/mgeqpdao", new FormData(e.target))
      .then((d) => d.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)} id="form-data">
          <div className="form-tour">
            <p>THÔNG TIN TOUR</p>
            <input name="imformation-tour" type="text" />
            <p>THÔNG TIN KHÁCH HÀNG</p>
            <div className="row">
              <div className=" large-4 ">
                <p className="form-label-input">Giới tính</p>
                <div classname="control-radio">
                  <input type="radio" name="radio" className="input" />
                  <span>Mr </span>
                  <input type="radio" name="radio" className="input" />
                  <span>Mrs </span>
                  <input type="radio" name="radio" className="input" />
                  <span>Miss</span>
                </div>
              </div>
              <div className=" large-4 col-md-4">
                <p className="form-label-input">Họ tên</p>
                <input type="text" name="name" required />
              </div>
              <div className=" large-4 col-md-4">
                <p className="form-label-input">Email</p>
                <input type="email" name="email" required />
              </div>
              <div className=" large-4 col-md-4">
                <p className="form-label-input">Điện thoại</p>
                <input type="number" name="phone" required />
              </div>
              <div className=" large-4 col-md-4">
                <p className="form-label-input">Địa chỉ </p>
                <input type="text" name="address" required />
              </div>
              <div className=" large-4 col-md-4">
                <p className="form-label-input">Thành phố</p>
                <input type="text" name="city" required />
              </div>
            </div>
            <p>THÔNG TIN ĐẶT TOUR</p>
            <div className="row">
              <div className=" large-4 col-md-4">
                <p className="form-label-input">Ngày khởi hành</p>
                <input type="date" name="date" required />
              </div>
              <div className=" large-4 col-md-4">
                <p className="form-label-input">Số người lớn</p>
                <input type="number" name="peoples" required />
              </div>
              <div className=" large-4 col-md-4 ">
                <p className="form-label-input">Số trẻ em</p>
                <input type="number" name="kids" required />
              </div>
            </div>
            <button type="submit" className="form-button">
              Đặt tour ngay
            </button>
          </div>
        </Form>
      </Modal.Body>
      <button
        title="Close (Esc)"
        onClick={props.onHide}
        type="button"
        className="mfp-close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </Modal>
  );
}

export default BookingModal;
