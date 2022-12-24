// main
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useParams, Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

// components
import AdminLayout from "../../../../layout/AdminLayout";
import SpinnerModal from "../../../../components/SpinnerModal";
import ErrorMessage from "../../../../components/ErrorMessage";
import Editor from "../../../../containers/Editor";
import StatusBar from "../../../../layout/AdminLayout/StatusBar";
import NotifyModal from "../../../../components/NotifyModal";

// apis
import useAxios from "../../../../hooks/useAxios";
import { tourApis } from "../../../../services/apis/admin.apis";

// hooks
import usePageTitle from "../../../../hooks/usePageTitle";

// assets
import {
  xMark as closeSVG,
  questionMark as questionSVG,
} from "../../../../assets/svgs";

// helpers
import isEmptyDelta from "../../../../services/helpers/quill/isEmptyDelta";

// css
import styles from "./UpdateItinerary.module.css";

const formDataPacker = (plan, tourId, language) => {
  const sliders = plan.map((item) => item.images);

  const textPlan = plan.map((item) =>
    item.images.length > 0 && typeof item.images[0] === "string"
      ? item
      : { ...item, images: [] }
  );

  const f = new FormData();

  sliders.forEach((slider, index) => {
    if (slider.length > 0) {
      slider.forEach((img) => {
        f.append(`plan${index}`, img);
      });
    }
  });

  f.append("itinerary", JSON.stringify(textPlan));
  f.append("tourId", tourId);
  f.append("language", language);

  return f;
};

const planValidator = (plan) => {
  if (plan.length === 0) return "Plan không được để trống";

  let errors = "";
  for (const [index, value] of plan.entries()) {
    if (!value.day) {
      errors = "Chưa nhập tiêu đề ở item thứ " + (index + 1);
      break;
    }

    if (!value.destination) {
      errors = "Chưa nhập mô tả ở item thứ " + (index + 1);
      break;
    }

    if (isEmptyDelta(value.content)) {
      errors = "Chưa nhập nội dung ở item thứ " + (index + 1);
      break;
    }
  }

  return errors;
};

export {
  useState,
  useEffect,
  uuid,
  useParams,
  Link,
  Accordion,
  AdminLayout,
  SpinnerModal,
  ErrorMessage,
  NotifyModal,
  Editor,
  StatusBar,
  useAxios,
  tourApis,
  usePageTitle,
  closeSVG,
  questionSVG,
  styles,
  formDataPacker,
  planValidator,
};
