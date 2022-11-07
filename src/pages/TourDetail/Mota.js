import React from "react";
import { useRef, useEffect } from "react";
import { Tab } from "semantic-ui-react";
import QuillReader from "./QuillReader";
import formatDate from "../../services/helpers/formatDate";

import styles from "./Itinerary.module.css";

const clockSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.7}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Mota = ({ tour }) => {
  const itineraryRef = useRef();
  const panes = [
    {
      menuItem: "Mô tả",
      render: () => (
        <Tab.Pane attached={false}>
          <div className="lich_trinh_title other_news_title">
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
                {" "}
                <p>{tour.time.duration}</p>
              </div>
            </div>

            <div className={styles.tourDesc}>
              <p>Khởi hành</p>
              <div>
                <p>
                  {tour.time.departureDates
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
                  {tour.highlights.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Lịch Trình",
      render: () => (
        <Tab.Pane attached={false}>
          <div
            ref={itineraryRef}
            className={
              styles.itinerary +
              " woocommerce-Tabs-panel woocommerce-Tabs-panel--lich-trinh panel entry-content"
            }
            id="tab-lich-trinh"
            role="tabpanel"
            aria-labelledby="tab-title-lich-trinh"
          >
            <h2 className={styles.mainTitle}>Lộ trình</h2>
            {tour.itinerary.map((item) => {
              if (item.type === "title") {
                return (
                  <div className={styles.title}>
                    <div className={styles.container}>
                      <h3 key={item.id}>{item.content}</h3>
                    </div>
                  </div>
                );
              }

              if (item.type === "time") {
                return (
                  <div className={styles.container + " " + styles.bgContent}>
                    <div key={item.id} className={styles.time}>
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
                  >
                    <QuillReader key={item.id} delta={item.content} />
                  </div>
                );
              }
            })}
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Quy Định Tour",
      render: () => (
        <Tab.Pane attached={false}>
          <div
            className="woocommerce-Tabs-panel woocommerce-Tabs-panel--quy-dinh-tour panel entry-content "
            id="tab-quy-dinh-tour"
            role="tabpanel"
            aria-labelledby="tab-title-quy-dinh-tour"
          >
            <h2 className="yikes-custom-woo-tab-title yikes-custom-woo-tab-title-quy-dinh-tour">
              Quy định Tour
            </h2>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Giá Bao Gồm",
      render: () => (
        <Tab.Pane attached={false}>
          <div
            className="woocommerce-Tabs-panel woocommerce-Tabs-panel--gia-bao-gom panel entry-content "
            id="tab-gia-bao-gom"
            role="tabpanel"
            aria-labelledby="tab-title-gia-bao-gom"
          >
            <h2 className="yikes-custom-woo-tab-title yikes-custom-woo-tab-title-gia-bao-gom">
              Giá bao gồm
            </h2>

            <ul>
              {tour.price.includes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Đánh giá",
      render: () => <></>,
    },
  ];

  return <Tab menu={{ secondary: true }} panes={panes} />;
};

export default Mota;
