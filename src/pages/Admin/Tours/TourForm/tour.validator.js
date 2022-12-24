const isEmptyDelta = (delta) => {
  if (!delta) return true;
  const ops = delta.ops;
  if (!ops) return true;
  return ops.length === 1 && !Boolean(ops[0].insert.trim());
};

const REQUIRED = "Bắt buộc";

const tourValidator = (values) => {
  const errors = {};

  if (!values.code) {
    errors.code = REQUIRED;
  }

  if (!values.name) {
    errors.name = REQUIRED;
  }

  if (!values.journey) {
    errors.journey = REQUIRED;
  }

  if (!values.countries) {
    errors.countries = REQUIRED;
  }

  if (!values.description) {
    errors.description = REQUIRED;
  }

  if (isEmptyDelta(values.highlights)) {
    errors.highlights = REQUIRED;
  }

  if (values.departureDates.length === 0) {
    errors.departureDates = REQUIRED;
  }

  if (!values.days) {
    errors.days = REQUIRED;
  }

  if (values.days && values.days <= 0) {
    errors.days = "Phải lớn hơn 0";
  }

  if (!values.nights) {
    errors.nights = REQUIRED;
  }

  if (values.nights && values.nights <= 0) {
    errors.nights = "Phải lớn hơn 0";
  }

  if (
    !errors.days &&
    !errors.nights &&
    Math.abs(values.days - values.nights) > 1
  ) {
    errors.nights = "Số ngày - đêm không hợp lệ";
    errors.days = "Số ngày - đêm không hợp lệ";
  }

  if (!values.price) {
    errors.price = REQUIRED;
  }

  if (values.price && values.price <= 0) {
    errors.price = "Phải lớn hơn 0";
  }

  if (!values.thumb) {
    errors.thumb = REQUIRED;
  }

  if (!values.banner) {
    errors.banner = REQUIRED;
  }

  if (values.category.length === 0) {
    errors.category = REQUIRED;
  }

  return errors;
};

export default tourValidator;
