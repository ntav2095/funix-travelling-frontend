import { format } from "date-fns";

function dateFormater(dateString) {
  return format(new Date(dateString), "MM/dd/yyyy");
}

export default dateFormater;
