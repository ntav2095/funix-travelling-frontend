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
import usePageTitle from "../../../../hooks/usePageTitle";

// css
import styles from "./EditTour.module.css";

const formPacker = (values, tourId) => {
  const duration = {
    days: values.days,
    nights: values.nights,
  };

  const price_policies = {
    includes: values.priceIncludes,
    excludes: values.priceExcludes,
    other: values.priceOther,
  };

  const terms = {
    registration: values.registrationPolicy,
    cancellation: values.cancellationPolicy,
    payment: values.paymentPolicy,
    notes: values.notes,
  };

  const formData = new FormData();

  formData.append("tourId", tourId);
  formData.append("language", values.language);

  formData.append("code", values.code);
  formData.append("hot", values.hot);
  formData.append("name", values.name);
  formData.append("journey", values.journey);
  formData.append("countries", values.countries);
  formData.append("description", values.description);
  formData.append("highlights", JSON.stringify(values.highlights));
  formData.append("banner", JSON.stringify(values.banner));
  formData.append("price", Number(values.price.replace(/,/g, "")));
  formData.append("duration", JSON.stringify(duration));
  formData.append("price_policies", JSON.stringify(price_policies));
  formData.append("departureDates", JSON.stringify(values.departureDates));
  formData.append("terms", JSON.stringify(terms));
  formData.append("category", JSON.stringify(values.category));
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
  formPacker,
  usePageTitle,
  styles,
};
