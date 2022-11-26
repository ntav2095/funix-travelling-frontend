import React, { useState } from "react";
import {
  UncontrolledAccordion,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import { useRef } from "react";
// import { Tab } from "semantic-ui-react";
import QuillReader from "./QuillReader";
import formatDate from "../../../services/helpers/formatDate";
import { clock as clockSVG } from "../../../assets/svgs";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import Accordion from "react-bootstrap/Accordion";

import styles from "./TourInfo.module.css";
import "./TourInfo.module.css";
import { useTranslation } from "react-i18next";
import "./tourinfo_override.css";
import TourCarousellichtrinh from "../TourCarousellichtrinh";
const translation = {
  tabTitle: {
    overview: {
      en: "DES",
      vi: "Mô tả",
    },
    itinerary: {
      en: "Itinerary",
      vi: "Lịch trình",
    },
    price: {
      en: "Price",
      vi: "Bảng giá",
    },
    terms: {
      en: "Terms",
      vi: "Điều khoản",
    },
    Evaluate: {
      en: "Evaluate",
      vi: "Đánh giá",
    },
  },
  tabContent: {
    overview: {
      tour_name: {
        en: "Tour's name:",
        vi: "Tên hành trình:",
      },
      itinerary: {
        en: "Itinerary:",
        vi: "Lộ trình:",
      },
      duration: {
        en: "Duration: ",
        vi: "Thời gian: ",
      },
      days: {
        en: "days",
        vi: "ngày",
      },
      nights: {
        en: "nights",
        vi: "đêm",
      },
      description: {
        en: "Description: ",
        vi: "Mô tả: ",
      },
      highlights: {
        en: "Highlights:",
        vi: "Điểm nổi bật: ",
      },
      points_of_departure: {
        en: "Points of departure:",
        vi: "Khởi hành:",
      },
    },
    price: {
      price_includes: {
        en: "Price includes",
        vi: "Giá bao gồm",
      },
      price_excludes: {
        en: "Price excludes",
        vi: "Giá không bao gồm",
      },
    },
    terms: {
      cancellation_policy: {
        en: "Cancellation Policy",
        vi: "Điều kiện hoàn hủy",
      },
    },
  },
};
{
}

const TourInfo = ({ tour, isLoading, deltailtour }) => {
  const itineraryRef = useRef();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  console.log(tour);
  console.log(deltailtour);
  return (
    <div className={styles.tourInfo + " tourInfo"}>
      {!isLoading && tour && (
        <Tabs
          title={translation.tabTitle.overview[lang]}
          eventKey="overview"
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          {/* TỔng quan  */}
          <Tab title={translation.tabTitle.overview[lang]} eventKey="overview">
            <div className={styles.tabContent} style={{ paddingTop: "25px" }}>
              <div className={styles.tourDesc}>
                <p>
                  <strong>Hành trình:</strong>
                </p>
                <div>
                  <p> {tour.name}</p>
                </div>
              </div>
              <div className={styles.tourDesc}>
                <p>Lộ Trình :</p>
                <div>
                  <p>{tour.journey}</p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>Thời Gian :</p>
                <div>
                  <p>
                    {" "}
                    {tour.duration.days} Ngày
                    {tour.duration.nights} Đêm
                  </p>
                </div>
              </div>
              <div className={styles.tourDesc}>
                <p>Giá Trọn Gói :</p>
                <div>
                  <p>{tour.price}</p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>Tổng Quan :</p>
                <div>
                  <p>{tour.description}</p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>Điểm nhấn</p>
                <div>
                  <p>{tour.description}</p>
                </div>
                <div>
                  <ul></ul>
                </div>
              </div>
            </div>
          </Tab>
          {/* Lịch trình */}
          <Tab
            title={translation.tabTitle.itinerary[lang]}
            eventKey="itinerary"
          >
            <div
              ref={itineraryRef}
              className={styles.itinerary + " " + styles.tabContent}
              role="tabpanel"
              aria-labelledby="tab-title-lich-trinh"
            >
              <div className="container">
                <div
                  class="accordion"
                  id="accordionPanelsStayOpenExample"
                  style={{
                    backgroundColor: "#e7f1ff",
                  }}
                >
                  {tour.itinerary.map((item) => {
                    return (
                      <div class="accordion-item" style={{ borderTop: "none" }}>
                        <span id="fa-regular">
                          <i
                            style={{
                              position: "absolute",
                              transform: "translateY(20px)",
                              display: "block",
                              zIndex: "1",
                              background: "#fff",
                              borderRadius: "1px solic #fff",
                              marginLeft: "10px",
                            }}
                            className="fa-regular fa-circle"
                          ></i>
                        </span>
                        <h2
                          className="accordion-header"
                          id="panelsStayOpen-headingOne"
                          style={{
                            paddingLeft: "30px",
                            paddingRight: "30px",
                          }}
                        >
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#f" + item.id}
                            aria-expanded="true"
                            aria-controls={"f" + item.id}
                          >
                            {item.day.toUpperCase()}: {item.destination}
                          </button>
                        </h2>

                        <div
                          id={"f" + item.id}
                          class="accordion-collapse collapse show"
                          aria-labelledby="panelsStayOpen-headingOne"
                        >
                          <div class="accordion-body">
                            <div className="content">
                              <div className="tile" key={item.id}>
                                <div className={styles.accordion}></div>
                              </div>
                              <div className="qill" key={item.id}>
                                <div className="container">
                                  <div
                                    style={{
                                      paddingBottom: "10px",
                                    }}
                                  >
                                    <TourCarousellichtrinh
                                      tour={item}
                                      isLoading={isLoading}
                                    />
                                    <QuillReader delta={item.content} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Tab>
          {/* Bảng giá */}
          <Tab eventKey="price" title={translation.tabTitle.price[lang]}>
            <div
              className={+" " + styles.tabContent}
              role="tabpan  el"
              aria-labelledby="tab-title-gia-bao-gom"
            >
              <div className="container">
                <div class="accordion" id="accordionPanelsStayOpenExample">
                  <div
                    class="accordion-item"
                    style={{
                      borderTop: "none",
                      borderTop: "none",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    <h2
                      className="accordion-header"
                      id="panelsStayOpen-headingOne"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#f" + 1}
                        aria-expanded="true"
                        aria-controls={"f" + 1}
                      >
                        Các khoản bao gồm
                      </button>
                    </h2>

                    <div
                      id={"f" + 1}
                      class="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-headingOne"
                    >
                      <div class="accordion-body">
                        <div className="content">
                          <div className="tile" key={1}>
                            <div className={styles.accordion}></div>
                          </div>
                          <div className="qill" key={1}>
                            <div className="container">
                              <div style={{ paddingBottom: "10px" }}>
                                <QuillReader
                                  delta={tour.price_policies.includes}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="accordion-item"
                    style={{
                      borderTop: "none",
                      borderTop: "none",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    <h2
                      className="accordion-header"
                      id="panelsStayOpen-headingOne"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#f" + 2}
                        aria-expanded="true"
                        aria-controls={"f" + 2}
                      >
                        Các khoản không bao gồm
                      </button>
                    </h2>

                    <div
                      id={"f" + 2}
                      class="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-headingOne"
                    >
                      <div class="accordion-body">
                        <div className="content">
                          <div className="tile" key={2}>
                            <div className={styles.accordion}></div>
                          </div>
                          <div className="qill" key={2}>
                            <div className="container">
                              <div style={{ paddingBottom: "10px" }}>
                                <QuillReader
                                  delta={tour.price_policies.excludes}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="accordion-item"
                    style={{
                      borderTop: "none",
                      borderTop: "none",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    <h2
                      className="accordion-header"
                      id="panelsStayOpen-headingOne"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#f" + 3}
                        aria-expanded="true"
                        aria-controls={"f" + 3}
                      >
                        Bảng giá trẻ em và phụ phí
                      </button>
                    </h2>

                    <div
                      id={"f" + 3}
                      class="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-headingOne"
                    >
                      <div class="accordion-body">
                        <div className="content">
                          <div className="tile" key={3}>
                            <div className={styles.accordion}></div>
                          </div>
                          <div className="qill" key={3}>
                            <div className="container">
                              <div style={{ paddingBottom: "10px" }}>
                                <QuillReader
                                  delta={tour.price_policies.other}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          {/* Điều khaon */}
          <Tab eventKey="term" title={translation.tabTitle.terms[lang]}>
            <div
              className={styles.price + " " + styles.tabContent}
              role="tabpanel"
              aria-labelledby="tab-title-gia-bao-gom"
            >
              <div
                className={+" " + styles.tabContent}
                role="tabpan  el"
                aria-labelledby="tab-title-gia-bao-gom"
              >
                <div className="container">
                  <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div
                      className="accordion-item"
                      style={{
                        borderTop: "none",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}
                    >
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingOne"
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={"#f" + 1}
                          aria-expanded="true"
                          aria-controls={"f" + 1}
                        >
                          <strong> ĐIỀU KIỆN ĐĂNG KÝ</strong>
                        </button>
                      </h2>

                      <div
                        id={"f" + 1}
                        class="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-headingOne"
                      >
                        <div class="accordion-body">
                          <div className="content">
                            <div className="tile" key={1}>
                              <div className={styles.accordion}></div>
                            </div>
                            <div className="qill" key={1}>
                              <div className="container">
                                <div style={{ paddingBottom: "10px" }}>
                                  <QuillReader
                                    delta={tour.terms.registration}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="accordion-item"
                      style={{
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}
                    >
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingOne"
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={"#f" + 2}
                          aria-expanded="true"
                          aria-controls={"f" + 2}
                        >
                          <strong>ĐIỀU KIỆN HỦY ĐỔI</strong>
                        </button>
                      </h2>

                      <div
                        id={"f" + 2}
                        class="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-headingOne"
                      >
                        <div class="accordion-body">
                          <div className="content">
                            <div className="tile" key={2}>
                              <div className={styles.accordion}></div>
                            </div>
                            <div className="qill" key={2}>
                              <div className="container">
                                <div style={{ paddingBottom: "10px" }}>
                                  <QuillReader
                                    delta={tour.terms.cancellation}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="accordion-item"
                      style={{
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}
                    >
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingOne"
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={"#f" + 3}
                          aria-expanded="true"
                          aria-controls={"f" + 3}
                        >
                          <strong>PHƯỜNG THỨC THANH TOÁN</strong>
                        </button>
                      </h2>

                      <div
                        id={"f" + 3}
                        class="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-headingOne"
                      >
                        <div class="accordion-body">
                          <div className="content">
                            <div className="tile" key={3}>
                              <div className={styles.accordion}></div>
                            </div>
                            <div className="qill" key={3}>
                              <div className="container">
                                <div style={{ paddingBottom: "10px" }}>
                                  <QuillReader delta={tour.terms.payment} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="accordion-item"
                      style={{
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}
                    >
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingOne"
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={"#f" + 4}
                          aria-expanded="true"
                          aria-controls={"f" + 4}
                        >
                          <strong>THÔNG TIN CẦN LƯU Ý </strong>
                        </button>
                      </h2>

                      <div
                        id={"f" + 4}
                        class="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-headingOne"
                      >
                        <div class="accordion-body">
                          <div className="content">
                            <div className="tile" key={4}>
                              <div className={styles.accordion}></div>
                            </div>
                            <div className="qill" key={4}>
                              <div className="container">
                                <div style={{ paddingBottom: "10px" }}>
                                  <QuillReader delta={tour.terms.notes} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="Evaluate" title={translation.tabTitle.Evaluate[lang]}>
            <div
              className={styles.price + " " + styles.tabContent}
              role="tabpanel"
              aria-labelledby="tab-title-gia-bao-gom"
            ></div>
          </Tab>
        </Tabs>
      )}

      {isLoading && (
        <div className={styles.placeholder}>
          <div className={styles.tabs}></div>
          <div className={styles.content}></div>
        </div>
      )}
    </div>
  );
};

export default TourInfo;
