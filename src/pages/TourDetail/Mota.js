import React from "react";
import { useRef, useEffect } from "react";
import { Tab } from "semantic-ui-react";
import QuillReader from "./QuillReader";

const Mota = ({ tour }) => {
  const itineraryRef = useRef();
  const panes = [
    {
      menuItem: "Mô tả",
      render: () => (
        <Tab.Pane attached={false}>
          <div className="lich_trinh_title other_news_title">
            <p>{tour.description}</p>
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
            className="woocommerce-Tabs-panel woocommerce-Tabs-panel--lich-trinh panel entry-content "
            id="tab-lich-trinh"
            role="tabpanel"
            aria-labelledby="tab-title-lich-trinh"
          >
            {tour.itinerary.map((item) => {
              if (item.type === "title") {
                return <h2 key={item.id}>{item.content}</h2>;
              }

              if (item.type === "time") {
                return (
                  <div key={item.id}>
                    <span>{item.content.session}</span>
                    <span>{item.content.time}</span>
                  </div>
                );
              }

              if (item.type === "para") {
                return <QuillReader key={item.id} delta={item.content} />;
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
