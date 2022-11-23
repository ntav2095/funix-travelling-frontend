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
          <Tab eventKey="home" title={translation.tabTitle.overview[lang]}>
            <div className={styles.tabContent}>
              <div className={styles.tourDesc}>
                <p>{translation.tabContent.overview.tour_name[lang]}</p>
                <div>
                  <p>{tour.name}</p>
                </div>
              </div>
              <div className={styles.tourDesc}>
                <p>{translation.tabContent.overview.itinerary[lang]}</p>
                <div>
                  <p>{tour.journey}</p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>{translation.tabContent.overview.duration[lang]}</p>
                <div>
                  <p>
                    {tour.days} {translation.tabContent.overview.days[lang]}{" "}
                    {tour.nights} {translation.tabContent.overview.nights[lang]}
                  </p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>
                  {translation.tabContent.overview.points_of_departure[lang]}
                </p>
                <div>
                  <p>
                    {tour.departureDates
                      .map((item) => formatDate(item, "dd/MM/yyyy"))
                      .join(", ")}
                  </p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>{translation.tabContent.overview.description[lang]}</p>
                <div>
                  <p>{tour.description}</p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>{translation.tabContent.overview.highlights[lang]}</p>
                <div>
                  <ul>
                    {tour.highlights
                      .filter((item) => Boolean(item.trim()))
                      .map((item, index) => (
                        <li key={index}>- {item}</li>
                      ))}
                  </ul>
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
                {deltailtour.map((item) => {
                  return (
                    <>
                      <button type="button" className="collapsible">
                        {item.day} {item.destination}
                      </button>

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
                    </>
                  );
                })}
              </div>
            </div>
          </Tab>
          {/* Bảng giá */}
          <Tab eventKey="price" title={translation.tabTitle.price[lang]}>
            <div
              className={styles.price + " " + styles.tabContent}
              role="tabpanel"
              aria-labelledby="tab-title-gia-bao-gom"
            >
              <h2>{translation.tabContent.price.price_includes[lang]}</h2>

              <ul className="ps-2">
                {tour.priceIncludes.map((item, index) => (
                  <li key={index}>- {item}</li>
                ))}
              </ul>

              <h2>{translation.tabContent.price.price_excludes[lang]}</h2>

              <ul className="ps-2">
                {tour.priceExcludes.map((item, index) => (
                  <li key={index}>- {item}</li>
                ))}
              </ul>
            </div>
          </Tab>
          {/* Điều khaon */}
          <Tab eventKey="term" title={translation.tabTitle.terms[lang]}>
            <div
              className={styles.price + " " + styles.tabContent}
              role="tabpanel"
              aria-labelledby="tab-title-gia-bao-gom"
            >
              <h2>{translation.tabContent.terms.cancellation_policy[lang]}</h2>

              <ul className="ps-3">
                {tour.cancellationPolicy.map((item, index) => (
                  <li key={index}>- {item}</li>
                ))}
              </ul>
            </div>
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
