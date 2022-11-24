// main
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import AdminLayout from "../../../../layout/AdminLayout";
import SpinnerModal from "../../../../components/SpinnerModal";

// apis
import useAxios from "../../../../hooks/useAxios";
import { adminApis } from "../../../../services/apis";

// helpers
import { stringToDate } from "../../../../services/helpers/dateHandler";

import TourForm from "../TourForm";

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
  const formData = new FormData();

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
  AdminLayout,
  SpinnerModal,
  useAxios,
  adminApis,
  stringToDate,
  TourForm,
  initialValues,
  dataPacker,
};
