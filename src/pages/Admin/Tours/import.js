// main
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "rc-pagination";

// components
import AdminLayout from "../../../layout/AdminLayout";
import SpinnerModal from "../../../components/SpinnerModal";
import ErrorMessage from "../../../components/ErrorMessage";

// apis
import useAxios from "../../../hooks/useAxios";
import { tourApi, adminApis } from "../../../services/apis";

// assets
import * as svg from "../../../assets/svgs";

// css
import styles from "./Tours.module.css";

const PAGE_SIZE = 6;

export {
  useEffect,
  useState,
  Link,
  AdminLayout,
  ErrorMessage,
  SpinnerModal,
  useAxios,
  tourApi,
  svg,
  Pagination,
  adminApis,
  styles,
  PAGE_SIZE,
};
