import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  vie: {
    translation: {
      header: {
        home: "Trang chủ",
        about: "Về công ty",
        contact: "Liên hệ",
        viTours: "Tours trong nước",
        euTours: "Tours châu Âu",
        visaService: "Visa",
        travelHandbook: "Cẩm nang du lịch",
        intro: "Giới thiệu",
      },
      errorMessage: {
        offline: "Bạn đang offline. Vui lòng kiểm tra kết nối internet.",
        networkError: "Lỗi kết nối: có thể server đã sập.",
      },
    },
  },
  eng: {
    translation: {
      header: {
        home: "Home",
        about: "Company",
        contact: "Contact",
        viTours: "VN Tours",
        euTours: "EU Tours",
        visaService: "Visa",
        travelHandbook: "Travel handbook",
        intro: "About",
      },
      errorMessage: {
        offline: "You are offline. Please check your internet connection.",
        networkError: "Network error: server maybe die.",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources,
    lng: "vie", // if you're using a language detector, do not define the lng option
    fallbackLng: "eng",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
