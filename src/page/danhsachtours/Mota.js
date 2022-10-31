import React from "react";
import { Tab } from "semantic-ui-react";

const panes = [
  {
    menuItem: "Mô tả",
    render: () => (
      <Tab.Pane attached={false}>
        <div class="lich_trinh_title other_news_title">
          <span>
            Đài Loan hòn đảo xinh đẹp ở phía Đông Nam Trung Quốc. Bên cạnh các
            di tích lịch sử văn hóa đa sắc màu, du khách còn bị níu chân bởi nền
            ẩm thực, phong cảnh thiên nhiên tuyệt với, mua sắm tại chợ đêm với
            vô số chủng loại hàng hóa. Không chỉ được biết đến bởi vẻ đẹp thiên
            nhiên, Đài Loan còn được mệnh danh là “con rồng châu Á” với nền kinh
            tế phát triển vào hàng bậc nhất ở khu vực châu Á.
          </span>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Lịch Trình",
    render: () => (
      <Tab.Pane attached={false}>
        <div
          class="woocommerce-Tabs-panel woocommerce-Tabs-panel--lich-trinh panel entry-content "
          id="tab-lich-trinh"
          role="tabpanel"
          aria-labelledby="tab-title-lich-trinh"
        >
          <h2 class="yikes-custom-woo-tab-title yikes-custom-woo-tab-title-lich-trinh">
            Lịch Trình
          </h2>
          <p>
            <strong>NGÀY 1: VIỆT NAM – ĐÀI BẮC (Ăn: Tối) </strong>
          </p>
          <p>
            <strong>10h30:</strong> Xe và hướng dẫn viên đón quý khách tại điểm
            hẹn khởi hành đưa quý khách đi sân bay Quốc tế Nội Bài, quý khách
            làm thủ tục cho chuyến bay VJ khởi hành đi Đài Bắc lúc{" "}
            <strong>14h15</strong>. Đoàn tự túc ăn trưa tại sân bay.
          </p>
          <p>
            <strong>14h15:</strong> Đáp chuyến bay thẳng VJ từ Hà Nội đi Đài Bắc
            thủ đô của Đài Loan. Sau khi đoàn hoàn thành thủ tục xuất nhập cảnh
            tại sân bay Đào Viên, HDV sẽ đón và đưa đoàn đi ăn tối và nhận phòng
            khách sạn. Đoàn sẽ nghỉ đêm khách sạn 3* tại Đài Bắc.
          </p>
          <p>
            <strong>NGÀY 2: ĐÀI BẮC – ĐÀI TRUNG (Ăn: Sáng, Trưa, Tối)</strong>
          </p>
          <p>
            <strong>Sáng:</strong> Ăn sáng. Trả phòng khách sạn đoàn lên xe khởi
            hành đi tham quan <strong>Công viên Dương Minh Sơn</strong>{" "}
            <em>
              là một trong 8 vườn quốc gia lớn của Đài Loan, với địa hình núi
              lửa đặc thù, xen lẫn những thung lũng yên bình và quần thể động
              thực vật phong phú
            </em>
            .. Điểm độc đáo nhất của chiếc đồng hồ hoa này là nước được thiết kế
            chảy xung quanh theo vòng tròn và nhạc được phát từng giờ.
          </p>
          <p>
            Tiếp tục đoàn đi thăm{" "}
            <strong>Công viên địa chất Dã Liễu (Yehliu)</strong> –{" "}
            <em>
              nổi tiếng với những tảng đá có hình dạng kỳ lạ, những di tích hóa
              thạch có giá trị lịch sử.
            </em>{" "}
            Sau đó, xe đưa đoàn tham quan <strong>Phố Cổ Thập Phần</strong>{" "}
            <em>
              tại đây đoàn sẽ Thả Đèn Trời Hoa Đăng với ước nguyện riêng cho
              mình
            </em>
            . Sau đó đoàn di chuyển đến thăm quan{" "}
            <strong>Thác nước Thập</strong> <strong>Phần</strong> –{" "}
            <em>là điểm đến dành cho những ai yêu thích thiên nhiên</em>. Dọc
            theo đường rừng, du khách có thể đến thăm những ngôi làng cổ, chiêm
            ngưỡng những thác nước đổ trắng xóa, cùng phong cảnh đẹp mê hồn của
            núi rừng.
          </p>
          <p>
            <strong>Trưa:</strong> Đoàn đi ăn trưa tại nhà hàng.
          </p>
          <p>
            <strong>Chiều:</strong> Đoàn sẽ ghé thăm{" "}
            <strong>Đài Tưởng Niệm Trung Chính </strong>–{" "}
            <em>
              Tướng Trung Chính đảm nhiệm các chức vụ thống soái tối cao các
              chiến khu chiến tranh kháng Nhật
            </em>
            . Tiếp theo hành trình đoàn sẽ di chuyển đến Đài trung ăn tối, nhận
            phòng khách sạn.
          </p>
          <p>
            Buổi tối đoàn sẽ đến chợ đêm nổi tiếng lớn nhất Đài Loan, đó là{" "}
            <strong>Chợ đêm Phùng Giáp</strong>. Nghỉ đêm tại Đài trung.
          </p>
          <p>
            <strong>NGÀY 3: ĐÀI TRUNG – CAO HÙNG (Ăn: Sáng, Trưa, Tối) </strong>
          </p>
          <p>
            <strong>Sáng:</strong> Ăn sáng tại khách sạn, Xe đưa đoàn ra bến tàu
            đoàn sẽ du ngoạn trên đầm và đắm chìm trong cảnh sắc Khu phong cảnh{" "}
            <strong>Đầm Nhật Nguyệt</strong> –{" "}
            <em>
              là đầm thiên nhiên lớn nhất của Đài Loan, thuộc quận Nam Đầu, miền
              trung Đài Loan.
            </em>{" "}
            Đoàn thăm <strong>Văn Võ Miếu</strong>{" "}
            <em>
              ở Đài Loan là nơi thờ Khổng Tử (Văn Miếu) và Quan Công (Võ Miếu)
              nằm ở bờ hồ phía bắc của <strong>Nhật Nguyệt Hồ</strong>
            </em>
            .
          </p>
          <p>
            <strong>Trưa:</strong> Ăn trưa tại nhà hàng.
          </p>
          <p>
            Sau đó sẽ di chuyển đến <strong>Trung Đài Thiền Tự</strong>. Năm
            1987, Đại lão Hòa thượng Duy Giác đã cho dựng chùa Linh Tuyền để làm
            nơi tu học cho các đệ tử. Dần dần, số đệ tử ngày càng đông nên chùa
            Linh Tuyền không còn đáp ứng đủ về chỗ ở. Vì vậy, năm 1992, ý tưởng
            xây dựng Trung Đài Thiền Tự đã được khởi xướng.Sau 3 năm hoạch định
            và 7 năm xây dựng, đại công trình Trung Đài Thiền Tự đã được khánh
            thành vào ngày 1/9/2001, mở màn một kỷ nguyên mới trong việc hoằng
            dương Phật pháp ở Đài Loan. Đoàn thăm cửa hàng đặc sản Nấm Linh Chi.
          </p>
          <p>
            <strong>Tối:</strong> Buổi tối đoàn sẽ di chuyển đến Cao Hùng ăn
            tối, đoàn tự do tham quan <strong>Chợ đêm Liuho</strong> (Lục Hợp)
            chạy dài hơn 300 m trên con phố Liuhe của thành phố Cao Hùng. Cứ về
            đêm lại trở thành địa điểm náo nhiệt với đèn điện đủ màu sắc cùng
            những gian hàng bày bán quần áo và đồ ăn hấp dẫn., tự do mua sắm tại
            cửa hàng UNIQLO. Nghỉ đêm tại Cao Hùng.
          </p>
          <p>
            <strong>NGÀY 4: CAO HÙNG – ĐÀI BẮC (Ăn: Sáng, Trưa, Tối)</strong>
          </p>
          <p>
            <strong>Sáng:</strong> Sau khi ăn sáng trả phòng khách sạn, đoàn đi
            thăm <strong>Phật Quang Sơn</strong>, tại nơi đây quý khách có thể
            chiêm ngưỡng bức Phật tượng cao nhất thế giới – Đại Phật Quang là
            nơi hội tụ tín đồ Phật giáo. Đoàn mua sắm tại Cửa hàng đặc sản Đài
            Loan (bánh dứa, bánh đậu xanh, bánh mat – cha…), sau đó Xe và HDV
            đưa đoàn ghé thăm <strong>Trung tâm vàng Bạc đá quý</strong> lớn
            nhất của Đài Loan tại Cao Hùng.
          </p>
          <p>
            Tiếp đó đoàn ghé thăm <strong>đầm Liên Trì</strong> – khu vực ven
            đầm trồng nhiều hoa sen,là nơi danh tiếng được liệt vào tám cảnh nổi
            tiếng Phượng Sơn thời nhà Thanh, được mệnh danh là Hương sen mộng
            Thủy. Vì hồ rộng bằng nửa dãy núi Bình Sơn và tháp Long Hổ nghiêng
            mình soi ánh mặt nước nên còn được mệnh danh là nắng chiều Liên Đàm.
          </p>
          <p>
            <strong>Trưa:</strong> Đoàn ăn trưa tại nhà hàng.
          </p>
          <p>
            <strong>Chiều:</strong> Quý khách ghé thăm vườn trà và thưởng thức
            Trà Ô Long đặc sản nổi tiếng của vùng. Sau đó lên xe khởi hành về
            Đài Bắc.
          </p>
          <p>
            <strong>Tối:</strong> Đoàn thưởng thức món{" "}
            <strong>lẩu Shabu</strong>. Tự do dạo chơi tham qua mua sắm tại{" "}
            <strong>chợ đêm Sỹ Lâm</strong>, phố đi bộ Tây Môn Đinh, và nghỉ đêm
            tại khách sạn 3* thành phố Đài Bắc.
          </p>
          <p>
            <strong>NGÀY 5: ĐÀI BẮC – HÀ NỘI (Ăn: Sáng, Trưa)</strong>
          </p>
          <p>
            <strong>Sáng:</strong> Sau bữa sáng. Đoàn tham quan{" "}
            <strong>Chùa Long Sơn</strong> (Longshan) – ngôi chùa cổ nhất Đài
            Loan có lịch sử hơn 300 năm.
          </p>
          <p>
            <strong>Tháp Taipei:</strong> là tòa nhà cao 101 tầng nổi tiếng nhất
            Đài Loan (tự túc chi phí lên tầng 89 của tòa tháp), do đại kiến trúc
            sư Tổ Nguyên dốc nhiều tâm huyết để thiết kế.Tiếp đó quý khách có
            thể tự do mua sắm trong khu thương mại sầm uất này với vô số mặt
            hàng cao cấp đến từ khắp nơi trên thế giới.
          </p>
          <p>
            <strong>Trưa:</strong> Đoàn ăn trưa, nghỉ ngơi tại nhà hàng.
          </p>
          <p>
            <strong>Chiều:</strong> Xe đưa quý khách di thăm{" "}
            <strong>Trung tâm đá quý Lucky Gem Stone</strong>. Đoàn tham quan
            mua sắm tại cửa hàng miễn thuế cửa hàng đá phong thủy Tỳ Hưu. Sau đó
            quý khách đi ra sân bay làm thủ tục lên máy bay đáp chuyến bay về Hà
            Nội lúc <strong>19h00</strong>. Đoàn tự túc ăn tối tại sân bay.
          </p>
          <p>
            <strong>21h10</strong> Về tới Nội Bài xe đón đoàn về Hà Nội. Chia
            tay kết thúc chương trình
          </p>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Quy Định Tour",
    render: () => (
      <Tab.Pane attached={false}>
        <div
          class="woocommerce-Tabs-panel woocommerce-Tabs-panel--quy-dinh-tour panel entry-content "
          id="tab-quy-dinh-tour"
          role="tabpanel"
          aria-labelledby="tab-title-quy-dinh-tour"
        >
          <h2 class="yikes-custom-woo-tab-title yikes-custom-woo-tab-title-quy-dinh-tour">
            Quy định Tour
          </h2>
          <p>
            <strong>Giá tour trẻ em:</strong>
          </p>
          <ul>
            <li>Từ 1-4 tuổi miễn phí (bố mẹ tự lo mọi chi phí liên quan).</li>
            <li>
              Từ 5-9 tuổi tính 75% giá tour (ăn nguyên suất, ngủ chung giường bố
              mẹ).
            </li>
            <li>Từ 10 tuổi trở lên tính như người lớn.</li>
          </ul>
          <p>
            <strong>Phụ thu:</strong>
          </p>
          <ul>
            <li>Phụ thu phòng đơn: 35000đ/khách/1 đêm</li>
            <li>
              Phu thu khách nước ngoài: 10$/khách để làm thủ tục khai báo với
              Công an Hà Giang
            </li>
            <li>
              Phụ thu đón hoặc tiễn sân bay một lượt: 450.000đ/01 xe 07 chỗ
            </li>
          </ul>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Giá Bao Gồm",
    render: () => (
      <Tab.Pane attached={false}>
        {" "}
        <div
          class="woocommerce-Tabs-panel woocommerce-Tabs-panel--gia-bao-gom panel entry-content "
          id="tab-gia-bao-gom"
          role="tabpanel"
          aria-labelledby="tab-title-gia-bao-gom"
        >
          <h2 class="yikes-custom-woo-tab-title yikes-custom-woo-tab-title-gia-bao-gom">
            Giá bao gồm
          </h2>
          <p>
            <em>
              <strong>Tặng 1 bữa lẩu Shabu. </strong>
            </em>
          </p>
          <p>
            <em>
              <strong>
                Thăm quan Phật Quang Sơn Tự bức tượng phật vàng cao 120m.
              </strong>
            </em>
          </p>
          <p>
            <em>
              <strong>
                Thả Đèn Trời cùng với những ước nguyện của riêng mình.
              </strong>
            </em>
          </p>
          <p>
            <em>
              <strong>Thăm quan Công viên địa chất Dã Liễu.</strong>
            </em>
          </p>
          <p>
            <em>
              <strong>
                Công viên Dương Minh Sơn là một trong 8 vườn quốc gia lớn tại
                Đài Loan.
              </strong>
            </em>
          </p>
          <p>
            <em>
              <strong>
                Viếng thăm Đài tượng niệm Tưởng Giới Thạch và Viện Bảo tàng Quốc
                Gia.
              </strong>
            </em>
          </p>
          <p>
            <em>
              <strong>
                Thăm quan Văn Võ Miếu nơi thờ Khổng Tử và Quan Công
              </strong>
            </em>
          </p>
          <p>
            <em>
              <strong>
                Viếng thăm ngôi Chùa cổ kính Long Sơn có hơn 300 năm tuổi
              </strong>
            </em>
          </p>
          <p>
            <em>
              <strong>
                Thưởng thức các món ăn và mua sắm tại các khu chợ đêm Sỹ Lâm,
                Đài Băc, Lục Hợp
              </strong>
            </em>
          </p>
          <p>
            <em>
              <strong>Hướng dẫn viên suốt tuyến </strong>
            </em>
          </p>
          <p>
            <em>
              <strong>Ăn ở khách sạn dịch vụ 3-4 sao tiêu chuẩn quốc tế</strong>
            </em>
          </p>
          <p>
            <em>
              <strong>Bảo hiểm toàn cầu: 220.000.000 vnđ</strong>
            </em>
          </p>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Đánh giá",
    render: () => <></>,
  },
];

const Mota = () => <Tab menu={{ secondary: true }} panes={panes} />;

export default Mota;
