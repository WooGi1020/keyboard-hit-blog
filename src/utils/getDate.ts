import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function getFormattedDate(dateString: string, format: string = "YYYY. MM. DD") {
  return dayjs.utc(dateString).format(format);
}

export function parseDate(dateString: string): dayjs.Dayjs {
  return dayjs.utc(dateString);
}
