import { aboutCompany } from "../../assets/images";
import usePageTitle from "../../hooks/usePageTitle";
import styles from "./About.module.css";

function About() {
  usePageTitle("Tổng quan công ty || Go Travel");

  return (
    <div>
      <div className={styles.about}>
        <div className={styles.image}>
          <img src={aboutCompany} alt="About our company" />
        </div>

        <h3>Câu chuyện của chúng tôi</h3>
        <p>
          365 Travel chính là một câu chuyện thành công mà chúng tôi muốn chia
          sẻ với các bạn. 365 Travel được thành lập vào năm 2006 bởi một cặp vợ
          chồng trẻ từ Hà Nôi. Tommy Nguyên phụ trách quản lý và sản phẩm, trong
          khi Cindy Nguyên nhận trách nhiệm mảng kinh doanh. Mặc dù có kinh
          nghiệm nhiều năm làm việc tại một công ty tour du lịch trước đó, họ
          vẫn còn nhiều e ngại khi tiếp cận các đối tác nước ngoài, vì nhiều
          người sẽ nghĩ rằng 27 tuổi là quá trẻ để làm chủ một doanh nghiệp.
        </p>

        <p>
          Cũng giống như nhiều startup khác, những ngày đầu tiên chúng tôi đã
          gặp rất nhiều khó khăn. Văn phòng thì nhỏ, các đơn đặt mua đến chậm
          chạp, chủ yếu từ bạn bè và người thân muốn đặt vé và phòng khách sạn.
        </p>

        <h3>Nhận diện thương hiệu</h3>

        <p>
          Giá trị của chúng tôi là giúp việc kinh doanh của công ty tiến hành
          một cách rất có nguyên tắc. Slogan của chúng tôi là: “Experience is
          true value” trải nghiệm tạo nên giá trị đích thực.
        </p>

        <p>
          Tên 365 Travel xuất phát từ thực tế rằng chúng tôi sẵn sàng có mặt để
          phục vụ bạn 24/7, 365 ngày trong 1 năm và là một đối tác kinh doanh uy
          tín, đáng tin cậy với “Sự chăm sóc liên tục” và “khiêm tốn” để chuẩn
          bị cho tương lai và chúng tôi luôn luôn ghi nhớ rằng khách hàng và đối
          thủ cạnh tranh là yếu tố cần thiết để cải thiện bản thân doanh nghiệp.
          “Ngay thẳng” có nghĩa là tính minh bạch và trách nhiệm đi đôi với cảm
          hứng cũng như thách thức trong công việc. Sống và làm việc theo những
          giá trị đặc biệt, chia sẻ đam mê và cam kết tiếp tục phấn đấu, sẵn
          sàng cho những nấc thang cao hơn.
        </p>

        <p>
          Chúng tôi hy vọng sẽ là người bạn đồng hành đáng tin cậy của bạn trong
          tương lai!
        </p>
      </div>
    </div>
  );
}

export default About;
