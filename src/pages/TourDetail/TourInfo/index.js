import React, { useState } from "react";

import { useRef } from "react";
import QuillReader from "./QuillReader";
import formatDate from "../../../services/helpers/formatDate";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import styles from "./TourInfo.module.css";
import "./TourInfo.module.css";
import { useTranslation } from "react-i18next";
import "./tourinfo_override.css";
import Overview from "./Overview";
import Xxx from "./Tabs";
import Itinerary from "./Itinerary";
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

  const pricePolicies = tour
    ? [
        {
          id: "includes",
          title: "Giá bao gồm",
          content: tour.price_policies.includes,
        },
        {
          id: "excludes",
          title: "Giá không bao gồm",
          content: tour.price_policies.excludes,
        },
        {
          id: "other",
          title: "Trẻ em và phụ thu",
          content: tour.price_policies.other,
        },
      ]
    : [];

  const terms = tour
    ? [
        {
          id: "registration",
          title: "Điều khoản đăng ký",
          content: tour.terms.registration,
        },
        {
          id: "cancellation",
          title: "Điều kiện hoàn hủy",
          content: tour.terms.cancellation,
        },
        {
          id: "payment",
          title: "Phương thức thanh toán",
          content: tour.terms.payment,
        },
      ]
    : [];

  const itinerary = tour ? tour.itinerary : [];

  return (
    <div className={styles.tourInfo + " tourInfo"}>
      {isLoading && (
        <div className={styles.placeholder}>
          <div className={styles.tabs}></div>
          <div className={styles.content}></div>
        </div>
      )}

      {/* ==================================================================  */}
      <Tabs defaultActiveKey="profile" className="mb-3">
        <Tab eventKey="overview" title="MÔ TẢ">
          {tour && <Overview tour={tour} />}
        </Tab>
        <Tab eventKey="itinerary" title="LỘ TRÌNH">
          <Itinerary data={itinerary} />
        </Tab>
        <Tab eventKey="price" title="BẢNG GIÁ">
          <Xxx data={pricePolicies} />
        </Tab>

        <Tab eventKey="terms" title="ĐIỀU KHOẢN">
          <Xxx data={terms} />
        </Tab>
        <Tab eventKey="rating" title="ĐÁNH GIÁ">
          xxx
        </Tab>
      </Tabs>
    </div>
  );
};

export default TourInfo;
