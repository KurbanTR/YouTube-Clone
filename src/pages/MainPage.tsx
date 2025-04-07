import { useEffect, useState, useCallback } from 'react';
import { fetchVideos, fetchMoreVideos } from '@/api/searchSlice';
import { useQuery } from '@tanstack/react-query';
import CardVideo from '@/others/CardVideo';
import { useGenres } from '@/hooks/context/genresContext';
import { throttle } from 'lodash';
import { VideoItemType, VideoDataType } from '@/types';

const MainPage = () => {
  const { genre } = useGenres();
  const [videoList, setVideoList] = useState<VideoItemType[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const { data, isLoading, isError, error } = useQuery<VideoDataType>({
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

  const loadMoreVideos = useCallback(async () => {
    if (!nextPageToken || isFetching) return;

    try {
      const moreVideos = await fetchMoreVideos(genre, nextPageToken);
      setVideoList((prev) => [...prev, ...moreVideos.items]);
      setNextPageToken(moreVideos.nextPageToken || null);
    } catch (err) {
      console.error('Ошибка загрузки видео:', err);
    }

    setIsFetching(false);
  }, [genre, nextPageToken]);

  const throttledLoadMoreVideos = useCallback(throttle(loadMoreVideos, 5000), [loadMoreVideos]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2500 && nextPageToken) {
        throttledLoadMoreVideos();
      }
      if (!nextPageToken) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextPageToken, throttledLoadMoreVideos]);

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
    <div className="min-h-screen p-4 500res:px-0">
      <div className="grid grid-cols-6 2230res:grid-cols-5 1900res:grid-cols-4 1580res:grid-cols-3 1000res:grid-cols-2 500res:grid-cols-1 gap-x-[.1vw] gap-y-[3vw] 1000res:gap-x-[.5vw]  500res:gap-x-0 540res:gap-y-[7vw]">
        {isLoading
          ? [...Array(32)].map((_, index) => <CardVideo key={index} type="video" isLoad />)
          : videoList.map((item, index) =>
              item.id.kind !== 'youtube#channel' && item.id.kind !== 'youtube#playlist' ? (
                <CardVideo item={item} key={index} index={index} type="video" />
              ) : item.id.kind === 'youtube#playlist' && (
                <CardVideo item={item} key={index} type="playlist" />
              )
            )}
        {window.innerWidth >= 550 && [...Array(6)].map((_, index) => <CardVideo key={index} type="video" isLoad />)}
      </div>
      {isFetching && <p className="text-white text-center mt-4">Загрузка...</p>}
    </div>
  );
};

export default MainPage;
