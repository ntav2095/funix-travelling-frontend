// main
import { Link, useParams } from "react-router-dom";

// components
import Layout from "../../layout/Default";

// hooks
import usePageTitle from "../../hooks/usePageTitle";

// css
import classes from "./TravelHandbookDetail.module.css";

// mock
import { useEffect, useRef, useState } from "react";
import { postsApi } from "../../services/apis";
import useAxios from "../../hooks/useAxios";
import quillGetHTML from "../../services/helpers/quillGetHTML";
import { getDate, getMonth, getYear } from "date-fns";

function TravelHandbookDetail() {
  const [state, setState] = useState();
  const [sendRequest, isLoading, data, error] = useAxios();
  const quill = useRef();
  const { id } = useParams();
  function date(dateString) {
    const dateStringtoformater = new Date(dateString);
    const day = getDate(dateStringtoformater);
    const month = getMonth(dateStringtoformater);
    const year = getYear(dateStringtoformater);
    return `${day}-${month}-${year}`;
  }
  function contentDes(content) {
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
  useEffect(() => {
    if (data) {
      let posts = data.items.filter((item) => item._id === id);
      setState(posts[0]);
    }
  }, [data]);

  useEffect(() => {
    if (state) {
      quill.current.innerHTML = quillGetHTML({ ops: state.content });
    }
  }, [state]);

  usePageTitle(`Cẩm nang --- đang cập nhật || Go Travel`);

  const breadcrumb = [
    { href: "/", active: false, text: "trang chủ" },
    { href: "/cam-nang-du-lich", active: false, text: "cẩm nang du lịch" },
    {
      href: `/danh-sach-tour/${id}`,
      active: true,
      text: state?.title || "bài viết",
    },
  ];

  return (
    <Layout sidebarRight primary breadcrumb={breadcrumb}>
      <div className={classes.x}>
        {state ? (
          <div className={classes.storyHeader}>
            <h1>{state.title}</h1>
            <p className={classes.date}>
              Posted on <span>{date(state.updatedAt || state.createdAt)}</span>{" "}
              by <Link to="/admin">admin</Link>
            </p>
          </div>
        ) : null}
        <div className={classes.storyContent}>
          <div className={classes.quillContent} ref={quill}></div>
        </div>

        <div className={classes.relatedStories}>
          <p className={classes.relatedStoriesTitle}>Bài viết liên quan</p>
          <ul className="row">
            {data
              ? data.items.map((item) => (
                  <li key={item.id} className="col-12 col-md-6 col-lg-4">
                    <Link
                      className={classes.relatedStory}
                      to={`/cam-nang-du-lich/${item._id}`}
                    >
                      <div>
                        <div
                          className={classes.image}
                          style={{
                            backgroundImage: `url(${
                              contentDes(item.content).image[0]
                            })`,
                          }}
                        ></div>

                        <div className={classes.textBox}>
                          <h4>{item.title}</h4>
                          <p className={classes.date}>
                            {date(item.updatedAt || item.createdAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default TravelHandbookDetail;
