const getImagePath = (
  title: string,
  tag: string,
  formattedDate: { format: (arg0: string) => string },
  size: "small" | "large" = "large"
) => {
  return `/api/og?title=${encodeURIComponent(title)}&tag=${encodeURIComponent(tag)}&date=${formattedDate.format("YYYY-MM-DD")}&size=${size}&v=4`;
};

export default getImagePath;
