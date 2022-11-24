import React, { useState } from "react";
// import {
//   UncontrolledAccordion,
//   Accordion,
//   AccordionBody,
//   AccordionHeader,
//   AccordionItem,
// } from "reactstrap";
import { useRef } from "react";
// import { Tab } from "semantic-ui-react";
import QuillReader from "./QuillReader";
import formatDate from "../../../services/helpers/formatDate";
import { clock as clockSVG } from "../../../assets/svgs";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";

import styles from "./TourInfo.module.css";
import "./TourInfo.module.css";
import { useTranslation } from "react-i18next";
import "./tourinfo_override.css";
const translation = {
  tabTitle: {
    overview: {
      en: "Overview",
      vi: "Tổng quan",
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
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          {/* TỔng quan  */}
          <Tab eventKey="home">
            <div className={styles.tabContent}>
              <div className={styles.tourDesc}>
                <p></p>
                <div>
                  <p></p>
                </div>
              </div>
              <div className={styles.tourDesc}>
                <p>{}</p>
                <div>
                  <p></p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>{}</p>
                <div>
                  <p></p>
                </div>
              </div>

              <div>
                <p>{}</p>
                <div>
                  <p></p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>{}</p>
                <div>
                  <p></p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>{}</p>
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
                <Accordion
                  defaultActiveKey="0"
                  id="accordion1"
                  className="accordion"
                >
                  <div eventKey="0">
                    {deltailtour.map((item) => {
                      return (
                        <>
                          <span id="fa-regular">
                            <i
                              style={{
                                position: "absolute",
                                transform: "translateY(20px)",
                                display: "block",
                                zIndex: "1",
                                background: "white",
                              }}
                              className="fa-regular fa-circle"
                            ></i>
                          </span>
                          <Accordion.Header className="accordion-header1">
                            {item.day} {item.destination}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className="content">
                              <div className="tile" key={item.id}>
                                <div className={styles.accordion}>
                                  <h6>{item.day}</h6>
                                  <h3>{item.destination}</h3>
                                </div>
                              </div>
                              <div className="qill" key={item.id}>
                                <div className="container">
                                  <QuillReader detail={item.qill} />
                                </div>
                              </div>
                            </div>
                          </Accordion.Body>
                        </>
                      );
                    })}
                  </div>
                </Accordion>
              </div>
            </div>
          </Tab>
          {/* Bảng giá */}
          <Tab eventKey="price">
            <div
              className={+" " + styles.tabContent}
              role="tabpan  el"
              aria-labelledby="tab-title-gia-bao-gom"
            ></div>
          </Tab>
          {/* Điều khaon */}
          <Tab eventKey="term">
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
