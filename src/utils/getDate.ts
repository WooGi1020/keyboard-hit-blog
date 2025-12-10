import dayjs from "dayjs";

export function getFormattedDate(dateString: string, format: string = "YYYY. MM. DD") {
  return dayjs(dateString).format(format);
}

export function parseDate(dateString: string): dayjs.Dayjs {
  return dayjs(dateString);
}
