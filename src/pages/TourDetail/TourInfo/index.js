import React from "react";
import { useRef } from "react";
import { Tab } from "semantic-ui-react";
import QuillReader from "./QuillReader";
import formatDate from "../../../services/helpers/formatDate";
import { clock as clockSVG } from "../../../assets/svgs";

import styles from "./TourInfo.module.css";

const TourInfo = ({ tour, isLoading }) => {
  const itineraryRef = useRef();

  const panes = tour
    ? [
        {
          menuItem: "Tổng Quan",
          render: () => (
            <Tab.Pane attached={false}>
              <div>
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
                      {tour.highlights
                        .filter((item) => Boolean(item.trim()))
                        .map((item, index) => (
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
          menuItem: "Lộ Trình",
          render: () => (
            <Tab.Pane attached={false}>
              <div
                ref={itineraryRef}
                className={styles.itinerary}
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
            </Tab.Pane>
          ),
        },
        {
          menuItem: "Giá Bao Gồm",
          render: () => (
            <Tab.Pane attached={false}>
              <div
                className={styles.highlights}
                role="tabpanel"
                aria-labelledby="tab-title-gia-bao-gom"
              >
                <h2>Giá bao gồm</h2>

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
          menuItem: "Đánh Giá",
          render: () => <div></div>,
        },
      ]
    : [];

  return (
    <div className={styles.tourInfo}>
      {!isLoading && tour && (
        <Tab
          menu={{
            color: "blue",
            inverted: true,
          }}
          panes={panes}
        />
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
