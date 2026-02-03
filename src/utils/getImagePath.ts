const getImagePath = (title: string, tag: string, createdDate: string, updatedDate?: string) => {
  return `/api/og?title=${encodeURIComponent(title)}&tag=${encodeURIComponent(tag)}&createdDate=${createdDate}&updatedDate=${updatedDate ? updatedDate : ""}&v=1`;
};

export default getImagePath;
