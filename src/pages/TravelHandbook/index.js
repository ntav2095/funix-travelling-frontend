// main
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { postsApi } from "../../services/apis";
import { getDate, getMonth, getYear } from "date-fns";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// components
import SpinnerModal from "../../components/SpinnerModal";
import Layout from "../../layout/Default";

// hooks
import usePageTitle from "../../hooks/usePageTitle";
import useAxios from "../../hooks/useAxios";

// css
import classes from "./TravelHandbook.module.css";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import Panavigation from "../../containers/panavigation";
import { useTranslation } from "react-i18next";

const breadcrumb = [
  { href: "/", active: false, text: "trang chủ" },
  { href: "/cam-nang-du-lich", active: true, text: "cẩm nang du lịch" },
];

function TravelHandbook() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [page, setPage] = useState(1);

  const { i18n } = useTranslation();
  function setpage(e) {
    setPage(e);
  }

  function date(dateString) {
    const dateStringtoformater = new Date(dateString);
    const day = getDate(dateStringtoformater);
    const month = getMonth(dateStringtoformater);
    const year = getYear(dateStringtoformater);
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    sendRequest(postsApi.get({ page: page, lang: i18n.language }));
  }, [page, i18n.language]);

  usePageTitle(`Cẩm nang du lịch || Go Travel`);

  return (
    <>
      <SpinnerModal show={isLoading} />
      <Layout breadcrumb={breadcrumb}>
        <div className="myContainer">
          <div className="row">
            {!isLoading &&
              data &&
              data.data.length > 0 &&
              data.data.map((item) => (
                <div key={item._id} className="col-12 col-md-6 col-lg-4">
                  <Link
                    className={classes.story}
                    key={item._id}
                    to={`/cam-nang-du-lich/${item._id}`}
                  >
                    <div className={classes.inner}>
                      <div
                        className={classes.image}
                        style={{
                          backgroundImage: `url(${item.thumb})`,
                        }}
                      ></div>
                      <div className={classes.boxText}>
                        <h2 className={classes.title}>{item.title}</h2>
                        <p className={classes.date}>
                          {date(item.updatedAt || item.createdAt)}
                        </p>
                        <p className={classes.desc}>
                          {item.lead}
                          ...
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}

            {isLoading &&
              new Array(2).fill(1).map((item, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4">
                  <CardPlaceholder />
                </div>
              ))}
          </div>
          <Panavigation totalPage={3} callback={setpage} />
        </div>
      </Layout>
    </>
  );
}

export default TravelHandbook;
