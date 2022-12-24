// main
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

// components
import AdminLayout from "../../../../layout/AdminLayout";
import SpinnerModal from "../../../../components/SpinnerModal";
import ErrorMessage from "../../../../components/ErrorMessage";
import TourForm from "../TourForm";
import NotifyModal from "../../../../components/NotifyModal";
import StatusBar from "../../../../layout/AdminLayout/StatusBar";

// apis
import useAxios from "../../../../hooks/useAxios";
import { tourApis, categoryApis } from "../../../../services/apis/admin.apis";

// other
import usePageTitle from "../../../../hooks/usePageTitle";

// css
import styles from "./NewTour.module.css";

const initialValues = {
  language: "vi",
  category: [],

  code: "",
  hot: false,
  name: "",
  journey: "",
  countries: "",
  description: "",
  highlights: null,

  price: "",
  days: "",
  nights: "",

  departureDates: [],

  priceIncludes: null,
  priceExcludes: null,
  priceOther: null,

  cancellationPolicy: null,
  registrationPolicy: null,
  paymentPolicy: null,
  notes: null,

  thumb: null,
  banner: null,
  layout: [],
};

const dataPacker = (values) => {
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

  formData.append("code", values.code);
  formData.append("name", values.name);
  formData.append("hot", values.hot);

  formData.append("price", Number(values.price.replace(/,/g, "")));
  formData.append("duration", JSON.stringify(duration));
  formData.append("departureDates", JSON.stringify(values.departureDates));

  formData.append("journey", values.journey);
  formData.append("countries", values.countries);
  formData.append("description", values.description);
  formData.append("highlights", JSON.stringify(values.highlights));

  formData.append("category", JSON.stringify(values.category));
  formData.append("layout", JSON.stringify(values.layout));

  formData.append("price_policies", JSON.stringify(price_policies));
  formData.append("terms", JSON.stringify(terms));

  formData.append("thumb", values.thumb);
  formData.append("banner", values.banner);

  return formData;
};

export {
  useState,
  useRef,
  useEffect,
  useNavigate,
  Link,
  AdminLayout,
  SpinnerModal,
  StatusBar,
  NotifyModal,
  TourForm,
  ErrorMessage,
  useAxios,
  tourApis,
  categoryApis,
  usePageTitle,
  initialValues,
  dataPacker,
  styles,
};
