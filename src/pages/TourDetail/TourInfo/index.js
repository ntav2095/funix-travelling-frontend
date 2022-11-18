import React from "react";
import { useRef } from "react";
// import { Tab } from "semantic-ui-react";
import QuillReader from "./QuillReader";
import formatDate from "../../../services/helpers/formatDate";
import { clock as clockSVG } from "../../../assets/svgs";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import styles from "./TourInfo.module.css";
import "./tourinfo_override.css";

const TourInfo = ({ tour, isLoading }) => {
  const itineraryRef = useRef();

  return (
    <div className={styles.tourInfo + " tourInfo"}>
      {!isLoading && tour && (
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
          tabClassName={styles.xxx}
        >
          <Tab eventKey="home" title="Tổng quan">
            <div className={styles.tabContent}>
              <div className={styles.tourDesc}>
                <p>Tên hành trình</p>
                <div>
                  <p>{tour.name}</p>
                </div>
              </div>
              <div className={styles.tourDesc}>
                <p>Lộ trình</p>
                <div>
                  <p>{tour.journey}</p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>Thời gian</p>
                <div>
                  <p>
                    {tour.days} ngày {tour.nights} đêm
                  </p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>Khởi hành</p>
                <div>
                  <p>
                    {tour.departureDates
                      .map((item) => formatDate(item, "dd/MM/yyyy"))
                      .join(", ")}
                  </p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>Mô tả</p>
                <div>
                  <p>{tour.description}</p>
                </div>
              </div>

              <div className={styles.tourDesc}>
                <p>Điểm nổi bật</p>
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

          <Tab eventKey="itinerary" title="Lộ trình">
            <div
              ref={itineraryRef}
              className={styles.itinerary + " " + styles.tabContent}
              role="tabpanel"
              aria-labelledby="tab-title-lich-trinh"
            >
              <h2 className={styles.mainTitle}>Lộ trình</h2>
              {tour.itinerary.map((item) => {
                if (item.type === "title") {
                  return (
                    <div className={styles.title} key={item.id}>
                      <div className={styles.container}>
                        <h3>{item.content}</h3>
                      </div>
                    </div>
                  );
                }

                if (item.type === "time") {
                  return (
                    <div
                      className={styles.container + " " + styles.bgContent}
                      key={item.id}
                    >
                      <div className={styles.time}>
                        <p>
                          <span>{item.content.session}</span>
                        </p>
                        <p>
                          {clockSVG}
                          <span>{item.content.time}</span>
                        </p>
                      </div>
                    </div>
                  );
                }

                if (item.type === "para") {
                  return (
                    <div
                      className={
                        styles.container +
                        " " +
                        styles.bgContent +
                        " " +
                        styles.paragraph
                      }
                      key={item.id}
                    >
                      <QuillReader delta={item.content} />
                    </div>
                  );
                }
              })}
            </div>
          </Tab>

          <Tab eventKey="price" title="Bảng giá">
            <div
              className={styles.price + " " + styles.tabContent}
              role="tabpanel"
              aria-labelledby="tab-title-gia-bao-gom"
            >
              <h2>Giá bao gồm</h2>

              <ul className="ps-2">
                {tour.priceIncludes.map((item, index) => (
                  <li key={index}>- {item}</li>
                ))}
              </ul>

              <h2>Giá không bao gồm</h2>

              <ul className="ps-2">
                {tour.priceExcludes.map((item, index) => (
                  <li key={index}>- {item}</li>
                ))}
              </ul>
            </div>
          </Tab>

          <Tab eventKey="term" title="Điều khoản">
            <div
              className={styles.price + " " + styles.tabContent}
              role="tabpanel"
              aria-labelledby="tab-title-gia-bao-gom"
            >
              <h2>Điều kiện hoàn hủy</h2>

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
