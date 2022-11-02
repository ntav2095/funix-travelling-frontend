// main
import { Link } from "react-router-dom";

// components
import Layout from "../../layout/Default";

// css
import classes from "./TravelHandbookDetail.module.css";

// mock
import { story, relatedStories } from "./mock";

function TravelHandbookDetail() {
  return (
    <Layout sidebarRight primary>
      <div className={classes.story}>
        <div className={classes.storyHeader}>
          <h1>{story.title}</h1>
          <p className={classes.date}>
            Posted on <span>{story.date}</span> by{" "}
            <Link to="/">{story.author}</Link>
          </p>
        </div>

        <div className={classes.storyContent}>
          <div>{story.content}</div>
        </div>

        <div className={classes.relatedStories}>
          <p className={classes.relatedStoriesTitle}>Bài viết liên quan</p>
          <ul>
            {relatedStories.map((item) => (
              <li key={item.id} className={classes.relatedStory}>
                <Link to="/">
                  <div className={classes.relatedStory}>
                    <div
                      className={classes.image}
                      style={{ backgroundImage: `url(${item.image})` }}
                    >
                      {/* <img src={item.image} alt={item.title} /> */}
                    </div>

                    <div className={classes.textBox}>
                      <h4>{item.title}</h4>
                      <p className={classes.date}>{item.date}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default TravelHandbookDetail;
