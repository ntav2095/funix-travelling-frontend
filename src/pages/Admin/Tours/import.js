// main
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../../containers/Pagination";

// components
import AdminLayout from "../../../layout/AdminLayout";
import SpinnerModal from "../../../components/SpinnerModal";
import ErrorMessage from "../../../components/ErrorMessage";
import StatusBar from "../../../layout/AdminLayout/StatusBar";
import Filter from "./Filter";
import NotifyModal from "../../../components/NotifyModal";

// apis
import useAxios from "../../../hooks/useAxios";
import { tourApis } from "../../../services/apis/admin.apis";

// assets
import * as svg from "../../../assets/svgs";

// hooks
import usePageTitle from "../../../hooks/usePageTitle";

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
  tourApis,
  svg,
  Pagination,
  PAGE_SIZE,
  usePageTitle,
  StatusBar,
  Filter,
  NotifyModal,
  styles,
};
