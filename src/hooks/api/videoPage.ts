import { fetchComments, fetchVideoById, fetchVideoVideos } from "@/api/searchSlice";
import { CommentItemType, VideoItemType, VideoType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useVideo = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [visibleDescription, setVisibleDescription] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number>(0)
    
    const videoId = searchParams.get('v') || '';
    const time = searchParams.get("t") || '';
    const videoTime = time && /^\d+s$/.test(time) ? parseInt(time.replace("s", ""), 10) : 0;

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.delete("t");
    
        if (/^\d+s$/.test(time)) setStartTime(videoTime);
    
        setSearchParams(params, { replace: true });
    }, [time, setSearchParams, searchParams, videoTime]);
    

    const { data: video } = useQuery<VideoType>({
        queryKey: ['video', { videoId }],
        queryFn: () => fetchVideoById(videoId),
        refetchOnWindowFocus: false,
    });
    const { data: videos } = useQuery<VideoItemType[]>({
        queryKey: ['videos', { videoId }],
        queryFn: () => fetchVideoVideos(videoId),
        refetchOnWindowFocus: false,
    });
    const { data: comments } = useQuery<CommentItemType[]>({
        queryKey: ['comments', { videoId }],
        queryFn: () => fetchComments(videoId),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (video?.snippet?.title) {
            document.title = `${video.snippet.title} - YouTube`;
        }        
    }, [video]);

    const isDescription = () => {
        setVisibleDescription(!visibleDescription)
    }

    return { isDescription, comments, videos, video, startTime, visibleDescription, videoId }
}