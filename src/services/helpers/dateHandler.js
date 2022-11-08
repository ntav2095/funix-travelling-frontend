const MAX_YEAR = 9999;
const MIN_YEAR = 1800;

const isLeapYear = (year) =>
  (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

export function isValidDate(date, month, year) {
  if (isNaN(Number(date)) || isNaN(Number(month)) || isNaN(Number(year))) {
    return false;
  }

  const d = Number(date);
  const m = Number(month);
  const y = Number(year);

  if (d > 31 || d < 1 || m < 1 || m > 12 || y > MAX_YEAR || y < MIN_YEAR) {
    return false;
  }

  if (m === 2) {
    if (isLeapYear(y)) {
      return d <= 29;
    }
    return d <= 28;
  }

  if (m === 4 || m === 6 || m === 9 || m === 11) return d <= 30;

  return true;
}

// dd/mm/yyyy
export const stringToDate = (dateString) => {
  const dateArr = dateString.trim().split("/");
  if (dateArr.length !== 3) {
    return [new Error("Ngày không hợp lệ"), null];
  }

  const [d, m, y] = dateArr;
  if (!isValidDate(d, m, y)) {
    return [new Error("Ngày không hợp lệ"), null];
  }

  return [null, new Date(Number(y), Number(m) - 1, Number(d)).getTime()];
};
