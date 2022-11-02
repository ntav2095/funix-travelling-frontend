// main
import { Link } from "react-router-dom";

// components
import Layout from "../../layout/Default";

// css
import classes from "./TravelHandbook.module.css";

// mock
import stories from "../../mock/travelhandBook.mock";

function TravelHandbook() {
  return (
    <Layout>
      <div className={classes.travelHandbook}>
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
      </div>
    </Layout>
  );
}

export default TravelHandbook;
