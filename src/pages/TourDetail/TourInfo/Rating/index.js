import Slider from "react-slick";
import styles from "./Rating.module.css";
import { useRef, useState } from "react";
import {
  star,
  starHalfFill,
  starFill,
  openQuotes,
} from "../../../../assets/svgs";
import {
  SlickArrowLeft,
  SlickArrowRight,
} from "../../../../components/slickArrows";

import "./override.css";

const comments = [
  {
    id: 1,
    name: "Rose",
    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
        asperiores iste laborum quasi nihil dolorem tempore ullam eaque!
        Nihil ipsam assumenda, vel incidunt sunt cum debitis consectetur
        soluta eius a optio accusantium aut ipsum eligendi eveniet
        possimus minus iusto mollitia, quae doloremque ratione quam.
        Tenetur totam corporis consequuntur facere rem! Quasi, natus
        distinctio omnis enim`,
  },
  {
    id: 2,
    name: "John",
    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
        asperiores iste laborum quasi nihil dolorem tempore ullam eaque!
        Nihil ipsam assumenda, vel incidunt sunt cum debitis consectetur
        sot possimus minus iusto mollitia, quae doloremque ratione quam.
        Tenetur totam corporis consequuntur facere rem! Quasi, natus
        distinctio omnis enim`,
  },
  {
    id: 3,
    name: "Aang",
    content: `um dolor sit, amet consectetur adipisicing elit. Magni
        asperiores iste laborum quasi nihil dolorem tempore ullam eaque!
        Nihil ipsam assumenda, vel incidunt sunt cum debitis consectetur
        soluta eius a optio accusantium aut ipsum eligendi eveniet
        possimus minus iusto mollitia, quae doloremque ratione quam.
        Tenetur totam corporis consequuntur facere rem! Quasi, natus
        distinctio omnis enim`,
  },
  {
    id: 4,
    name: "Katara",
    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
        asperiores iste laborum quasi nihil dolorem tempore ullam eaque!
        Nihil ipsam assumenda, vel incidunt sunt cum debitis consectetur
        soluta eius a optio accusantium aut ipsum eligendi eveniet
        possimus minus iusto mollitia, quae doloremque ratione quam.
        Tenetur totam corporis consequuntur facere rem! Quasi, natus
        distinctio omnis enim hhh`,
  },
  {
    id: 5,
    name: "Rose",
    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
        asperiores iste laborum quasi nihil dolorem tempore ullam eaque!
        Nihil ipsam assumenda, vel incidunt sunt cum debitis consectetur
        soluta eius a optio accusantium aut ipsum eligendi eveniet
        possimus minus iusto mollitia, quae doloremque ratione quam.
        Tenetur totam corporis consequuntur facere rem! Quasi, natus
        distinctio omnis enim yyy`,
  },
  {
    id: 6,
    name: "Zuko",
    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
        asperiores iste ttt  ullam eaque! Nihil ipsam assumenda, vel incidunt sunt cum debitis consectetur
        soluta eius a optio accusantium aut ipsum eligendi eveniet
        possimus minus iusto mollitia, quae doloremque ratione quam.
        Tenetur totam corporis consequuntur facere rem! Quasi, natus
        distinctio omnis enim`,
  },
];

function Rating() {
  const sliderRef = useRef();

  const settings = {
    speed: 500,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: true,
    initialSlide: 0,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight slidesToShow={2} slidesToScroll={1} />,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          prevArrow: <SlickArrowLeft />,
          nextArrow: <SlickArrowRight slidesToShow={1} slidesToScroll={1} />,
        },
      },
    ],
  };

  const x = comments.map((item) => (
    <div key={item.id} className={styles.ratingItem}>
      <div className={styles.comment + " p-4"}>
        <p className={styles.quotes + " " + styles.openQuotes}>{openQuotes}</p>
        <p className="m-0">{item.content}</p>
        <p className={styles.quotes + " " + styles.closeQuotes}>{openQuotes}</p>
        <h6>{item.name}</h6>
      </div>
    </div>
  ));

  return (
    <div className={styles.wrapper + " tourDetail__rating"}>
      <div className={styles.inner + " pt-5"}>
        <Slider ref={sliderRef} {...settings}>
          <div
            className={
              styles.ratingItem +
              " d-flex align-items-center justify-content-center"
            }
          >
            <div className={styles.grade}>
              <h3 className={styles.average + " mb-1"}>
                <strong>4.5</strong>
                <span>/5</span>
              </h3>
              <div className="mb-1">
                {starFill}
                {starFill}
                {starFill}
                {starFill}
                {starHalfFill}
              </div>
              <p>From our current customers</p>
            </div>
          </div>

          {/* {comments.map((item) => (
            <div key={item.id} className={styles.ratingItem}>
              <div className={styles.comment + " p-4"}>
                <p className={styles.quotes + " " + styles.openQuotes}>
                  {openQuotes}
                </p>
                <p className="m-0">{item.content}</p>
                <p className={styles.quotes + " " + styles.closeQuotes}>
                  {openQuotes}
                </p>
                <h6>{item.name}</h6>
              </div>
            </div>
          ))} */}

          {x}

          <div
            className={styles.ratingItem + " d-none d-sm-block " + styles.empty}
          />
        </Slider>
      </div>
    </div>
  );
}

export default Rating;
