import Layout from "../../layout/Default";

// assets
import { phoneNumber as phoneNumberImg } from "../../assets/images";

// css
import classes from "./TravelHandbookDetail.module.css";

// mock
import story from "../../mock/story.mock";

function TravelHandbookDetail() {
  return (
    <Layout>
      <div className={classes.travelHandbookDetail}>
        <div className={classes.story}>
          <h1>{story.title}</h1>

          <p
            className={classes.date}
          >{`Posted on ${story.date} by ${story.author}`}</p>

          <div className={classes.storyContent}>
            <p>{story.content}</p>
          </div>

          <div className={classes.relatedStories}></div>
        </div>

        <div className={classes.sidebar}>
          <div className={classes.contact}>
            <p className={classes.slogan}>Liên hệ càng sớm - Giá càng rẻ</p>
            <div className={classes.phoneNumber}>
              <img src={phoneNumberImg} alt="phone numbers" />
            </div>

            <p className="alternative">
              Hoặc để lại số điện thoại, chúng tôi sẽ gọi lại cho bạn sau ít
              phút !
            </p>

            <input type="number" placeholder="Số điện thoại của tôi là" />

            <button>YÊU CẦU GỌI LẠI</button>
          </div>

          <div className={classes.tours}></div>

          <div className={classes.stories}></div>
        </div>
      </div>
    </Layout>
  );
}

export default TravelHandbookDetail;
