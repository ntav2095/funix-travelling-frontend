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

  formData.append("removedImages", JSON.stringify(values.removedImages));
  formData.append("tourId", tourId);
  formData.append("language", values.language);

  // overview
  formData.append("code", values.code);
  formData.append("name", values.name);
  formData.append("journey", values.journey);
  formData.append("countries", values.countries);
  formData.append("description", values.description);
  formData.append("highlights", JSON.stringify(values.highlights));

  formData.append("price", values.price);
  formData.append("days", values.days);
  formData.append("nights", values.nights);

  // price policies
  formData.append("priceIncludes", JSON.stringify(values.priceIncludes));
  formData.append("priceExcludes", JSON.stringify(values.priceExcludes));
  formData.append("priceOther", JSON.stringify(values.priceOther));

  // departure dates
  formData.append(
    "departureDates",
    JSON.stringify(
      values.departureDates.split("\n").map((item) => stringToDate(item)[1])
    )
  );

  // terms and policies
  formData.append(
    "cancellationPolicy",
    JSON.stringify(values.cancellationPolicy)
  );
  formData.append(
    "registrationPolicy",
    JSON.stringify(values.registrationPolicy)
  );
  formData.append("paymentPolicy", JSON.stringify(values.paymentPolicy));
  formData.append("notes", JSON.stringify(values.notes));

  // category
  formData.append("category", JSON.stringify(values.category));

  // thumb
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
