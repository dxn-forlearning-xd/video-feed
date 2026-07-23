export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || '',
    },
  });

  if (!res.ok) {
    throw new Error(` ${res.status}`);
  }

  return res.json();
};
