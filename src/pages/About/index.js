import { aboutCompany, blog } from "../../assets/images";
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
    <div className={styles.content}>
      <div className="bg-dark text-light p-3">
        <h6>Our mission</h6>
        <h1>To be your companion to experience our world</h1>
      </div>

      <div className="row mt-5 mb-4 ">
        <div className="col-6">
          <div
            className={styles.aboutDescription + " p-4 border rounded bg-white"}
          >
            <h1>About Joya</h1>
            <p>
              Founded in 2005 by three university friends in Düsseldorf
              (Germany), trivago has since become a leading global accommodation
              search website. We are focused on reshaping the way millions of
              travelers search for and compare hotels and other accommodations.
              Part of Expedia Group (NASDAQ: TRVG), trivago’s mission is to
              become your companion to experience our world. Find out how
              trivago works here.
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className={styles.descriptionImage}>
            <img className="img-fluid" src={aboutCompany} alt="staffs" />
          </div>
        </div>
      </div>

      <div className="my-5">
        <h3 className="fw-bold pb-2">Find out more</h3>

        <div className={styles.links + " row"}>
          <div className="col-4">
            <img className="img-fluid rounded" src={blog} />
            <h5 className="text-center mt-2">Facebook</h5>
          </div>
          <div className="col-4">
            <img className="img-fluid rounded" src={blog} />
            <h5 className="text-center mt-2">Instagram</h5>
          </div>
          <div className="col-4">
            <img className="img-fluid rounded" src={blog} />
            <h5 className="text-center mt-2">Youtube</h5>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d31335.72157691286!2d106.87052302028592!3d10.965999550346657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d10.964541299999999!2d106.8768418!4m5!1s0x3174ddcfd234814f%3A0xd229538b1e185dcf!2zRlBUIFNob3AsIDExNi80IEtodSBwaOG7kSAxMCwgVMOibiBCacOqbiwgVGjDoG5oIHBo4buRIEJpw6puIEjDsmEsIMSQ4buTbmcgTmFp!3m2!1d10.968259399999999!2d106.8998857!5e0!3m2!1sen!2s!4v1672159189406!5m2!1sen!2s"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
      {/* <div>{delta && <QuillReader delta={delta} />}</div> */}
    </div>
  );
}

export default About;
