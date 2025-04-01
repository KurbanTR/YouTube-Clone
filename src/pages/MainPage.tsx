import { useEffect } from 'react';
import { fetchVideos } from '../api/searchSlice';
import { useQuery } from '@tanstack/react-query';
import CardVideo from '../others/CardVideo';
import { useGenres } from '../context/context';

interface VideoItem {
  id: {
      kind: string;
      videoId?: string;
      playlistId?: string;
      channelId?: string;
  };
  snippet: {
      title: string;
      channelId: string;
      channelTitle: string;
      publishTime: string;
      description: string;
      thumbnails: {
          high: {
              url: string;
          };
      };
  };
}

const MainPage = () => {
  const {genre} = useGenres()
  const { data: videos, isLoading, isError, error } = useQuery<{ items: VideoItem[] }>({
    queryKey: ['main', genre],
    queryFn: () => fetchVideos(genre),
  });

  useEffect(() => {
    document.title = 'Главная - YouTube Clone';
  }, []);

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Error: {error?.message || 'An error occurred'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-6 2230res:grid-cols-5 1900res:grid-cols-4 1580res:grid-cols-3 1000res:grid-cols-2 500res:grid-cols-1 gap-x-[1vw] gap-y-[3vw] 1000res:gap-x-[2vw] 540res:gap-y-[7vw]">
      {isLoading ? (
        [...Array(32)].map((_, index) => <CardVideo key={index} type="video" isLoad />)
      ) : (
        videos?.items?.map((item, index) =>
          item.id.kind !== 'youtube#channel' && item.id.kind !== 'youtube#playlist' ? (
            <CardVideo item={item} key={index} type="video" />
          ) : item.id.kind === 'youtube#playlist' ? (
            <CardVideo item={item} key={index} type="playlist" />
          ) : null
        )
      )}
      </div>
    </div>
  );
};

export default MainPage;