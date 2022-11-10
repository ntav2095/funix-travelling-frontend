// main
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { postsApi } from "../../services/apis";
import { getDate, getMonth, getYear } from "date-fns";

// components
import Layout from "../../layout/Default";

// hooks
import usePageTitle from "../../hooks/usePageTitle";
import useAxios from "../../hooks/useAxios";

// css
import classes from "./TravelHandbook.module.css";

<<<<<<< HEAD
// mock
import stories from "../../mock/travelhandBook.mock";
import { Container } from "reactstrap";
import { Row } from "react-bootstrap";
=======


>>>>>>> admin-page

function TravelHandbook() {
  const [sendRequest, isLoading, data, error] = useAxios();

  function date(dateString){
    const dateStringtoformater= new Date(dateString)
    const day=getDate(dateStringtoformater)
    const month=getMonth(dateStringtoformater)
    const year=getYear(dateStringtoformater)
    return `${day}-${month}-${year}`
  }

  function contentDes(content){
    console.log(content)
    let description={text:[],image:[]}
    content.map(item=>{
      let t= typeof item.insert === 'string' && item.insert.length>10?description.text.push(item.insert):null
      let e= item.insert.image?description.image.push(item.insert.image):null
      return item
    })
    
    return description
  }
  useEffect(() => {
    sendRequest(postsApi.get())
  }, [])

  usePageTitle(`Cẩm nang du lịch || Go Travel`);

  return (
    <Layout>
<<<<<<< HEAD
      <div id="Body-content-1">
        <Container>
          <Row lg="3" md="2" xs="1" className={classes.travelHandbook}>
            {stories.map((item) => (
              <Link
                className={classes.story}
                key={item.id}
                to={`/cam-nang-du-lich/${item.id}`}
              >
                <div className={classes.inner}>
                  <div className={classes.image}>
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className={classes.boxText}>
                    <h2 className={classes.title}>{item.title}</h2>
                    <p className={classes.date}>{item.date}</p>
                    <p className={classes.desc}>{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </Row>
        </Container>
=======
      <div className={classes.travelHandbook}>
        {data?data.items.map((item) => (
          <Link
            className={classes.story}
            key={item._id}
            to={`/cam-nang-du-lich/${item._id}`}
          >
            <div className={classes.inner}>
              <div className={classes.image}>
                <img src={contentDes(item.content).image[0]} alt={item.title} />
              </div>
              <div className={classes.boxText}>
                <h2 className={classes.title}>{item.title}</h2>
                <p className={classes.date}>{date(item.updatedAt||item.createdAt)}</p>
                <p className={classes.desc}>{contentDes(item.content).text[0]}</p>
              </div>
            </div>
          </Link>
        )):null}
>>>>>>> admin-page
      </div>
    </Layout>
  );
}

export default TravelHandbook;
