const getImagePath = (
  title: string,
  tag: string,
  formattedDate: { format: (arg0: string) => string }
) => {
  return `/api/og?title=${encodeURIComponent(title)}&tag=${encodeURIComponent(tag)}&date=${formattedDate.format("YYYY-MM-DD")}&v=10`;
};

export default getImagePath;
