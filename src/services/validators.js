import { stringToDate } from "./helpers/dateHandler";

const REQUIRED = "Trường này là bắt buộc";

export const tourValidator = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = REQUIRED;
  }

  if (!values.journey) {
    errors.journey = REQUIRED;
  }

  if (!values.description) {
    errors.description = REQUIRED;
  }

  if (!values.departureDates) {
    errors.departureDates = REQUIRED;
  } else {
    values.departureDates
      .split("\n")
      .filter((item) => item.trim())
      .forEach((dateString) => {
        const [error, timeStamp] = stringToDate(dateString);
        if (error) {
          errors.departureDates = "Ngày không hợp lệ: " + dateString;
        }
      });
  }

  if (!values.days) {
    errors.days = REQUIRED;
  }

  if (values.days < 0) {
    errors.days = "Phải lớn hơn 0";
  }

  if (values.nights <= 0) {
    errors.nights = "Phải lớn hơn 0";
  }

  if (!values.nights) {
    errors.nights = REQUIRED;
  }

  if (!values.highlights) {
    errors.highlights = REQUIRED;
  }

  if (!values.cancellationPolicy) {
    errors.cancellationPolicy = REQUIRED;
  }

  if (!values.currentPrice) {
    errors.currentPrice = REQUIRED;
  }

  if (values.currentPrice <= 0) {
    errors.currentPrice = "Phải lớn hơn 0";
  }

  if (values.oldPrice <= 0) {
    errors.oldPrice = "Phải lớn hơn 0";
  }

  if (!values.thumb) {
    errors.thumb = REQUIRED;
  }

  if (values.slider.length === 0) {
    errors.slider = REQUIRED;
  }

  return errors;
};
