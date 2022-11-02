// main
import { Link } from "react-router-dom";

// components
import ProductItem from "../../components/ProductItem";
import Layout from "../../layout/Default";

// assets
import { one, phoneNumber } from "../../assets/images";

// css
import classes from "./TravelHandbookDetail.module.css";

// mock
import { story, relatedStories } from "./mock";

function TravelHandbookDetail() {
  return (
    <Layout>
      <div className={classes.travelHandbookDetail}>
        <div className={classes.story}>
          <article>
            <div className={classes.storyHeader}>
              <h1>{story.title}</h1>
              <p className={classes.date}>
                Posted on <span>{story.date}</span> by{" "}
                <Link to="/">{story.author}</Link>
              </p>
            </div>

            <div className={classes.storyContent}>
              <p>{story.content}</p>
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
          </article>
        </div>

        <div className={classes.sidebar}>
          {/* contact  */}
          <div className={classes.contact}>
            <p className={classes.slogan}>Liên hệ càng sớm - Giá càng rẻ</p>
            <div className={classes.phoneNumber}>
              <img src={phoneNumber} alt="phone numbers" />
            </div>

            <p className={classes.alternative}>
              Hoặc để lại số điện thoại, chúng tôi sẽ gọi lại cho bạn sau ít
              phút !
            </p>

            <input type="number" placeholder="Số điện thoại của tôi là" />

            <button>YÊU CẦU GỌI LẠI</button>
          </div>

          <aside className={classes.tours}>
            <h2>TOUR HOT</h2>

            <ul>
              <li>
                <ProductItem
                  to="/"
                  image={one}
                  text="Kinh nghiệm du lịch tự túc Sapa 3 ngày 2 đêm"
                  oldPrice={100000}
                  curPrice={500000}
                />
              </li>
              <li>
                <ProductItem
                  to="/"
                  image={one}
                  text="Kinh nghiệm du lịch tự túc Sapa 3 ngày 2 đêm"
                  oldPrice={100000}
                  curPrice={500000}
                />
              </li>{" "}
              <li>
                <ProductItem
                  to="/"
                  image={one}
                  text="Kinh nghiệm du lịch tự túc Sapa 3 ngày 2 đêm"
                  oldPrice={100000}
                  curPrice={500000}
                />
              </li>{" "}
              <li>
                <ProductItem
                  to="/"
                  image={one}
                  text="Kinh nghiệm du lịch tự túc Sapa 3 ngày 2 đêm"
                  oldPrice={100000}
                  curPrice={500000}
                />
              </li>{" "}
              <li>
                <ProductItem
                  to="/"
                  image={one}
                  text="Kinh nghiệm du lịch tự túc Sapa 3 ngày 2 đêm"
                  oldPrice={100000}
                  curPrice={500000}
                />
              </li>
            </ul>
          </aside>

          <aside className={classes.stories}>
            <h2>BÀI VIẾT MỚI</h2>

            <ul>
              {" "}
              <li>
                <ProductItem
                  to="/"
                  image={one}
                  text="Kinh nghiệm du lịch tự túc Sapa 3 ngày 2 đêm"
                />
              </li>{" "}
              <li>
                <ProductItem
                  to="/"
                  image={one}
                  text="Kinh nghiệm du lịch tự túc Sapa 3 ngày 2 đêm"
                />
              </li>{" "}
              <li>
                <ProductItem
                  to="/"
                  image={one}
                  text="Kinh nghiệm du lịch tự túc Sapa 3 ngày 2 đêm"
                />
              </li>{" "}
              <li>
                <ProductItem
                  to="/"
                  image={one}
                  text="Kinh nghiệm du lịch tự túc Sapa 3 ngày 2 đêm"
                />
              </li>{" "}
              <li>
                <ProductItem
                  to="/"
                  image={one}
                  text="Kinh nghiệm du lịch tự túc Sapa 3 ngày 2 đêm"
                />
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export default TravelHandbookDetail;
