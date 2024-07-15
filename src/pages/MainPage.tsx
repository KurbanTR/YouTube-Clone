import { useEffect } from 'react';
import { fetchVideos } from '../app/searchSlice';
import { useQuery } from '@tanstack/react-query';
import CardVideo from '../others/CardVideo';

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
          medium: {
              url: string;
          };
      };
  };
}

const MainPage = () => {
  const { data: videos, isLoading, isError, error } = useQuery<{ items: VideoItem[] }>({
    queryKey: ['main'],
    queryFn: () => fetchVideos('plagini 1.1.5'),
  });

  useEffect(() => {
    document.title = 'Главная - YouTube Clone';
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[85vh]">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Error: {error?.message || 'An error occurred'}</p>
      </div>
    );
  }

  if (!videos?.items?.length) {
    return (
      <div className="flex items-center justify-center h-[85vh]">
        <p className="text-white">No videos found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-6 2230res:grid-cols-5 1900res:grid-cols-4 1580res:grid-cols-3 1000res:grid-cols-2 gap-[2vw]">
        {videos.items.map((item, index) =>
          item.id.kind !== 'youtube#channel' && item?.id?.kind !== 'youtube#playlist' ? (
            <CardVideo item={item} key={index} type='video' />
          ) : (item?.id?.kind == 'youtube#playlist' ? (
            <CardVideo item={item} key={index} type='playlist' />
          ): null)
        )}
      </div>
    </div>
  );
};

export default MainPage;