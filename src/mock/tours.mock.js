import { v4 as uuid } from "uuid";
const photo = "https://picsum.photos/300/200";

const tour = {
  images: [photo, photo, photo, photo, photo, photo, photo],
  title: "Tua Nha Trang 4 Ngày 3 Đêm",
  time: "4 Ngày 3 đêm",
  destination: "Nha Trang - Hà Nội -Nha Trang",
  price: 5500550,
};

const createTour = () => ({ ...tour, _id: uuid() });
const tours = [
  createTour(),
  createTour(),
  createTour(),
  createTour(),
  createTour(),
  createTour(),
];

export default tours;
