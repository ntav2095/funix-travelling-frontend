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
  }

  if (!values.duration) {
    errors.duration = "Trường này là bắt buộc";
  }

  if (!values.highlights) {
    errors.highlights = "Trường này là bắt buộc";
  }

  if (!values.cancellationPolicy) {
    errors.cancellationPolicy = "Trường này là bắt buộc";
  }

  return errors;
};
