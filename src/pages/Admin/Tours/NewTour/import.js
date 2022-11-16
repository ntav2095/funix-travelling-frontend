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
  language: "vie",
  category: [],

  name: "",
  journey: "",
  description: "",
  highlights: "",

  departureDates: "",
  days: 0,
  nights: 0,

  currentPrice: 0,
  oldPrice: 0,
  priceIncludes: "",
  priceExcludes: "",

  cancellationPolicy: "",
  slider: [],
  thumb: null,
};

const dataPacker = (values) => {
  const {
    name,
    journey,
    description,

    currentPrice,
    oldPrice,
    days,
    nights,

    priceExcludes,
    priceIncludes,
    departureDates,
    highlights,
    cancellationPolicy,

    slider,
    thumb,
  } = values;

  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("journey", values.journey);
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
};
