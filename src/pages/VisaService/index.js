//

import Layout from "../../layout/Default";
import { Link } from "react-router-dom";
import { phoneNumber, visaBanner, worldMap } from "../../assets/images";
import Slider from "react-slick";
import styles from "./Visa.module.css";
import { reasons, steps, visaProducts, searchResults } from "./mock";
import settings from "./responsiveCarousel";
import usePageTitle from "../../hooks/usePageTitle";
import SignupConsultModal from "./SignupConsultModal";
import { useState } from "react";
import SearchResults from "./SearchResults";
import { useEffect } from "react";

function VisaService() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  usePageTitle(`Dịch vụ visa || Go Travel`);

  return (
    <>
      <SignupConsultModal handleClose={handleClose} show={show} />

      <Layout>
        <div id={styles.banner}>
          <img src={visaBanner} alt="Visa banner" className={styles.banner} />
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

                  <SearchResults />
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
                  <Link key={index} to="/dich-vu-visa/1">
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
                  </Link>
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
