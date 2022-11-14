import { stringToDate } from "./helpers/dateHandler";

export const tourValidator = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Trường này là bắt buộc";
  }

  if (!values.journey) {
    errors.journey = "Trường này là bắt buộc";
  }

  if (!values.description) {
    errors.description = "Trường này là bắt buộc";
  }

  if (!values.departureDates) {
    errors.departureDates = "Trường này là bắt buộc";
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
    errors.days = "Trường này là bắt buộc";
  }

  if (!values.nights) {
    errors.nights = "Trường này là bắt buộc";
  }

  if (!values.highlights) {
    errors.highlights = "Trường này là bắt buộc";
  }

  if (!values.cancellationPolicy) {
    errors.cancellationPolicy = "Trường này là bắt buộc";
  }

  if (
    (!isNaN(Number(values.currentPrice)) && values.currentPrice <= 0) ||
    isNaN(Number(values.currentPrice))
  ) {
    errors.currentPrice = "Trường này phải là số lớn hơn 0";
  }

  return errors;
};
