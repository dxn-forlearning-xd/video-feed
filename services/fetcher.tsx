import { GetVideoResponse } from "@/types/types";

export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || "",
    },
  });

  if (!res.ok) {
    throw new Error(` ${res.status}`);
  }

  return res.json();
};

export const getKey = (
  pageIndex: number,
  previousPageData: GetVideoResponse | null,
) => {
  if (previousPageData && !previousPageData.videos?.length) return null;

  return `https://api.pexels.com/v1/videos/search?query=cat&page=${pageIndex + 1}&per_page=15`;
};
