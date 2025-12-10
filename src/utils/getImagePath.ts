const getImagePath = (title: string, tag: string, createdDate: string, updatedDate?: string) => {
  return `/api/og?title=${encodeURIComponent(title)}&tag=${encodeURIComponent(tag)}&date=${createdDate}?v=${updatedDate ? updatedDate : ""}`;
};

export default getImagePath;
