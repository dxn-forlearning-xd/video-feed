type User = {
  id: number;
  name: string;
  url: string;
};
export type VideoFile = {
  id: number;
  width: number;
  height: number;
  link: string;
};
export type Video = {
  id: number;
  height: number;
  width: number;
  duration: number;
  tags: string[];
  url: string;
  image: string;
  user: User;
  video_files: VideoFile[];
};

export type GetVideoResponse = {
  page: number;
  per_page: number;
  videos: Video[];
  total_results: number;
  next_page: string;
  url: string;
};
