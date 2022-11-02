const story = {
  image: require("../assets/images/sec_inbound_tour_bg.jpg"),
  title: "Kinh nghiệm Phượt Tây Bắc mùa Đông",
  description:
    "Sà bài đi!!! Việt Anh vừa kết thúc chuyến du lịch Lào tự túc trong 10 ngày,...",
  date: "02/11/2017",
};

const createStory = (id) => ({ ...story, id });

export default [
  createStory(1),
  createStory(2),
  createStory(3),
  createStory(4),
  createStory(5),
];
