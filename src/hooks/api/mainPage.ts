import { useEffect, useState, useCallback } from 'react';
import { fetchVideos, fetchMoreVideos } from '@/api/searchSlice';
import { useQuery } from '@tanstack/react-query';
import { useGenres } from '@/hooks/context/genresContext';
import { throttle } from 'lodash';
import { VideoItemType, VideoDataType } from '@/types';

export const useMain = () => {
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
            const items = Array.isArray(data.items) ? data.items : [];
            setVideoList(items);
            setNextPageToken(data.nextPageToken || null);
        }
    }, [data]);    

    const loadMoreVideos = useCallback(async () => {
        if (!nextPageToken || isFetching) return;

        try {
        const moreVideos = await fetchMoreVideos(genre, nextPageToken);

        const newItems = Array.isArray(moreVideos.items) ? moreVideos.items : [];
        setVideoList((prev) => [...prev, ...newItems]);
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

    return { videoList, isLoading, isFetching, isError, error }
}