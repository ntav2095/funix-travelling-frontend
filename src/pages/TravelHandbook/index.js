// main
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { postsApi } from "../../services/apis";
import { getDate, getMonth, getYear } from "date-fns";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Row, Col } from "react-bootstrap";

// components
import Layout from "../../layout/Default";

// hooks
import usePageTitle from "../../hooks/usePageTitle";
import useAxios from "../../hooks/useAxios";

// css
import classes from "./TravelHandbook.module.css";
import SpinnerModal from "../../components/SpinnerModal";

function TravelHandbook() {
  const [sendRequest, isLoading, data, error] = useAxios();

  function date(dateString) {
    const dateStringtoformater = new Date(dateString);
    const day = getDate(dateStringtoformater);
    const month = getMonth(dateStringtoformater);
    const year = getYear(dateStringtoformater);
    return `${day}-${month}-${year}`;
  }

  function contentDes(content) {
    console.log(content);
    let description = { text: [], image: [] };
    content.map((item) => {
      let t =
        typeof item.insert === "string" && item.insert.length > 10
          ? description.text.push(item.insert)
          : null;
      let e = item.insert.image
        ? description.image.push(item.insert.image)
        : null;
      return item;
    });

    return description;
  }
  useEffect(() => {
    sendRequest(postsApi.get());
  }, []);

  usePageTitle(`Cẩm nang du lịch || Go Travel`);

  return (
    <>
      <SpinnerModal show={isLoading} />
      <Layout>
        <div className="myContainer">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>CẨM NANG DU LỊCH</Breadcrumb.Item>
          </Breadcrumb>

          <div className={classes.travelHandbook}>
            <Row lg="3" md="2" sm="1">
              {data
                ? data.items.map((item) => (
                    <Col key={item._id} className="mb-4">
                      <Link
                        className={classes.story}
                        key={item._id}
                        to={`/cam-nang-du-lich/${item._id}`}
                      >
                        <div className={classes.inner}>
                          <div
                            className={classes.image}
                            style={{
                              backgroundImage: `url(${
                                contentDes(item.content).image[0]
                              })`,
                            }}
                          ></div>
                          <div className={classes.boxText}>
                            <h2 className={classes.title}>{item.title}</h2>
                            <p className={classes.date}>
                              {date(item.updatedAt || item.createdAt)}
                            </p>
                            <p className={classes.desc}>
                              {contentDes(item.content).text[0].slice(0, 100)}
                              ...
                            </p>
                          </div>
                        </div>
                      </Link>
                    </Col>
                  ))
                : null}
            </Row>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default TravelHandbook;
