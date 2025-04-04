import { useEffect, useState } from 'react';
import { fetchVideos, fetchMoreVideos } from '../api/searchSlice';
import { useQuery } from '@tanstack/react-query';
import CardVideo from '../others/CardVideo';
import { useGenres } from '../context/context';
import { throttle } from 'lodash';

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

interface VideoData {
  nextPageToken: string;
  items: VideoItem[];
}

const MainPage = () => {
  const { genre } = useGenres();
  const [videoList, setVideoList] = useState<VideoItem[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const { data, isLoading, isError, error } = useQuery<VideoData>({
    queryKey: ['main', genre],
    queryFn: () => fetchVideos(genre),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setVideoList(data.items);
      setNextPageToken(data.nextPageToken || null);
    }
  }, [data]);

  const loadMoreVideos = async () => {
    if (isFetching || !nextPageToken) return;

    setIsFetching(true);
    try {
      console.log('Загружаем новые видео...');
      const moreVideos = await fetchMoreVideos(genre, nextPageToken);
      setVideoList((prev) => [...prev, ...moreVideos.items]);
      setNextPageToken(moreVideos.nextPageToken || null);
    } catch (err) {
      console.error('Ошибка загрузки видео:', err);
    }
    setIsFetching(false);
  };

  const throttledLoadMoreVideos = throttle(loadMoreVideos, 5000); // Ограничиваем до 1 запроса в 5 сек

  useEffect(() => {
    const num = window.innerWidth <= 540 ? 2500 : 800;
    const interval = setInterval(() => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - num &&
        !isFetching &&
        nextPageToken
      ) {
        throttledLoadMoreVideos();
      }

      if (!nextPageToken) {
        console.log('Больше видео нет, останавливаем подгрузку.');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextPageToken, isFetching]);

  useEffect(() => {
    document.title = 'YouTube Clone';
  }, []);

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Ошибка: {error?.message || 'Что-то пошло не так'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-6 2230res:grid-cols-5 1900res:grid-cols-4 1580res:grid-cols-3 1000res:grid-cols-2 500res:grid-cols-1 gap-x-[1vw] gap-y-[3vw] 1000res:gap-x-[2vw] 540res:gap-y-[7vw]">
        {isLoading
          ? [...Array(32)].map((_, index) => <CardVideo key={index} type="video" isLoad />)
          : videoList.map((item, index) =>
              item.id.kind !== 'youtube#channel' && item.id.kind !== 'youtube#playlist' ? (
                <CardVideo item={item} key={index} type="video" />
              ) : item.id.kind === 'youtube#playlist' && (
                <CardVideo item={item} key={index} type="playlist" />
              )
            )}
        {window.innerWidth >=550 && [...Array(6)].map((_, index) => <CardVideo key={index} type="video" isLoad />)}
      </div>
      {isFetching && <p className="text-white text-center mt-4">Загрузка...</p>}
    </div>
  );
};

export default MainPage;