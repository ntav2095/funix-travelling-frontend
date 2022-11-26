// main
import { useState, useEffect } from "react";

// components
import AdminLayout from "../../../../layout/AdminLayout";
import SpinnerModal from "../../../../components/SpinnerModal";
import ErrorMessage from "../../../../components/ErrorMessage";
import TourForm from "../TourForm";

// apis
import useAxios from "../../../../hooks/useAxios";
import { adminApis } from "../../../../services/apis";

// other
import { stringToDate } from "../../../../services/helpers/dateHandler";
import usePageTitle from "../../../../hooks/usePageTitle";

const initialValues = {
  language: "vi",
  category: [],

  code: "",
  name: "",
  journey: "",
  countries: "",
  description: "",
  highlights: null,

  price: 0,
  days: 0,
  nights: 0,

  departureDates: "",

  priceIncludes: null,
  priceExcludes: null,
  priceOther: null,

  cancellationPolicy: null,
  registrationPolicy: null,
  paymentPolicy: null,
  notes: null,

  thumb: null,
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

  const departureDates = values.departureDates
    .split("\n")
    .map((item) => stringToDate(item)[1]);

  const formData = new FormData();

  formData.append("code", values.code);
  formData.append("name", values.name);
  formData.append("journey", values.journey);
  formData.append("countries", values.countries);
  formData.append("description", values.description);
  formData.append("highlights", JSON.stringify(values.highlights));
  formData.append("price", values.price);
  formData.append("duration", JSON.stringify(duration));
  formData.append("price_policies", JSON.stringify(price_policies));
  formData.append("departureDates", JSON.stringify(departureDates));
  formData.append("terms", JSON.stringify(terms));
  formData.append("category", JSON.stringify(values.category));
  formData.append("image", values.thumb);

  return formData;
};

export {
  useState, // main state
  useEffect,
  AdminLayout, // components
  SpinnerModal,
  TourForm,
  ErrorMessage,
  useAxios, // apis
  adminApis,
  usePageTitle, // other
  initialValues,
  dataPacker,
};
