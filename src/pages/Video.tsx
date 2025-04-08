import { useEffect, useState } from "react";
import { fetchVideoById, fetchVideoVideos, fetchComments } from "../api/searchSlice";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {BigNumber, DateFormatter, useCardSize} from "../hooks";
import Comment from "../others/Comment";
import { CommentItemType, VideoItemType, VideoType } from "@/types";
import YouTubePlayer from "@/others/YouTubePlayer";
import BigCardVideo from "@/others/BigCardVideo";

const Video = () => {
    const { cardWidth, cardHeight } = useCardSize();
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

    return (    
        <div className="flex justify-center">
            <div className={`flex gap-x-[1vw] gap-y-[3vw] w-[1440px] 1480res:w-[95%] 1000res:flex-col`}>
                <div>
                    <div style={window.innerWidth >= 1480 ? {width: '57em'} : (window.innerWidth <= 1000 ? {width: '93vw'} : {width: cardWidth * 2})} className="flex flex-col gap-y-4">
                        <div style={window.innerWidth >= 1480 ? {height: '35em'} : (window.innerWidth <= 1000 ? {height: '50vw'} : {height: cardHeight * 2})} className="rounded-xl overflow-hidden relative">
                            <YouTubePlayer videoId={videoId} videoTime={startTime} />
                        </div>
                        <div className="text-white font-[550]">
                            <h2 className="text-[1.2em] 1480res:text-[1.5vw] 1000res:text-[2.5vw] 500res:text-[3vw] 500res:relative 500res:top-2">{video?.snippet?.title}</h2>
                            <Link to={`/channels/${video?.snippet?.channelId}`} className="text-[1em] 1480res:text-[1.3vw] 1000res:text-[2vw] 500res:text-[2.7vw]">{video?.snippet?.channelTitle}</Link>
                        </div>
                        <div className="bg-[rgba(255,255,255,.1)] rounded-xl text-white p-4 540res:p-2 w-full">
                            <p className="font-[550] text-[.9em] 1480res:text-[1.1vw] 1000res:text-[2.1vw] 500res:text-[2.6vw]">{`${BigNumber(video?.statistics?.viewCount)} просмотров ${DateFormatter(video?.snippet?.publishedAt)}`}</p>
                            <div className="text-[.8em] 1480res:text-[1vw] 1000res:text-[2vw] 500res:text-[2.5vw]">
                                <p>{!visibleDescription ? video?.snippet?.description.slice(0, 100) : video?.snippet?.description}</p>
                                <button className={`font-[550] ${visibleDescription && 'hidden'}`} onClick={isDescription}>...еще</button>
                                <button className={`font-[550] ${!visibleDescription && 'hidden'}`} onClick={isDescription}>Свернуть</button>
                            </div>
                        </div>
                        <div className="text-white p-4 540res:p-2 w-screen overflow-hidden flex flex-col gap-7 1480res:gap-4">
                            {comments?.map((item, index) => <Comment item={item} key={index}/>)}
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    {videos?.map((item, index) => (
                        item?.id?.kind !== 'youtube#channel' && (
                            <BigCardVideo item={item} index={index}/>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Video;