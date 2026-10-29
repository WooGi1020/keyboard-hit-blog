export const OG_IMAGE_VERSION = "6";
export const THUMBNAIL_IMAGE_VERSION = "4";

type ImageOptions = {
  theme?: "light" | "dark";
  variant?: "post" | "home" | "collection" | "thumbnail";
};

const getImagePath = (
  title: string,
  tag: string,
  createdDate: string,
  updatedDate?: string,
  options: ImageOptions = {}
) => {
  const query = new URLSearchParams({
    title,
    tag,
    createdDate,
    updatedDate: updatedDate || "",
    theme: options.theme || "light",
    variant: options.variant || "post",
    v: OG_IMAGE_VERSION,
  });
  if (options.variant === "thumbnail") query.set("art", THUMBNAIL_IMAGE_VERSION);
  return `/api/og?${query.toString()}`;
};
export default getImagePath;
