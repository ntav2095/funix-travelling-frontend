//

import Layout from "../../layout/Default";

import { phoneNumber, visaBanner, worldMap } from "../../assets/images";
import Slider from "react-slick";
import styles from "./Visa.module.css";
import { reasons, steps, visaProducts } from "./mock";
import settings from "./responsiveCarousel";

import SignupConsultModal from "./SignupConsultModal";
import { useState } from "react";

function VisaService() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <SignupConsultModal handleClose={handleClose} show={show} />

      <Layout>
        <div className={styles.banner}>
          <img src={visaBanner} alt="Visa banner" />
        </div>

        <div className={styles.container}>
          <div
            className={styles.searchAndSignupForConsultation}
            style={{ backgroundImage: `url(${worldMap})` }}
          >
            <div className={styles.searchVisa}>
              <p>Bạn muốn làm visa đi nước nào?</p>

              <form>
                <div className={styles.input}>
                  <input type="text" placeholder="Nhập tên nước bạn muốn đến" />

                  {/* <div className={styles.searcModal}>
                    <p className={styles.title}>{earth} Dịch vụ visa</p>
                    <ul>
                      {searchResults.map((item) => (
                        <li key={item.id}>
                          <Link to={`/dich-vu-vi-sa/${item.id}`}>
                            <div className={styles.imageWrapper}>
                              <div
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                                className={styles.image}
                              ></div>
                            </div>
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div> */}
                </div>
                <button>Tìm kiếm</button>
              </form>
            </div>

            <div className={styles.signupForConsultation}>
              <h2>Dịch vụ Visa uy tín của Vietnam Booking</h2>
              <button onClick={handleShow}>Đăng ký tư vấn</button>
            </div>
          </div>

          {/* quick visa  */}
          <div className={styles.quickVisa}>
            <h2>Làm visa nhanh</h2>

            <div className={styles.chooseVisa}>
              <Slider {...settings}>
                {visaProducts.map((item, index) => (
                  <div key={index}>
                    <div className={styles.visaProduct}>
                      <div className={styles.inner}>
                        <div
                          className={styles.image}
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className={styles.textBox}>
                          <p className={styles.name}>{item.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* why chooose us  */}
          <div className={styles.whyChooseUs}>
            <ul>
              {reasons.map((item, index) => {
                return (
                  <li key={index}>
                    <div className={styles.icon}>{item.icon}</div>

                    <div className={styles.content}>
                      <p className={styles.name}>{item.name}</p>
                      <p className={styles.desc}>{item.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* goi lai cho toi  */}
        <div className={styles.callback}>
          <div className={styles.container}>
            <div className={styles.inner}>
              <div className={styles.input}>
                <input type="number" placeholder="Số điện thoại của tôi là" />
                <button>YÊU CẦU GỌI LẠI</button>
              </div>

              <div className="phoneNumbers">
                <img src={phoneNumber} alt="phone numbers" />
              </div>
            </div>
          </div>
        </div>

        {/* cac buoc lam visa  */}
        <div className={styles.container}>
          <div className={styles.steps}>
            <h2>Các bước làm Visa tại Vietnam Booking</h2>

            <ul>
              {steps.map((item) => (
                <li key={item.num}>
                  <p className={styles.num}>{item.num}</p>

                  <p className={styles.name}>{item.name}</p>

                  <p className={styles.desc}>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default VisaService;
