import { aboutCompany } from "../../assets/images";
import usePageTitle from "../../hooks/usePageTitle";
import styles from "./About.module.css";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import QuillReader from "../../components/QuillReader";

function About() {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const lang = useTranslation().i18n.language;

  useEffect(() => {
    sendRequest({
      method: "GET",
      url: "http://localhost:5000/about",
    });
  }, [lang]);
  usePageTitle("Tổng quan công ty || Joya Travel");

  const delta = data ? data.data.content : null;

  return (
    <div>
      <div>{delta && <QuillReader delta={delta} />}</div>
    </div>
  );
}

export default About;
