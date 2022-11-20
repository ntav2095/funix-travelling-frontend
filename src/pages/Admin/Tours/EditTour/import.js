// main
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

// components
import AdminLayout from "../../../../layout/AdminLayout";
import SpinnerModal from "../../../../components/SpinnerModal";
import TourForm from "../TourForm";
import ErrorMessage from "../../../../components/ErrorMessage";

// apis
import useAxios from "../../../../hooks/useAxios";
import { adminApis } from "../../../../services/apis";

// helpers
import { stringToDate } from "../../../../services/helpers/dateHandler";

// css
import styles from "./EditTour.module.css";

const formPacker = (values, tourId) => {
  const formData = new FormData();

  formData.append("language", values.language);
  formData.append("category", JSON.stringify(values.category));
  formData.append("tourId", tourId);
  formData.append("removedImages", JSON.stringify(values.removedImages));

  formData.append("name", values.name);
  formData.append("journey", values.journey);
  formData.append("countries", values.countries);
  formData.append("description", values.description);
  formData.append("highlights", JSON.stringify(values.highlights.split("\n")));

  formData.append("currentPrice", values.currentPrice);
  formData.append("oldPrice", values.oldPrice);
  formData.append(
    "priceIncludes",
    JSON.stringify(values.priceIncludes.split("\n"))
  );
  formData.append(
    "priceExcludes",
    JSON.stringify(values.priceExcludes.split("\n"))
  );

  formData.append(
    "departureDates",
    JSON.stringify(
      values.departureDates.split("\n").map((item) => stringToDate(item)[1])
    )
  );
  formData.append("days", values.days);
  formData.append("nights", values.nights);

  formData.append(
    "cancellationPolicy",
    JSON.stringify(values.cancellationPolicy.split("\n"))
  );

  values.slider.forEach((item) => {
    formData.append("slider", item);
  });

  formData.append("thumb", values.thumb);

  return formData;
};

export {
  useState,
  useEffect,
  useNavigate,
  useParams,
  format,
  AdminLayout,
  SpinnerModal,
  TourForm,
  useAxios,
  adminApis,
  stringToDate,
  ErrorMessage,
  styles,
  formPacker,
};
